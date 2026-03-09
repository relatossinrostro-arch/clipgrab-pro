import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse, JSONResponse
from pydantic import BaseModel
from typing import Optional
import yt_dlp
import httpx
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from utils.downloader import get_info, download_video, download_audio, get_platform, get_direct_url
from utils.ffmpeg_setup import setup_ffmpeg
from cachetools import TTLCache

app = FastAPI(title="ClipGrab Pro Professional API")

# Metadata Cache (1 hour TTL, 1000 items)
metadata_cache = TTLCache(maxsize=1000, ttl=3600)

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str
    format: Optional[str] = "best"

@app.on_event("startup")
async def startup_event():
    # Ensure downloads directory exists
    os.makedirs("downloads", exist_ok=True)
    # Setup FFmpeg automatically if missing
    setup_ffmpeg()

@app.get("/")
async def root():
    return {"message": "ClipGrab Pro Professional API is running"}

@app.post("/analyze")
@limiter.limit("20/minute")
async def analyze_video(request: Request, body: URLRequest):
    # Check cache
    if body.url in metadata_cache:
        return metadata_cache[body.url]
        
    try:
        info = get_info(body.url)
        platform = get_platform(body.url)
        
        # Handle Playlists
        if 'entries' in info:
            playlist_data = {
                "ok": True,
                "title": info.get("title"),
                "platform": platform,
                "is_playlist": True,
                "entries": [
                    {
                        "title": entry.get("title"),
                        "url": entry.get("url"),
                        "duration": entry.get("duration"),
                    } for entry in info['entries'][:20] # Limit to 20 for preview
                ]
            }
            metadata_cache[body.url] = playlist_data
            return playlist_data

        formats = []
        if 'formats' in info:
            # Sort formats by quality (height)
            sorted_formats = sorted(
                [f for f in info['formats'] if f.get('height') and f.get('vcodec') != 'none'],
                key=lambda x: x['height'],
                reverse=True
            )
            
            for f in sorted_formats:
                formats.append({
                    'format_id': f.get('format_id'),
                    'extension': f.get('ext'),
                    'height': f.get('height'),
                    'filesize': f.get('filesize'),
                    'note': f.get('format_note', '')
                })

        result = {
            "ok": True,
            "title": info.get("title"),
            "thumbnail": info.get("thumbnail"),
            "duration": info.get("duration"),
            "uploader": info.get("uploader"),
            "platform": platform,
            "is_playlist": False,
            "formats": formats[:10]
        }
        
        metadata_cache[body.url] = result
        return result
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "ok": False,
                "error": str(e)
            }
        )

@app.get("/download")
@limiter.limit("10/minute")
async def download_endpoint_get(request: Request, url: str, format: Optional[str] = "best"):
    body = URLRequest(url=url, format=format)
    return await download_endpoint(request, body)

@app.get("/audio")
@limiter.limit("10/minute")
async def audio_endpoint_get(request: Request, url: str):
    body = URLRequest(url=url)
    return await audio_endpoint(request, body)

async def stream_video_url(url: str):
    async with httpx.AsyncClient(timeout=None) as client:
        async with client.stream("GET", url, follow_redirects=True) as response:
            if response.status_code != 200:
                raise HTTPException(status_code=400, detail="Could not stream video")
            async for chunk in response.aiter_bytes():
                yield chunk

@app.post("/download")
@limiter.limit("10/minute")
async def download_endpoint(request: Request, body: URLRequest):
    try:
        platform = get_platform(body.url)
        
        # TikTok Specialized Support (Streaming & No-Watermark)
        if platform == "TikTok":
            video_url, title = get_direct_url(body.url)
            if video_url:
                # Return direct stream for ultra-fast download
                return StreamingResponse(
                    stream_video_url(video_url),
                    media_type='video/mp4',
                    headers={
                        "Content-Disposition": f'attachment; filename="{title}.mp4"'
                    }
                )

        # Standard handling (YouTube, Facebook, etc.)
        format_id = "best"
        if body.format and "p" in body.format:
            height = body.format.replace("p", "")
            format_id = f"bestvideo[height<={height}]+bestaudio/best"
        
        file_path = download_video(body.url, format_id)
        if os.path.exists(file_path):
            return FileResponse(
                path=file_path,
                media_type="video/mp4",
                filename=f"clipgrab_{os.path.basename(file_path)}"
            )
        raise HTTPException(status_code=500, detail="Downloaded file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/audio")
@limiter.limit("10/minute")
async def audio_endpoint(request: Request, body: URLRequest):
    try:
        file_path = download_audio(body.url)
        if os.path.exists(file_path):
            return FileResponse(
                path=file_path,
                filename=os.path.basename(file_path),
                media_type='audio/mpeg'
            )
        raise HTTPException(status_code=500, detail="Converted audio not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/extension/download")
async def extension_download(body: URLRequest):
    # Specialized endpoint for Chrome Extension
    return await download_endpoint(None, body)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

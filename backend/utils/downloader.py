import yt_dlp
import os
import re

# Get FFmpeg path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FFMPEG_DIR = os.path.join(BASE_DIR, "tools", "ffmpeg", "bin")

def get_info(url: str):
    print("Analyzing URL:", url)
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'format': 'best',
        'noplaylist': True,
        'extract_flat': False,
        'skip_download': True,
        'nocheckcertificate': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        return ydl.extract_info(url, download=False)

def get_direct_url(url: str, format_id: str = "best"):
    ydl_opts = {
        'format': format_id,
        'quiet': True,
        'no_warnings': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        return info.get('url'), info.get('title', 'video')

def download_video(url: str, format_id: str = "best"):
    if not os.path.exists("downloads"):
        os.makedirs("downloads")
        
    ydl_opts = {
        'format': format_id,
        'merge_output_format': 'mp4',
        'outtmpl': 'downloads/%(title)s.%(ext)s',
        'ffmpeg_location': FFMPEG_DIR if os.path.exists(FFMPEG_DIR) else None,
        'quiet': True,
        'noplaylist': True
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        return ydl.prepare_filename(info_dict)

def download_audio(url: str):
    if not os.path.exists("downloads"):
        os.makedirs("downloads")
        
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': 'downloads/%(title)s.%(ext)s',
        'ffmpeg_location': FFMPEG_DIR if os.path.exists(FFMPEG_DIR) else None,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info_dict)
        # Extension usually becomes mp3 due to the postprocessor
        final_filename = os.path.splitext(filename)[0] + ".mp3"
        return final_filename

def get_platform(url: str):
    if re.search(r'tiktok\.com', url): return "TikTok"
    if re.search(r'instagram\.com', url): return "Instagram"
    if re.search(r'facebook\.com|fb\.watch', url): return "Facebook"
    if re.search(r'youtube\.com|youtu\.be', url): return "YouTube"
    if re.search(r'twitter\.com|x\.com', url): return "Twitter"
    if re.search(r'reddit\.com', url): return "Reddit"
    if re.search(r'pinterest\.com', url): return "Pinterest"
    if re.search(r'vimeo\.com', url): return "Vimeo"
    return "Unknown"

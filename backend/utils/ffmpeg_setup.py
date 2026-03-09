import os
import subprocess
import zipfile
import urllib.request

def setup_ffmpeg():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    ffmpeg_dir = os.path.join(base_dir, "tools", "ffmpeg")
    ffmpeg_exe = os.path.join(ffmpeg_dir, "bin", "ffmpeg.exe")
    
    if os.path.exists(ffmpeg_exe):
        print(f"FFmpeg already present at {ffmpeg_exe}")
        return ffmpeg_exe
        
    print("FFmpeg not found. Starting automatic setup...")
    os.makedirs(ffmpeg_dir, exist_ok=True)
    
    # URL for a compact Windows build (git-full or git-essential from gyan.dev)
    # Using the essential build for faster download
    ffmpeg_url = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
    zip_path = os.path.join(ffmpeg_dir, "ffmpeg.zip")
    
    try:
        print(f"Downloading FFmpeg from {ffmpeg_url}...")
        # Use powershell for reliable downloading on Windows if possible
        try:
            subprocess.run([
                "powershell", "-Command", 
                f'Invoke-WebRequest -Uri "{ffmpeg_url}" -OutFile "{zip_path}"'
            ], check=True)
        except Exception:
            # Fallback to urllib
            urllib.request.urlretrieve(ffmpeg_url, zip_path)
            
        print("Extracting FFmpeg...")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(ffmpeg_dir)
            
        # The zip usually contains a subfolder like ffmpeg-4.4-essentials_build
        # We need to find the bin folder and move its contents
        for root, dirs, files in os.walk(ffmpeg_dir):
            if "ffmpeg.exe" in files:
                source_bin = root
                target_bin = os.path.join(ffmpeg_dir, "bin")
                os.makedirs(target_bin, exist_ok=True)
                
                # Move ffmpeg.exe, ffprobe.exe, ffplay.exe
                for f in ["ffmpeg.exe", "ffprobe.exe", "ffplay.exe"]:
                    if f in os.listdir(source_bin):
                        os.replace(os.path.join(source_bin, f), os.path.join(target_bin, f))
                break
        
        # Cleanup
        if os.path.exists(zip_path):
            os.remove(zip_path)
            
        print(f"FFmpeg setup complete. Binaries at {target_bin}")
        return os.path.join(target_bin, "ffmpeg.exe")
        
    except Exception as e:
        print(f"Error setting up FFmpeg: {e}")
        return None

if __name__ == "__main__":
    setup_ffmpeg()

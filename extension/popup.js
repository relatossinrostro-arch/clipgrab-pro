document.getElementById('downloadBtn').addEventListener('click', async () => {
    const statusEl = document.getElementById('status');
    const loader = document.getElementById('loader');
    const btnText = document.querySelector('#downloadBtn span:not(.loader)');

    statusEl.innerHTML = "Initializing...";
    loader.style.display = "inline-block";

    try {
        // 1. Get current tab URL
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const videoUrl = tab.url;

        if (!videoUrl) throw new Error("No URL detected");

        statusEl.innerHTML = "Processing Video...";

        // 2. Call backend API
        const response = await fetch("http://127.0.0.1:8000/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: videoUrl, format: "best" })
        });

        if (!response.ok) throw new Error("Download failed");

        // 3. Receive file and trigger browser download
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        // Use Chrome downloads API if possible, fallback to anchor
        if (chrome.downloads) {
            chrome.downloads.download({
                url: downloadUrl,
                filename: `ClipGrab_${Date.now()}.mp4`
            });
        } else {
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = `ClipGrab_${Date.now()}.mp4`;
            a.click();
        }

        statusEl.innerHTML = '<span class="success">Download Started!</span>';
    } catch (err) {
        statusEl.innerHTML = `<span class="error">${err.message}</span>`;
    } finally {
        loader.style.display = "none";
    }
});

async function captureImage() {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const iframe = document.getElementById('imageFrame');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
        await new Promise((resolve) => (video.onloadedmetadata = resolve));

        // Set canvas dimensions to match the video stream dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        setInterval(() => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/png');
            console.log("image data", imageData);
            updateIframe(iframe, imageData);
        }, 5000); // 10 seconds interval
    } catch (error) {
        console.error('Error accessing the camera: ', error);
    }
}

function updateIframe(iframe, imageData) {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`<html><body><img src="${imageData}" style="width: 100%; height: auto;" /></body></html>`);
    doc.close();
}

captureImage();

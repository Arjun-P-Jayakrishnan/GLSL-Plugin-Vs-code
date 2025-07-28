let frameCount = 0;
let lastFrame = performance.now();
function updateFPS() {
    const fpsDisplay = document.getElementById("fps");
    console.log("update fps running");
    const loop = () => {
        const now = performance.now();
        frameCount++;
        if (now - lastFrame > 1000) {
            fpsDisplay.textContent = frameCount.toString();
            console.log("frame count", frameCount.toString());
            frameCount = 0;
            lastFrame = now;
        }
        requestAnimationFrame(loop);
    };
    loop();
}
export { updateFPS };

import { fragmentShaderSample } from "../sample/frag.js";
import { vertexShaderSample } from "../sample/vert.js";
import { RunShaderPreview } from "./renderer.js";
const vscode = acquireVsCodeApi();
const InitPipeline = () => {
    RunShaderPreview(vertexShaderSample, fragmentShaderSample);
};
const RegisterEvents = () => {
    console.log("Registering events", window);
    window.addEventListener("message", (event) => {
        const message = event.data;
        console.log("recieved message from backend", message);
        if (message.type === "updateShader") {
            const shaderCode = message.payload.code;
            RunShaderPreview(vertexShaderSample, shaderCode);
        }
    });
};
function selectFile() {
    console.log("vscode select file");
    vscode.postMessage({
        command: "selectFile",
    });
}
export { InitPipeline, RegisterEvents, selectFile };

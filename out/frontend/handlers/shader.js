import { RunShaderPreview } from "../render/renderer.js";
import { vertexShaderSample } from "../sample/vert.js";
function handleShader(message) {
    const shaderCode = message.payload;
    console.log("shader code", shaderCode);
    RunShaderPreview(vertexShaderSample, shaderCode);
}
export { handleShader };

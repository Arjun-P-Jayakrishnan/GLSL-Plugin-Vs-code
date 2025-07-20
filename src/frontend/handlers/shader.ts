import { RunShaderPreview } from "../render/renderer.js";
import { vertexShaderSample } from "../sample/vert.js";
import { RecieveMessage } from "../types/message.js";

function handleShader(message: RecieveMessage) {
  const shaderCode = message.payload;
  console.log("shader code", shaderCode);
  RunShaderPreview(vertexShaderSample, shaderCode);
}

export { handleShader };

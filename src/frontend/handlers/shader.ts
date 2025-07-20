import { RunShaderPreview } from "../render/renderer.js";
import { vertexShaderSample } from "../sample/vert2D.js";
import { RecieveMessage } from "../types/message.js";

function handleShader(message: RecieveMessage) {
  const shaderCode = message.payload.code;
  console.log("shader code", shaderCode, message);
  RunShaderPreview(vertexShaderSample, shaderCode);
}

export { handleShader };

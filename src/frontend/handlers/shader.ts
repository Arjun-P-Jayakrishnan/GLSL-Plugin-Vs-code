import { RunShaderPreview } from "../render/renderer";
import { vertexShaderSample } from "../sample/vert";
import { RecieveMessage } from "../types/message";

function handleShader(message: RecieveMessage) {
  const shaderCode = message.payload;
  RunShaderPreview(vertexShaderSample, shaderCode);
}

export { handleShader };

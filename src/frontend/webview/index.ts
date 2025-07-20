import { RunShaderPreview } from "../render/renderer.js";
import { router } from "../router/messageRouter.js";
import { monitorEvents } from "../router/messges.js";
import { fragmentShaderSample } from "../sample/frag.js";
import { vertexShaderSample } from "../sample/vert.js";

function runApp() {
  RunShaderPreview(vertexShaderSample, fragmentShaderSample);
  monitorEvents();
  router.listen();
}

runApp();

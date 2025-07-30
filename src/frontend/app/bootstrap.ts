import { monitorEvents } from "../core/messages/messges.js";
import { router } from "../core/router/messageRouter.js";
import { getPerformanceInfo } from "../info/info.js";
import { RunShaderPreview } from "../render/renderer.js";
import { fragmentShaderSample } from "../sample/frag.js";
import { vertexShaderSample } from "../sample/vert2D.js";

export function bootstrapApp() {
  document.addEventListener("DOMContentLoaded", async () => {
    RunShaderPreview(vertexShaderSample, fragmentShaderSample);
    monitorEvents();
    getPerformanceInfo();
    router.listen();
  });
}

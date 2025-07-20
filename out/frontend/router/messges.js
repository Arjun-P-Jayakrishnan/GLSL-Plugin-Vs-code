import { handleShader } from "../handlers/shader.js";
import { router } from "./messageRouter.js";
function monitorEvents() {
    router.register({ type: "shader-file", payload: {} }, handleShader);
}
export { monitorEvents };

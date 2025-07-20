import { handleShader } from "../handlers/shader";
import { router } from "./messageRouter";

function monitorEvents() {
  router.register({ type: "shader-file", payload: {} }, handleShader);
}

export { monitorEvents };

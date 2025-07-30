import { handleShader } from "../../handlers/shader.js";
import { router } from "../router/messageRouter.js";

function monitorEvents() {
  router.register({ type: "update-shader", payload: {} }, handleShader);
}

export { monitorEvents };

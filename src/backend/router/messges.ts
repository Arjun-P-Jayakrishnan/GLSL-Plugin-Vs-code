import { openFile } from "../handlers/file";
import { router } from "./messageRouter";

function monitorEvents() {
  router.register({ type: "select-file", payload: {} }, openFile);
}

export { monitorEvents };

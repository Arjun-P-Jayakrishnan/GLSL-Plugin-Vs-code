import * as vscode from "vscode";
import { registerSaveWatcher } from "../handlers/file";
import { getWebviewHTML } from "../panel/htmlGenerator";
import { createWebviewPanel } from "../panel/panel";
import { router } from "../router/messageRouter";
import { monitorEvents } from "../router/messges";
import { SHADER_PREVIEW } from "../types/commands";

export function registerShaderPreview(
  context: vscode.ExtensionContext
): vscode.Disposable {
  const setup = () => {
    //Create a right side webview panel
    const panel = createWebviewPanel(context);
    //Add HTML content
    panel.webview.html = getWebviewHTML(context, panel);

    /**Registers pipeline */
    router.init(panel);
    monitorEvents();
    router.listen();

    registerSaveWatcher(context);
  };

  const command = vscode.commands.registerCommand(SHADER_PREVIEW, setup);

  return command;
}

import * as vscode from "vscode";
import { getWebviewHTML } from "../panel/htmlGenerator";
import { createWebviewPanel } from "../panel/panel";
import { RegisterMessagePipeline } from "../pipeline/message";
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
    RegisterMessagePipeline(panel);
  };

  const command = vscode.commands.registerCommand(SHADER_PREVIEW, setup);

  return command;
}

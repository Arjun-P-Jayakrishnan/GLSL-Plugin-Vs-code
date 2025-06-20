import * as fs from "fs";
import * as vscode from "vscode";

// Vs code required functions for preview
export function activate(context: vscode.ExtensionContext) {
  console.log("Activate");

  console.log(`Console.ing to check if vs code activates`);

  const command = vscode.commands.registerCommand(
    "glslShaderLab.showPreview",
    () => {
      _createPanel(context);
    }
  );

  context.subscriptions.push(command);
}

//vs code required function for closing
export function deactivate() {}

/**
 * @description retrives the thml to be displayed in form of string
 * @param context vs code extension context
 * @returns html stringified
 */
function getWebviewContent(
  context: vscode.ExtensionContext,
  scriptUri: vscode.Uri
): string {
  const htmlPath = vscode.Uri.joinPath(
    context.extensionUri,
    "out",
    "webview",
    "index.html"
  );
  let html: string = fs.readFileSync(htmlPath.fsPath, "utf8");

  html = html.replace("__SCRIPT__", scriptUri.toString());
  console.log(html);
  return html;
}

/**
 * @description web view panel creation and html linking
 * @param context vs code extension context
 */
function _createPanel(context: vscode.ExtensionContext) {
  console.log("Creating webview");
  const panel: vscode.WebviewPanel = vscode.window.createWebviewPanel(
    "glslPreview",
    "GLSL Live Preview",
    vscode.ViewColumn.Beside,
    {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri)],
    }
  );
  const scriptPathOnDisk = vscode.Uri.joinPath(
    context.extensionUri,
    "out",
    "webview",
    "index.js"
  );
  const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);
  console.log("script uri", scriptUri);
  panel.webview.html = getWebviewContent(context, scriptUri);
}

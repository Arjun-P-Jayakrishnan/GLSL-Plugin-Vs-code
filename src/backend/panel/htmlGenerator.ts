import * as fs from "fs";
import * as vscode from "vscode";

/**
 * @description retrives the thml to be displayed in form of string
 * @param context vs code extension context
 * @returns html stringified
 */
function getWebviewHTML(
  context: vscode.ExtensionContext,
  panel: vscode.WebviewPanel
): string {
  const htmlPath = vscode.Uri.joinPath(
    context.extensionUri,
    "webview-ui",
    "index.html"
  );
  let html: string = fs.readFileSync(htmlPath.fsPath, "utf8");

  const scriptPathOnDisk = vscode.Uri.joinPath(
    context.extensionUri,
    "out",
    "frontend",
    "webview",
    "index.js"
  );
  const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);

  html = html.replace("__SCRIPT__", scriptUri.toString());

  return html;
}

export { getWebviewHTML };

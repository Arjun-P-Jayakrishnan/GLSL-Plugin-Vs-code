import * as vscode from "vscode";

/**
 * @description web view panel creation and html linking
 * @param context vs code extension context
 */
function createWebviewPanel(
  context: vscode.ExtensionContext
): vscode.WebviewPanel {
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
  return panel;
}

export { createWebviewPanel };

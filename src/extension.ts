import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("GLSL ShaderLab extension is live");

  const scriptPathOnDisk = vscode.Uri.joinPath(
    context.extensionUri,
    "out",
    "main.js"
  );

  let disposable = vscode.commands.registerCommand(
    "glslShaderLab.showPreview",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "glslPreview",
        "GLSL Live Preview",
        vscode.ViewColumn.Beside,
        { enableScripts: true }
      );

      const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);
      panel.webview.html = getWebviewContent(scriptUri);
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(scriptUri: vscode.Uri): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GLSL Preview</title>
    </head>
    <body>
       <h1>Hi 1</h1>
        <canvas id="glcanvas" width="800" height="600"></canvas>
        <script src="${scriptUri}" ></script>
    </body>
    </html>
  `;
}

export function deactivate() {}

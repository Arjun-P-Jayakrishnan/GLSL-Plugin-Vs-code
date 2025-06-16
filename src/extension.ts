import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("GLSL ShaderLab extension is live");

  let disposable = vscode.commands.registerCommand(
    "glslShaderLab.showPreview",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "glslPreview",
        "GLSL Live Preview",
        vscode.ViewColumn.Beside,
        { enableScripts: true }
      );

      panel.webview.html = getWebviewContent();
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(): string {
  return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-XYZ123'; style-src 'unsafe-inline';">
        </head>
        <body>
            
        </body>
    </html>
  `;
}

export function deactivate() {}

import * as vscode from "vscode";

/**
 * @description open file
 * @param panel panel given by vs code
 */
const openFile = async (panel: vscode.WebviewPanel) => {
  //Allow user to select files in current workspace
  const uri = await vscode.window.showOpenDialog({
    canSelectMany: false,
    filters: { "Shader Files": ["vert", "frag", "glsl"] },
  });

  //use the uri
  if (uri !== undefined && uri.length > 0) {
    const fileUri = uri[0];
    //Read file as Uint8Array
    const fileData = await vscode.workspace.fs.readFile(fileUri);

    //Convert Uint8Array to string (assuming UTF-8 encoding)
    const code = new TextDecoder("utf-8").decode(fileData);

    panel.webview.postMessage({
      type: "updateShader",
      payload: { code: code },
    });
  }
};

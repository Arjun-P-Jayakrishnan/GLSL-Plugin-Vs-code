import * as vscode from "vscode";
import { Messages } from "../types/events";

const openFile = async (panel: vscode.WebviewPanel) => {
  const uri = await vscode.window.showOpenDialog({
    canSelectMany: false,
    filters: { "Shader Files": ["vert", "frag", "glsl"] },
  });
  if (uri !== undefined && uri.length > 0) {
    const fileUri = uri[0];
    //Read file as Uint8Array
    const fileData = await vscode.workspace.fs.readFile(fileUri);

    //Convert Uint8Array to string (assuming UTF-8 encoding)
    const code = new TextDecoder("utf-8").decode(fileData);

    //Send  the code to webview
    panel.webview.postMessage({
      type: "updateShader",
      payload: { code: code },
    });
    console.log("backend code sent");
  }
};

const manageFile = (command: Messages, panel: vscode.WebviewPanel) => {
  switch (command) {
    case "selectFile":
      openFile(panel);
      break;
    default:
      console.log("select file");
  }
};

const RegisterMessagePipeline = (panel: vscode.WebviewPanel) => {
  panel.webview.onDidReceiveMessage(async (e) => {
    console.log("Backend recieved message", e);
    manageFile(e.command, panel);
  });
};

export { RegisterMessagePipeline };

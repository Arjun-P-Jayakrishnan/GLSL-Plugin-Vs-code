import * as vscode from "vscode";
import { router } from "../router/messageRouter";

let selectedFileUri: vscode.Uri | undefined;

/**
 * @description open file
 * @param panel panel given by vs code
 */
const openFile = async (): Promise<void> => {
  //Allow user to select files in current workspace
  const uri = await vscode.window.showOpenDialog({
    canSelectMany: false,
    filters: { "Shader Files": ["vert", "frag", "glsl"] },
  });

  //use the uri
  if (uri !== undefined && uri.length > 0) {
    selectedFileUri = uri[0];
    readAndSendFile(selectedFileUri);
  }
};

const readAndSendFile = async (uri: vscode.Uri): Promise<void> => {
  //Read file as Uint8Array
  const fileData = await vscode.workspace.fs.readFile(uri);

  //Convert Uint8Array to string (assuming UTF-8 encoding)
  const code = new TextDecoder("utf-8").decode(fileData);

  console.log("code", code);

  router.send({ type: "update-shader", payload: { code: code } });
};

const registerSaveWatcher = (context: vscode.ExtensionContext) => {
  const disposable = vscode.workspace.onDidSaveTextDocument((doc) => {
    if (selectedFileUri && doc.uri.fsPath === selectedFileUri.fsPath) {
      readAndSendFile(selectedFileUri);
    }
  });

  context.subscriptions.push(disposable);
};

export { openFile, registerSaveWatcher };

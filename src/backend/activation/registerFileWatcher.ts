import * as vscode from "vscode";

const registerSaveWatcher = (context: vscode.ExtensionContext) => {
  const disposable = vscode.workspace.onDidSaveTextDocument((doc) => {
    if (selectedFileUri && doc.uri.fsPath === selectedFileUri.fsPath) {
      readAndSendFile(selectedFileUri);
    }
  });

  context.subscriptions.push(disposable);
};

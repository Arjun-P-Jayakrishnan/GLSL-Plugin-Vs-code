import * as vscode from "vscode";
import { registerShaderPreview } from "./backend/activation/registerShaderPreview";

// Vs code required functions for preview
export function activate(context: vscode.ExtensionContext) {
  console.log("Activating the extension....");

  //Register the shader preview
  const command = registerShaderPreview(context);
  context.subscriptions.push(command);
}

//vs code required function for closing
export function deactivate() {}

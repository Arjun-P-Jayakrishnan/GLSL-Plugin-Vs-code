import { Uri } from "vscode";

export type FileContext = {
  filePath: Uri["fsPath"];
};

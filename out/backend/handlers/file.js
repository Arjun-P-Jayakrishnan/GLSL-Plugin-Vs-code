"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSaveWatcher = exports.openFile = void 0;
const vscode = __importStar(require("vscode"));
const messageRouter_1 = require("../router/messageRouter");
let selectedFileUri;
/**
 * @description open file
 * @param panel panel given by vs code
 */
const openFile = async () => {
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
exports.openFile = openFile;
const readAndSendFile = async (uri) => {
    //Read file as Uint8Array
    const fileData = await vscode.workspace.fs.readFile(uri);
    //Convert Uint8Array to string (assuming UTF-8 encoding)
    const code = new TextDecoder("utf-8").decode(fileData);
    console.log("code", code);
    messageRouter_1.router.send({ type: "update-shader", payload: { code: code } });
};
const registerSaveWatcher = (context) => {
    const disposable = vscode.workspace.onDidSaveTextDocument((doc) => {
        if (selectedFileUri && doc.uri.fsPath === selectedFileUri.fsPath) {
            readAndSendFile(selectedFileUri);
        }
    });
    context.subscriptions.push(disposable);
};
exports.registerSaveWatcher = registerSaveWatcher;
//# sourceMappingURL=file.js.map
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
exports.activate = activate;
exports.deactivate = deactivate;
const fs = __importStar(require("fs"));
const vscode = __importStar(require("vscode"));
// Vs code required functions for preview
function activate(context) {
    console.log("Activate");
    try {
        console.log(`Console.ing to check if vs code activates`);
        const command = vscode.commands.registerCommand("glslShaderLab.showPreview", () => {
            _createPanel(context);
        });
        context.subscriptions.push(command);
    }
    catch (err) {
        throw new Error(`Error whiel activating extension ${err}`);
    }
}
//vs code required function for closing
function deactivate() { }
/**
 * @description retrives the thml to be displayed in form of string
 * @param context vs code extension context
 * @returns html stringified
 */
function getWebviewContent(context, scriptUri) {
    const htmlPath = vscode.Uri.joinPath(context.extensionUri, "out", "webview", "index.html");
    let html = fs.readFileSync(htmlPath.fsPath, "utf8");
    html = html.replace("__SCRIPT__", scriptUri.toString());
    return html;
}
/**
 * @description web view panel creation and html linking
 * @param context vs code extension context
 */
function _createPanel(context) {
    const panel = vscode.window.createWebviewPanel("glslPreview", "GLSL Live Preview", vscode.ViewColumn.Beside, {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri)],
    });
    const scriptPathOnDisk = vscode.Uri.joinPath(context.extensionUri, "out", "webview", "index.js");
    const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);
    panel.webview.html = getWebviewContent(context, scriptUri);
}
//# sourceMappingURL=extension.js.map
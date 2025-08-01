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
exports.registerShaderPreview = registerShaderPreview;
const vscode = __importStar(require("vscode"));
const file_1 = require("../handlers/file");
const htmlGenerator_1 = require("../panel/htmlGenerator");
const panel_1 = require("../panel/panel");
const messageRouter_1 = require("../router/messageRouter");
const messges_1 = require("../router/messges");
const commands_1 = require("../types/commands");
function registerShaderPreview(context) {
    const setup = () => {
        //Create a right side webview panel
        const panel = (0, panel_1.createWebviewPanel)(context);
        //Add HTML content
        panel.webview.html = (0, htmlGenerator_1.getWebviewHTML)(context, panel);
        /**Registers pipeline */
        messageRouter_1.router.init(panel);
        (0, messges_1.monitorEvents)();
        messageRouter_1.router.listen();
        (0, file_1.registerSaveWatcher)(context);
    };
    const command = vscode.commands.registerCommand(commands_1.SHADER_PREVIEW, setup);
    return command;
}
//# sourceMappingURL=registerShaderPreview.js.map
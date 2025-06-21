"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const registerShaderPreview_1 = require("./backend/activation/registerShaderPreview");
// Vs code required functions for preview
function activate(context) {
    console.log("Activating the extension....");
    //Register the shader preview
    const command = (0, registerShaderPreview_1.registerShaderPreview)(context);
    context.subscriptions.push(command);
}
//vs code required function for closing
function deactivate() { }
//# sourceMappingURL=extension.js.map
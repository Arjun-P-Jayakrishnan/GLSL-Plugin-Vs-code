"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
async function _onDidRecieveMessage(message, handler) {
    if (!handler) {
        console.warn("No handler registered");
        return;
    }
    try {
        console.log("message ", message);
        await handler(message);
    }
    catch (error) {
        console.error(`Error in handler for command ${handler}`);
    }
}
const createMessageRouter = () => {
    const handlers = new Map();
    let _panel = null;
    const init = (panel) => {
        _panel = panel;
    };
    const register = (message, handler) => {
        handlers.set(message.type, handler);
    };
    const listen = () => {
        if (!_panel)
            return;
        _panel.webview.onDidReceiveMessage(async (message) => {
            _onDidRecieveMessage(message, handlers.get(message.type));
        });
    };
    const send = (message) => {
        if (!_panel)
            return;
        _panel.webview.postMessage(message);
    };
    return {
        init,
        register,
        listen,
        send,
    };
};
let router = createMessageRouter();
exports.router = router;
//# sourceMappingURL=messageRouter.js.map
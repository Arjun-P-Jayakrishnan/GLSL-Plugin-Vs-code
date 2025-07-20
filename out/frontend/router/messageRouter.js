async function _onDidRecieveMessage(message, handler) {
    console.log(message);
    if (!handler) {
        console.warn("No handler registered for front end");
        return;
    }
    try {
        await handler(message);
    }
    catch (error) {
        console.error(`Error in handler for command ${error}`);
    }
}
const createMessageRouter = () => {
    const handlers = new Map();
    const vscode = acquireVsCodeApi();
    const init = () => { };
    const register = (message, handler) => {
        handlers.set(message.type, handler);
    };
    const listen = () => {
        window.addEventListener("message", async (e) => {
            const message = e.data;
            console.log("message", message);
            _onDidRecieveMessage(message, handlers.get(message.type));
        });
    };
    const send = (message) => {
        if (!vscode)
            return;
        vscode.postMessage(message);
    };
    return {
        init,
        register,
        listen,
        send,
    };
};
let router = createMessageRouter();
export { router };

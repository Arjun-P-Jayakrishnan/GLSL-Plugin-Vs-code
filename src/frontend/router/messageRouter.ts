import {
  Handler,
  MessageRouter,
  RecieveMessage,
  RecieveMessageType,
  SendMessage,
} from "../types/message";

declare const acquireVsCodeApi: () => {
  postMessage: (message: any) => void;
  getState: () => any;
  setState: (state: any) => void;
};

async function _onDidRecieveMessage(
  message: RecieveMessage,
  handler: Handler | undefined
) {
  if (!handler) {
    console.warn("No handler registered");
    return;
  }

  try {
    await handler(message.payload);
  } catch (error) {
    console.error(`Error in handler for command ${handler}`);
  }
}

const createMessageRouter = (): MessageRouter => {
  const handlers = new Map<RecieveMessageType, Handler>();
  const vscode = acquireVsCodeApi();

  const init = () => {};

  const register = (message: RecieveMessage, handler: Handler) => {
    handlers.set(message.type, handler);
  };

  const listen = () => {
    window.addEventListener("message", async (e: MessageEvent<any>) => {
      const message: RecieveMessage = e.data;
      _onDidRecieveMessage(message, handlers.get(message.type));
    });
  };

  const send = (message: SendMessage) => {
    if (!vscode) return;
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

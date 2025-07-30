import { Nullable } from "../../types/global.js";
import {
  Handler,
  MessageRouter,
  RecieveMessage,
  RecieveMessageType,
  SendMessage,
} from "../../types/message.js";

declare const acquireVsCodeApi: () => {
  postMessage: (message: any) => void;
  getState: () => any;
  setState: (state: any) => void;
};

type InternalState = {
  hasStarted: boolean;
};

let instance: Nullable<MessageRouter> = null;

function isValidMessage(msg: any): msg is RecieveMessage {
  return msg && typeof msg.type === "string" && "payload" in msg;
}

const createMessageRouter = (): MessageRouter => {
  const handlers = new Map<RecieveMessageType, Handler>();
  const vscode = acquireVsCodeApi();
  const state: InternalState = { hasStarted: false };

  const send = (message: SendMessage) => {
    try {
      vscode.postMessage(message);
    } catch (err) {
      console.error("Failed to send message : ", err);
    }
  };

  const register = (messageType: RecieveMessageType, handler: Handler) => {
    if (handlers.has(messageType)) {
      console.warn(
        `handler already has been registered for the type ${messageType}.Overwriting...`
      );
    }
    handlers.set(messageType, handler);
  };

  const init = () => {};

  const listen = () => {
    if (state.hasStarted) {
      console.warn("The router is already listening.Ignoring duplicate calls");
      return;
    }

    window.addEventListener("message", async (e: MessageEvent) => {
      const msg: RecieveMessage = e.data;

      if (isValidMessage(msg)) {
        console.warn("Invalid message recieved: ", msg);
        return;
      }

      const handler = handlers.get(msg);

      if (!handler) {
        console.warn("No handler registered for front end");
        return;
      }

      try {
        await handler(msg);
        state.hasStarted = true;
      } catch (error) {
        console.error(`Error in handler for command ${error}`);
      }
    });
  };

  return {
    init,
    register,
    listen,
    send,
  };
};

const getRouter = (): MessageRouter => {
  if (instance) return instance;

  instance = createMessageRouter();
  return instance;
};
export { getRouter };

import { MessageContext } from "../types/context.js";
import {
  MessageHandler,
  RecieveMessage,
  SendMessage,
} from "../types/message.js";
import { composeMiddleware, Middleware } from "./middleware.js";
import {
  createRequestId,
  resolveResponse,
  waitForResponse,
} from "./requestResponse.js";

import { Nullable } from "../types/global.js";

declare const acquireVsCodeApi: () => {
  postMessage: (message: any) => void;
};

type HandlerMap = Map<string, MessageHandler>;

type MessageRouter = {
  send: (msg: SendMessage) => void;
  sendAndWait: <T = any>(msg: SendMessage) => Promise<T>;
  use: (mdwr: Middleware) => void;
  register: (type: string, handler: MessageHandler) => void;
  listen: () => void;
  handleResponse: (msg: RecieveMessage) => void;
};

let instance: Nullable<MessageRouter> = null;

export const getRouter = () => {
  if (!instance) {
    instance = createMessageRouter();
  }

  return instance;
};

function createMessageRouter(): MessageRouter {
  const handlers: HandlerMap = new Map();
  const middleware: Middleware[] = [];

  const vscode = acquireVsCodeApi();
  let listening = false;

  const send = (msg: SendMessage) => {
    vscode.postMessage(msg);
  };

  const sendAndWait = async <T = any>(msg: SendMessage): Promise<T> => {
    const requestId: string = msg.requestId ?? createRequestId();
    msg.requestId = requestId;
    send(msg);
    return waitForResponse<T>(requestId);
  };

  const use = (mdwr: Middleware) => {
    middleware.push(mdwr);
  };

  const register = (type: string, handler: MessageHandler) => {
    handlers.set(type, handler);
  };

  const listen = () => {
    if (listening) return;

    listening = true;

    window.addEventListener("message", async (event) => {
      const msg: RecieveMessage = event.data;

      //TODO: Validation

      const handler = handlers.get(msg.type);
      if (!handler) {
        console.warn("handler not registered for the type :" + msg.type);

        return;
      }

      const context: MessageContext = {
        message: msg,
        send,
        respond: (payload) => {
          if (msg.requestId) {
            send({
              type: `${msg.type}_RESPONSE`,
              payload,
              requestId: msg.requestId,
            });
          }
        },
      };

      const wrapped = composeMiddleware(middleware, handler);

      try {
        wrapped(context);
      } catch (err) {
        console.error(`Error handling message ${msg.type}: `, err);
      }
    });
  };

  const handleResponse = (msg: RecieveMessage) => {
    if (msg.requestId) {
      resolveResponse(msg.requestId, msg.payload);
    }
  };

  return {
    send,
    sendAndWait,
    use,
    register,
    listen,
    handleResponse,
  };
}

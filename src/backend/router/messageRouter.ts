import * as vscode from "vscode";
import { Nullable } from "../types/global";
import {
  Handler,
  MessageRouter,
  RecieveMessage,
  RecieveMessageType,
  SendMessage,
} from "../types/message";

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
  let _panel: Nullable<vscode.WebviewPanel> = null;

  const init = (panel: vscode.WebviewPanel) => {
    _panel = panel;
  };

  const register = (message: RecieveMessage, handler: Handler) => {
    handlers.set(message.type, handler);
  };

  const listen = () => {
    if (!_panel) return;
    _panel.webview.onDidReceiveMessage(async (message: RecieveMessage) => {
      _onDidRecieveMessage(message, handlers.get(message.type));
    });
  };

  const send = (message: SendMessage) => {
    if (!_panel) return;
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
export { router };

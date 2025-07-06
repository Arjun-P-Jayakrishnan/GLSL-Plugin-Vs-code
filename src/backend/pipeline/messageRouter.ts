import * as vscode from "vscode";
import { MessageType } from "../types/events";
import { Nullable } from "../types/global";

type Message = {
  command: Command;
  payload: any;
};

type Command = "";

type MessageHandler = (payload: any) => any | Promise<any>;

interface RouterProps {
  panel: vscode.WebviewPanel;
}

const createRouter = ({ panel }: RouterProps) => {
  const handlers: Record<Command, Nullable<MessageHandler>> = {
    "": null,
  };

  panel.webview.onDidReceiveMessage(async (message: Message) => {
    const { command, payload } = message;
    const handler = handlers[command];

    if (!handler) {
      console.warn("No handler registered");
      return;
    }

    try {
      await handler(payload);
    } catch (error) {
      console.error(`Error in handler for command ${handler}`);
    }
  });

  const get = (command: Command, handler: MessageHandler) => {
    handlers[command] = handler;
  };

  const post = (command: Command, handler: MessageHandler) => {
    panel.webview.postMessage({ command: command, payload: handler() });
  };
};

/**
 *
 * @param type
 * @param payload
 */
function GET(panel: vscode.WebviewPanel, type: any, payload: any) {
  panel.webview.onDidReceiveMessage(async (e) => {
    console.log("Backend recieved message", e);
    manageFile(e.command, panel);
  });
}

/**
 *
 * @param type
 * @param payload
 */
function POST(panel: vscode.WebviewPanel, type: any, payload: any) {
  //Send  the code to webview
  panel.webview.postMessage({ type: type, payload: payload });
}

const manageFile = (command: MessageType, panel: vscode.WebviewPanel) => {
  switch (command) {
    case "selectFile":
      openFile(panel);
      break;
    default:
      console.log("select file");
  }
};

const RegisterMessagePipeline = (panel: vscode.WebviewPanel) => {};

export { RegisterMessagePipeline };

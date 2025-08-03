import { MessageContext } from "./context";

export interface SendMessage {
  type: string;
  payload: any;
  requestId?: string;
}

export interface RecieveMessage {
  type: string;
  payload: any;
  requestId?: string;
}

export type MessageHandler = (ctx: MessageContext) => Promise<void>;

import { RecieveMessage, SendMessage } from "./message";

export interface MessageContext {
  message: RecieveMessage;
  send: (msg: SendMessage) => void;
  respond: (payload: any) => void;
}

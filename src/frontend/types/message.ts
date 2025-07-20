interface SendMessage {
  type: SendMessageTypes;
  payload: any;
}

interface RecieveMessage {
  type: RecieveMessageType;
  payload: any;
}

type Handler = (payload: any) => void | Promise<void>;

interface MessageRouter {
  //Initialize
  init: () => void;

  //Registers all handlers
  register: (message: RecieveMessage, handler: Handler) => void;

  //Listen to incomming data
  listen: () => void;

  //Send data
  send: (message: SendMessage) => void;
}

type SendMessageTypes = "select-file";
type RecieveMessageType = "shader-file";

export {
  Handler,
  MessageRouter,
  RecieveMessage,
  RecieveMessageType,
  SendMessage,
  SendMessageTypes,
};

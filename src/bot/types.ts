export interface TextMessageInput {
  kind: 'text';
  text: string;
}

export interface NewJokeMessageInput {
  kind: 'new-joke';
}

export interface NewJokeMessageAction {
  kind: 'new-joke';
  title: string;
}

export type MessageInput = TextMessageInput | NewJokeMessageInput;

export interface MessageReply {
  text: string;
  action: NewJokeMessageAction;
}

export interface TextMessageInput {
  kind: 'text';
  text: string;
}

export interface NewJokeMessageInput {
  kind: 'new-joke';
}

export type NewJokeMessageAction = Readonly<{
  kind: 'new-joke';
  title: string;
}>;

export type MessageInput = TextMessageInput | NewJokeMessageInput;

export interface MessageReply {
  text: string;
  action: NewJokeMessageAction;
}

export type MessageHandler = (input: MessageInput) => Promise<MessageReply>;

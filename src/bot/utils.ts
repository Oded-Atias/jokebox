import { NEW_JOKE_MESSAGE_ACTION } from './constants.ts';
import type { MessageReply } from './types.ts';

export function formatQuotedReplyText(text: string) {
  return `You said "${text}", but all I can do is tell jokes. Tap the button below for a random joke.`;
}

export function buildMessageReply(text: string): MessageReply {
  return {
    text,
    action: NEW_JOKE_MESSAGE_ACTION,
  };
}

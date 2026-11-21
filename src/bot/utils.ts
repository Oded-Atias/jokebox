import { MAX_QUOTE_LENGTH, NEW_JOKE_MESSAGE_ACTION } from './constants.ts';
import type { MessageReply } from './types.ts';

function truncateInputText(text: string) {
  if (text.length > MAX_QUOTE_LENGTH) {
    return `${text.slice(0, MAX_QUOTE_LENGTH)}...`;
  }

  return text;
}

export function formatQuotedReplyText(text: string) {
  return `You said "${truncateInputText(text)}", but all I can do is tell jokes. Tap the button below for a random joke.`;
}

export function buildMessageReply(text: string): MessageReply {
  return {
    text,
    action: NEW_JOKE_MESSAGE_ACTION,
  };
}

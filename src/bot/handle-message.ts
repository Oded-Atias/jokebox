import type { JokeProvider } from '../jokes/types.ts';
import { EMPTY_TEXT_REPLY } from './constants.ts';
import type { MessageHandler } from './types.ts';
import { buildMessageReply, formatQuotedReplyText } from './utils.ts';

export function createMessageHandler(provider: JokeProvider): MessageHandler {
  return async function (input) {
    if (input.kind === 'text') {
      const text = input.text.trim() === '' ? EMPTY_TEXT_REPLY : formatQuotedReplyText(input.text);

      return buildMessageReply(text);
    }

    const joke = await provider.getRandomJoke();

    return buildMessageReply(joke);
  };
}

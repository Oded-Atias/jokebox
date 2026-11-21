import type { JokeProvider } from '../jokes/types.ts';
import type { MessageHandler } from './types.ts';
import { buildMessageReply, formatQuotedReplyText } from './utils.ts';

export function createMessageHandler(provider: JokeProvider): MessageHandler {
  return async function (input) {
    if (input.kind === 'text') {
      return buildMessageReply(formatQuotedReplyText(input.text));
    }

    const joke = await provider.getRandomJoke();

    return buildMessageReply(joke);
  };
}

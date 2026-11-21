import type { JokeProvider } from '../jokes/types.ts';
import { NEW_JOKE_MESSAGE_ACTION } from './constants.ts';
import type { MessageHandler } from './types.ts';
import { formatTextReply } from './utils.ts';

export function createMessageHandler(provider: JokeProvider): MessageHandler {
  return async function (input) {
    if (input.kind === 'text') {
      return {
        text: formatTextReply(input.text),
        action: NEW_JOKE_MESSAGE_ACTION,
      };
    }

    const joke = await provider.getRandomJoke();

    return {
      text: joke,
      action: NEW_JOKE_MESSAGE_ACTION,
    };
  };
}

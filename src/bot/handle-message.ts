import type { JokeProvider } from '../jokes/types.ts';
import { NEW_JOKE_ASK } from './constants.ts';
import type { MessageInput, MessageReply } from './types.ts';
import { formatTextReply } from './utils.ts';

type HandleMessageFunction = (input: MessageInput) => Promise<MessageReply>;

export function createMessageHandler(provider: JokeProvider): HandleMessageFunction {
  return async function (input) {
    if (input.kind === 'text') {
      return {
        text: formatTextReply(input.text),
        action: {
          kind: 'new-joke',
          title: NEW_JOKE_ASK,
        },
      };
    }

    throw new Error('Not implemented yet');
  };
}

import type { NewJokeMessageAction } from './types.ts';

export const NEW_JOKE_ASK = 'Send me a new joke';

export const NEW_JOKE_MESSAGE_ACTION: NewJokeMessageAction = {
  kind: 'new-joke',
  title: NEW_JOKE_ASK,
};

export const MAX_QUOTE_LENGTH = 50;

import { describe, expect, it } from 'vitest';
import type { JokeProvider } from '../jokes/types.ts';
import { createMessageHandler } from './handle-message.ts';
import type { TextMessageInput } from './types.ts';

const JOKE_PROVIDER: JokeProvider = {
  getRandomJoke: () => Promise.resolve('A fixed joke'),
};

describe('handleMessage', () => {
  it('should quote the input text in the reply', async () => {
    const handleMessage = createMessageHandler(JOKE_PROVIDER);

    const input: TextMessageInput = { kind: 'text', text: 'Hi' };

    const result = await handleMessage(input);

    expect(result.text).toBe(
      'You said "Hi", but all I can do is tell jokes. Tap the button below for a random joke.'
    );
  });

  it('should return the new-joke action when the user sends text', async () => {
    const handleMessage = createMessageHandler(JOKE_PROVIDER);

    const input: TextMessageInput = { kind: 'text', text: 'Hi' };

    const result = await handleMessage(input);

    const expectedAction = {
      kind: 'new-joke',
      title: 'Send me a new joke',
    };

    expect(result.action).toEqual(expectedAction);
  });
});

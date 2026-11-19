import { describe, it, expect } from 'vitest';
import type { JokeProvider } from '../jokes/types.ts';
import { createMessageHandler } from './handle-message.ts';
import type { TextMessageInput } from './types.ts';

describe('handleMessage', () => {
  it('should quote the input text in the reply', async () => {
    const jokeProvider: JokeProvider = {
      getRandomJoke: () => Promise.resolve('A fixed joke'),
    };

    const handleMessage = createMessageHandler(jokeProvider);

    const input: TextMessageInput = { kind: 'text', text: 'Hi' };

    const result = await handleMessage(input);

    expect(result.text).toBe(
      'You said "Hi", but all I can do is tell jokes. Tap the button below for a random joke.'
    );
  });
});

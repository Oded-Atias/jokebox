import { describe, expect, it } from 'vitest';
import type { JokeProvider } from '../jokes/types.ts';
import { createMessageHandler } from './handle-message.ts';
import type { NewJokeMessageAction, NewJokeMessageInput, TextMessageInput } from './types.ts';

const JOKE_PROVIDER: JokeProvider = {
  getRandomJoke: () => Promise.resolve('A fixed joke'),
};

const TEXT_INPUT: TextMessageInput = { kind: 'text', text: 'Hi' };

const NEW_JOKE_INPUT: NewJokeMessageInput = { kind: 'new-joke' };

const EXPECTED_NEW_JOKE_ACTION: NewJokeMessageAction = {
  kind: 'new-joke',
  title: 'Send me a new joke',
};

describe('handleMessage', () => {
  it('should quote the input text in the reply', async () => {
    const handleMessage = createMessageHandler(JOKE_PROVIDER);

    const result = await handleMessage(TEXT_INPUT);

    expect(result.text).toBe(
      'You said "Hi", but all I can do is tell jokes. Tap the button below for a random joke.'
    );
  });

  it('should return the new-joke action when the user sends text', async () => {
    const handleMessage = createMessageHandler(JOKE_PROVIDER);

    const result = await handleMessage(TEXT_INPUT);

    expect(result.action).toEqual(EXPECTED_NEW_JOKE_ACTION);
  });

  it("should return the provider's joke when the user asks for a new joke", async () => {
    const handleMessage = createMessageHandler(JOKE_PROVIDER);

    const result = await handleMessage(NEW_JOKE_INPUT);

    expect(result.text).toBe('A fixed joke');
  });

  it('should return the new-joke action when the user asks for a new joke', async () => {
    const handleMessage = createMessageHandler(JOKE_PROVIDER);

    const result = await handleMessage(NEW_JOKE_INPUT);

    expect(result.action).toEqual(EXPECTED_NEW_JOKE_ACTION);
  });
});

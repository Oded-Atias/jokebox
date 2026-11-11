import { describe, expect, it } from 'vitest';

import { createInMemoryJokeProvider } from './in-memory-joke-provider.ts';

const jokes = [
  'Why did the scarecrow win an award? Because he was outstanding in his field!',
  'I told my wife she was drawing her eyebrows too high. She looked surprised.',
  "Why don't scientists trust atoms? Because they make up everything!",
];

describe('createInMemoryJokeProvider', () => {
  it('should return a joke from the list', async () => {
    const jokeProvider = createInMemoryJokeProvider(jokes, () => 0);

    const joke = await jokeProvider.getRandomJoke();

    expect(jokes).toContain(joke);
  });

  it('should return the last joke in the list for random function that returns 0.999', async () => {
    const jokeProvider = createInMemoryJokeProvider(jokes, () => 0.999);

    const joke = await jokeProvider.getRandomJoke();

    expect(joke).toBe(jokes[jokes.length - 1]);
  });

  it('should throw an error if the jokes list is empty', () => {
    expect(() => createInMemoryJokeProvider([], () => 0)).toThrow(
      'Cannot create a joke provider from an empty jokes list'
    );
  });

  it('should return the first joke in the list for random function that returns 0', async () => {
    const jokeProvider = createInMemoryJokeProvider(jokes, () => 0);

    const joke = await jokeProvider.getRandomJoke();

    expect(joke).toBe(jokes[0]);
  });

  it('should return the single joke in the list for random function that returns 0.999', async () => {
    const singleJoke = 'Some joke';

    const jokeProvider = createInMemoryJokeProvider([singleJoke], () => 0.999);

    const joke = await jokeProvider.getRandomJoke();

    expect(joke).toBe(singleJoke);
  });

  it('should throw an error if the jokes list has empty jokes', async () => {
    expect(() => createInMemoryJokeProvider(['', 'Another joke'], () => 0)).toThrow(
      'Cannot create a joke provider from list with empty jokes'
    );
  });
});

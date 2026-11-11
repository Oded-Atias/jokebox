import type { JokeProvider } from './types.ts';

export function createInMemoryJokeProvider(jokes: string[], random: () => number): JokeProvider {
  if (!jokes.length) {
    throw new Error('Cannot create a joke provider from an empty jokes list');
  }

  const hasEmptyJokes = jokes.some((joke) => joke.trim() === '');

  if (hasEmptyJokes) {
    throw new Error('Cannot create a joke provider from list with empty jokes');
  }

  return {
    getRandomJoke: async () => {
      const randomIndex = Math.floor(random() * jokes.length);

      const joke = jokes[randomIndex];

      if (joke === undefined) {
        throw new Error(
          `No joke available for the generated random index ${randomIndex} and list of length ${jokes.length}`
        );
      }

      return joke;
    },
  };
}

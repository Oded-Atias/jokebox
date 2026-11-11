export interface JokeProvider {
  getRandomJoke: () => Promise<string>;
}

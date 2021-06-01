import { Character } from '@antondavidenko/modular-character-threejs';
import { promiseDelay } from '@src/utils/promise-delay';

export abstract class AbstractCharacter {

  protected character: Character;
  protected shouldUpdate = true;

  getCharacter(): Character {
    return this.character;
  }

  async jump() {
    this.character.resetAnimation('Base@Jump');
    await promiseDelay(500);
    this.character.resetAnimation('Base@Idle');
  }

  async hit() {
    this.character.resetAnimation('Base@ChopTree');
    await promiseDelay(500);
    this.character.resetAnimation('Base@Idle');
  }

  async wave() {
    this.character.resetAnimation('Base@WaveHand');
    await promiseDelay(1500);
    this.character.resetAnimation('Base@Idle');
  }

  async die() {
    this.character.resetAnimation('Base@Die');
    await promiseDelay(1500);
    this.shouldUpdate = false;
  }

}

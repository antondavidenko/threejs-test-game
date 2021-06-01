import { Character } from '@antondavidenko/modular-character-threejs';
import { playerCharacter, friendsCharacters, enemiesCharacters } from './controls';

class CharactersCollection {

  init(scene: THREE.Scene, callback: () => void): void {
    playerCharacter.init(scene, callback);
    enemiesCharacters.init(scene);
    friendsCharacters.init(scene);
    this.update();
  }

  selected(): Character {
    return playerCharacter.character;
  }

  onTouchMove(forward: number, turn: number): void {
    playerCharacter.move(forward, turn);
  }

  async onPressB() {
    playerCharacter.jump();
  }

  async onPressA() {
    playerCharacter.hit();
  }

  private update(): void {
    playerCharacter.update();
    enemiesCharacters.update();
    friendsCharacters.update();
    requestAnimationFrame(this.update.bind(this));
  }

}

export const charactersCollection = new CharactersCollection();

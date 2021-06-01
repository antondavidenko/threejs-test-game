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
    return playerCharacter.getCharacter();
  }

  onTouchMove(forward: number, turn: number): void {
    playerCharacter.move(forward, turn);
  }

  onPressB() {
    playerCharacter.jump();
  }

  onPressA() {
    playerCharacter.hit();
    const playerPos = playerCharacter.getCharacter().position;
    const distance = playerPos.distanceTo(enemiesCharacters.getCharacter().position);
    if (distance <= 2) {
      enemiesCharacters.die();
    }
  }

  onPressC() {
    playerCharacter.wave();
    const playerPos = playerCharacter.getCharacter().position;
    const distance = playerPos.distanceTo(friendsCharacters.getCharacter().position);
    if (distance <= 2) {
      friendsCharacters.wave();
    }
  }

  private update(): void {
    playerCharacter.update();
    enemiesCharacters.update();
    friendsCharacters.update();
    requestAnimationFrame(this.update.bind(this));
  }

}

export const charactersCollection = new CharactersCollection();

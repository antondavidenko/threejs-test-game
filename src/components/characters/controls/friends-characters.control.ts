import { Character } from '@antondavidenko/modular-character-threejs';
import { friendConfig, defaultAnimationId } from '../characters.model';
import { AbstractCharacter } from './abstract-character.control';

class FriendsCharacters extends AbstractCharacter {

  init(scene: THREE.Scene): void {
    this.character = new Character(scene, friendConfig, defaultAnimationId, () => {
      this.character.position.x -= 1.5;
    });
  }

  update(): void {
    if (this.character && this.character.getIsReady()) {
      this.character.update();
      this.character.rotation.x = 0;
    }
  }

}

export const friendsCharacters = new FriendsCharacters();

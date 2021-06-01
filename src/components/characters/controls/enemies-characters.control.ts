import { Character } from '@antondavidenko/modular-character-threejs';
import { enemyConfig, defaultAnimationId } from '../characters.model';
import { AbstractCharacter } from './abstract-character.control';

class EnemiesCharacters extends AbstractCharacter {

  init(scene: THREE.Scene): void {
    this.character = new Character(scene, enemyConfig, defaultAnimationId, () => {
      this.character.position.x += 1.5;
    });
  }

  update(): void {
    if (this.character && this.character.getIsReady() && this.shouldUpdate) {
      this.character.update();
      this.character.rotation.x = 0;
    }
  }

}

export const enemiesCharacters = new EnemiesCharacters();

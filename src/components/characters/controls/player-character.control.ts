import { Character } from '@antondavidenko/modular-character-threejs';
import { worldComponent } from '@src/components/world/world.component';
import { playerConfig, defaultAnimationId } from '../characters.model';
import { AbstractCharacter } from './abstract-character.control';

const SPEED = 0.25;

class PlayerCharacter extends AbstractCharacter {

  private state = 'idle';
  private yRotation = 0;
  private forward = 0;

  init(scene: THREE.Scene, callback: () => void): void {
    this.character = new Character(scene, playerConfig, defaultAnimationId, () => {
      callback();
    });
  }

  update(): void {
    if (this.character && this.character.getIsReady()) {
      this.character.update();
      const { position, rotation } = this.character;
      rotation.x = 0;
      rotation.y = this.yRotation;
      position.z += ((this.forward / 1) * Math.cos(this.yRotation)) * SPEED;
      position.x += ((this.forward / 1) * Math.sin(this.yRotation)) * SPEED;
      const terrainHigh = worldComponent.getTerrainHigh(position.x, position.z);
      position.y = terrainHigh;
    }
  }

  move(forward: number, turn: number): void {
    if (this.character === undefined || !this.character.getIsReady()) return;

    this.yRotation -= turn / 25;
    this.forward = forward;
    if (forward > 0) {
      if (this.state !== 'run') {
        this.character.resetAnimation('Base@Dash');
        this.state = 'run';
      }
    } else if (this.state !== 'idle') {
      this.character.resetAnimation('Base@Idle');
      this.state = 'idle';
    }
  }

}

export const playerCharacter = new PlayerCharacter();

import { Character } from '@antondavidenko/modular-character-threejs';
import { worldComponent } from '@src/components/world/world.component';
import { promiseDelay } from '@src/utils/promise-delay';
import { playerConfig, defaultAnimationId } from '../characters.model';

const SPEED = 0.25;

class PlayerCharacter {

  private player: Character;
  private state = 'idle';
  private yRotation = 0;
  private forward = 0;

  init(scene: THREE.Scene, callback: () => void): void {
    this.player = new Character(scene, playerConfig, defaultAnimationId, () => {
      callback();
    });
  }

  update(): void {
    if (this.player && this.player.getIsReady()) {
      this.player.update();
      const { position, rotation } = this.player;
      rotation.x = 0;
      rotation.y = this.yRotation;
      position.z += ((this.forward / 1) * Math.cos(this.yRotation)) * SPEED;
      position.x += ((this.forward / 1) * Math.sin(this.yRotation)) * SPEED;
      const terrainHigh = worldComponent.getTerrainHigh(position.x, position.z);
      position.y = terrainHigh;
    }
  }

  move(forward: number, turn: number): void {
    if (this.player === undefined || !this.player.getIsReady()) return;

    this.yRotation -= turn / 25;
    this.forward = forward;
    if (forward > 0) {
      if (this.state !== 'run') {
        this.player.resetAnimation('Base@Dash');
        this.state = 'run';
      }
    } else if (this.state !== 'idle') {
      this.player.resetAnimation('Base@Idle');
      this.state = 'idle';
    }
  }

  async jump() {
    this.player.resetAnimation('Base@Jump');
    await promiseDelay(500);
    this.player.resetAnimation('Base@Idle');
  }

  async hit() {
    this.player.resetAnimation('Base@ChopTree');
    await promiseDelay(500);
    this.player.resetAnimation('Base@Idle');
  }

  get character(): Character {
    return this.player;
  }

}

export const playerCharacter = new PlayerCharacter();

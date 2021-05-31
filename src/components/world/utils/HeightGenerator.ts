import * as THREE from 'three';
import * as math from './math';

interface IGenerator {
    get(x: number, y: number): number;
}

export class HeightGenerator {

    private position: any;
    private radius: number[];
    private generator: IGenerator;

    constructor(generator: IGenerator, position: any, minRadius: number, maxRadius: number) {
      this.position = position.clone();
      this.radius = [minRadius, maxRadius];
      this.generator = generator;
    }

    get(x: number, y: number): number[] {
      const distance = this.position.distanceTo(new THREE.Vector2(x, y));
      const value = (distance - this.radius[0]) / (this.radius[1] - this.radius[0]);
      let normalization = 1.0 - math.sat(value);
      normalization = normalization * normalization * (3 - 2 * normalization);
      return [this.generator.get(x, y), normalization];
    }

}

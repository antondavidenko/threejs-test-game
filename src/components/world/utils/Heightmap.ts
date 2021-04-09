import * as THREE from 'three';
import { getImageData } from './getImageData';
import * as math from './math';
import { GROUND_SCALE } from '../WorldComponent';

export class Heightmap {

    private data: any;
    private scale: number;

    constructor(img, scale) {
      this.data = getImageData(img);
      this.scale = scale;
    }

    private getPixelAsFloat(x, y): any {
      const position = (x + this.data.width * y) * 4;
      const data = this.data.data;
      return data[position] / 255.0;
    }

    get(x: number, y: number): number {
      // Bilinear filter
      const offset = new THREE.Vector2(GROUND_SCALE/-2, GROUND_SCALE/-2);
      const dimensions = new THREE.Vector2(GROUND_SCALE, GROUND_SCALE);
  
      const xf = 1.0 - math.sat((x - offset.x) / dimensions.x);
      const yf = math.sat((y - offset.y) / dimensions.y);
      const w = this.data.width - 1;
      const h = this.data.height - 1;
  
      const x1 = Math.floor(xf * w);
      const y1 = Math.floor(yf * h);
      const x2 = math.clamp(x1 + 1, 0, w);
      const y2 = math.clamp(y1 + 1, 0, h);
  
      const xp = xf * w - x1;
      const yp = yf * h - y1;
  
      const p11 = this.getPixelAsFloat(x1, y1);
      const p21 = this.getPixelAsFloat(x2, y1);
      const p12 = this.getPixelAsFloat(x1, y2);
      const p22 = this.getPixelAsFloat(x2, y2);
  
      const px1 = math.lerp(xp, p11, p21);
      const px2 = math.lerp(xp, p12, p22);
  
      return math.lerp(yp, px1, px2) * this.scale;
    }

  }
import * as PIXI from 'pixi.js';
import { defaultPixiApp } from '../utils/app-service.util';

export type UiCirclePayload = {
  x: number;
  y: number;
  radius: number;
  color: number;
}

export class UiCircle {

  private graphics: PIXI.Graphics;

  constructor(payoad: UiCirclePayload) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(payoad.color);
    this.graphics.drawCircle(0, 0, payoad.radius);
    this.graphics.endFill();
    defaultPixiApp.get().stage.addChild(this.graphics);
  }

  setXY(x: number, y: number): void {
    this.graphics.position.set(x, y);
  }

  getXY(): { x: number, y: number } {
    return { x: this.graphics.x, y: this.graphics.y };
  }

  set alpha(value: number) {
    this.graphics.alpha = value;
  }

  getGraphics(): PIXI.Graphics {
    return this.graphics;
  }

}

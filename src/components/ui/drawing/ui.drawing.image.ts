import * as PIXI from 'pixi.js';
import { defaultPixiApp } from '../utils/app-service.util';

export class UiImage {

  private sprite: PIXI.Sprite;

  constructor(imageURL: string) {
    const texture = PIXI.Texture.from(imageURL);
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5);
    defaultPixiApp.get().stage.addChild(this.sprite);
  }

  setXY(x: number, y: number): void {
    this.sprite.position.set(x, y);
  }

}

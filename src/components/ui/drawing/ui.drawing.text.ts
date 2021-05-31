import * as PIXI from 'pixi.js';
import { defaultPixiApp } from '../utils/app-service.util';

export class UiText {

  private text: PIXI.Text;

  constructor(text: string, style: any) {
    this.text = new PIXI.Text(text, style);
    this.text.anchor.set(0.5);
    defaultPixiApp.get().stage.addChild(this.text);
  }

  setXY(x: number, y: number): void {
    this.text.position.set(x, y);
  }

}

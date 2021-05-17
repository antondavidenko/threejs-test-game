import { InteractionEvent } from "pixi.js";
import { UiCircle } from "../drawing/ui.drawing.circle";

export type JoysticEvent = {
  x: number;
  y: number;
};

export type JoysticCallback = (event: JoysticEvent) => void

const SimpleButtonCircle = { x: 960, y: 960, radius: 60, color: 0xdadada };
const BackgroundCircle = { x: 960, y: 960, radius: 120, color: 0x000000 };

export class UiSimpleJoystic {

  private background: UiCircle;
  private target: UiCircle;

  private onTouchMoveCallback: JoysticCallback;
  private onTouchEndCallback: JoysticCallback;

  constructor() {
    this.background = new UiCircle(BackgroundCircle);
    this.background.alpha = 0.5;
    this.target = new UiCircle(SimpleButtonCircle);

    this.background.getGraphics().interactive = true;
    this.background.getGraphics()
      .on('pointerdown', this.startFollow.bind(this))
      .on('pointerup', this.stopFollow.bind(this))
      .on('pointerupoutside', this.stopFollow.bind(this));
  }

  private startFollow(): void {
    this.background.getGraphics().on('pointermove', this.onMove.bind(this));
  }

  private stopFollow(): void {
    const {x, y} = this.background.getXY();
    this.background.getGraphics().off('pointermove');
    this.target.setXY(x, y);
    this.onTouchEndCallback({x: 0, y: 0});
  }

  private onMove(event: InteractionEvent): void {
    const { x, y } = this.getNormalized(event.data.global);
    this.target.setXY(x, y);
    const center = this.background.getXY();
    this.onTouchMoveCallback( {x: x - center.x, y: y - center.y });
  }

  setXY(x: number, y: number): void {
    this.background.setXY(x, y);
    this.target.setXY(x, y);
  }

  private getNormalized(point: {x: number, y: number}): JoysticEvent {
    const center = this.background.getXY();
    const cathetus1 = point.x - center.x;
    const cathetus2 = point.y - center.y;
    const hypotenuse = Math.sqrt(cathetus1*cathetus1 + cathetus2*cathetus2);
    const angle = Math.atan2(cathetus1, cathetus2);
    const distance = hypotenuse > 120 ? 120 : hypotenuse;
    const x = center.x + distance * Math.sin(angle);
    const y = center.y + distance * Math.cos(angle);
    return {x, y};
  }

  onTouchMove(callback: JoysticCallback) {
      this.onTouchMoveCallback = callback;
  };

  onTouchEnd(callback: JoysticCallback) {
      this.onTouchEndCallback = callback;
  };

}

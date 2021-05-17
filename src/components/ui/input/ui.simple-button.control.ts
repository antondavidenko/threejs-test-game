import { UiCircle } from "../drawing/ui.drawing.circle";
import { UiText } from '../drawing/ui.drawing.text';

const SimpleButtonCircle = { x: 960, y: 960, radius: 60, color: 0xdadada };
const SimpleButtonTextStyle = { fontFamily: "Arial", fontSize: 100, fill: '#000000' };

type SimpleButtonPayload = {
  label: string;
  callback: () => {};
}

export class UiSimpleButton {

  private text: UiText;
  private circle: UiCircle;

  constructor(payload: SimpleButtonPayload) {
    this.circle = new UiCircle(SimpleButtonCircle);
    this.circle.getGraphics().interactive = true;
    this.circle.getGraphics().on('pointerdown', payload.callback);

    this.text = new UiText(payload.label, SimpleButtonTextStyle);
  }

  setXY(x: number, y: number): void {
    this.circle.setXY(x, y);
    this.text.setXY(x, y);
  }

}

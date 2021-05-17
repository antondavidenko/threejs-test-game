import * as PIXI from 'pixi.js';
import { PIXI_APP_CONFIG } from './model/pixi-app.config';
import { defaultPixiApp } from './utils/app-service.util';
import { UiSimpleButton } from './input/ui.simple-button.control';
import { JoysticEvent, UiSimpleJoystic } from './input/ui.simple-joystic.control';
import { UiImage } from './drawing/ui.drawing.image';

export type UiEvent = {
  joystic: JoysticEvent,
  buttonA: boolean,
  buttonB: boolean,
};

export type UiCallback = (event: UiEvent) => void

class PixiUI {

  private app: PIXI.Application;
  private buttonA: UiSimpleButton;
  private buttonB: UiSimpleButton;
  private joystic: UiSimpleJoystic;
  private logo: UiImage;

  private onTouchStartCallback: UiCallback;
  private onTouchMoveCallback: UiCallback;
  private onTouchEndCallback: UiCallback;

  init(renderCanvas: HTMLCanvasElement): void {
    this.app = new PIXI.Application(PIXI_APP_CONFIG);
    document.body.appendChild(this.app.view);
    this.allowThreeControls(renderCanvas);
    this.app.renderer.view.id = 'pixi-canvas';
    this.app.view.style.setProperty('position', 'absolute');
    this.app.view.style.setProperty('top', '0px');
    defaultPixiApp.set(this.app)

    this.drawDefaultUi();
    window.onresize = this.resize.bind(this);
    this.resize();
  }

  drawDefaultUi(): void {
    this.buttonA = new UiSimpleButton({ label: 'A', callback: this.onButtonPressed.bind(this, 'A') });
    this.buttonB = new UiSimpleButton({ label: 'B', callback: this.onButtonPressed.bind(this, 'B') });
    this.joystic = new UiSimpleJoystic();
    this.joystic.onTouchEnd((event: JoysticEvent) => {
      this.onTouchEndCallback({ joystic: event, buttonA: false, buttonB: false });
    });
    this.joystic.onTouchMove((event: JoysticEvent) => {
      this.onTouchMoveCallback({ joystic: event, buttonA: false, buttonB: false });
    });
    this.logo = new UiImage('textures/logo.png');
  }

  private allowThreeControls(renderCanvas: HTMLCanvasElement): void {
    this.app.renderer.plugins.interaction.setTargetElement(renderCanvas);
    this.app.view.style.setProperty('pointer-events', 'none');
  }

  private resize(): void {
    this.buttonA.setXY(window.innerWidth - 300, window.innerHeight - 100);
    this.buttonB.setXY(window.innerWidth - 100, window.innerHeight - 100);
    this.joystic.setXY(220, window.innerHeight - 180);
    this.logo.setXY(window.innerWidth - 100, 150);
  }

  private onButtonPressed(buttonId: string): void {
    const joysticPayload = { joystic: { x: 0, y: 0, angle: 0 } };
    const buttonsPayload = { buttonA: buttonId === 'A', buttonB: buttonId === 'B' };
    this.onTouchStartCallback({ ...joysticPayload, ...buttonsPayload });
  }

  onTouchStart(callback: UiCallback) {
      this.onTouchStartCallback = callback;
  };

  onTouchMove(callback: UiCallback) {
      this.onTouchMoveCallback = callback;
  };

  onTouchEnd(callback: UiCallback) {
      this.onTouchEndCallback = callback;
  };

}

export const pixiUI = new PixiUI();

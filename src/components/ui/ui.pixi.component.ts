import * as PIXI from 'pixi.js';

export const WIDTH = 960;
export const HEIGHT = 960;

class PixiUI {

  private app: PIXI.Application;
  private renderer: PIXI.Renderer;
  private wrapper: PIXI.Container;

  init(renderCanvas: HTMLCanvasElement): void {
    this.app = new PIXI.Application(
      {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: 0x000000,
        resolution: window.devicePixelRatio || 1,
        antialias: true,
        transparent: true,
      },
    );
    document.body.appendChild(this.app.view);

    this.allowThreeControls(renderCanvas);

    this.wrapper = new PIXI.Container();
    this.app.stage.addChild(this.wrapper);

    this.renderer = this.app.renderer;
    this.renderer.view.id = 'pixi-canvas';

    this.app.view.style.setProperty('position', 'absolute');
    this.app.view.style.setProperty('top', '0px');

    this.testCircle();
    this.testImage();
  }

  private testCircle(): void {
    const gr = new PIXI.Graphics();
    gr.beginFill(0xff0000);
    gr.drawCircle(30, 30, 300);
    gr.endFill();
    this.app.stage.addChild(gr);
    gr.interactive = true;
    gr.on('pointerdown', (e) => {
      console.log("touch!! GR");
    });
  }

  private testImage(): void {
    var texture = PIXI.Texture.from('textures/shader/triangles.jpg');
    var sprite1 = new PIXI.Sprite(texture);
    sprite1.scale.set(0.25);
    this.app.stage.addChild(sprite1);
    sprite1.interactive = true;
    sprite1.on('pointerdown', (e) => {
      console.log("touch!! SPR");
    });
  }

  private allowThreeControls(renderCanvas: HTMLCanvasElement): void {
    this.app.renderer.plugins.interaction.setTargetElement(renderCanvas);
    this.app.view.style.setProperty('pointer-events', 'none');
  }

}

export const pixiUI = new PixiUI();

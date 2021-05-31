class DefaultPixiApp {

  private app: PIXI.Application;

  set(app: PIXI.Application): void {
    this.app = app;
  }

  get(): PIXI.Application {
    return this.app;
  }

}

export const defaultPixiApp = new DefaultPixiApp();

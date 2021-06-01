import Stats from 'three/examples/jsm/libs/stats.module';

class StatsControl {

  private stats: Stats;
  private enableStats: boolean;

  init(enableStats: boolean): void {
    this.enableStats = enableStats;
    if (enableStats) {
      this.stats = Stats();
      document.body.appendChild(this.stats.dom);
    }
  }

  update(): void {
    if (this.enableStats) {
      this.stats.update();
    }
  }

}

export const statsControl = new StatsControl();

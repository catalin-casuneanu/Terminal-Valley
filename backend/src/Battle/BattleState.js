export default class BattleState {
  constructor() {
    this.logs = [];
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new BattleState();
    }
    return this.instance;
  }
  update(log) {
    this.logs.push(log);
  }
  reset() {
    this.logs = [];
  }
}

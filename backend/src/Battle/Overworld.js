import Battle from './Battle';
import BattleState from './BattleState';
import Enemies from './Enemies';

interface OverWorldEvent {
  type: string;
  enemyId: string;
}

export default class Overworld {
  event: OverWorldEvent;
  constructor(event: OverWorldEvent) {
    this.event = event;
  }

  battle(resolve: (result: string) => void) {
    const battle = new Battle({
      enemy: Enemies[this.event.enemyId as keyof typeof Enemies],
      onComplete: (didWin: boolean) => {
        const battleState = BattleState.getInstance();
        const logs = battleState.logs;
        battleState.reset();
        resolve({
          result: didWin ? 'WON BATTLE' : 'LOST BATTLE',
          logs
        });
      }
    });
    battle.init();
  }

  init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve);
    });
  }
}

import BattleEvent from './BattleEvent';
import Combatant from './Combatant';
import PlayerState from './PlayerState';
import TurnCycle from './TurnCycle';

export default class Battle {
  constructor({ enemy, onComplete }) {
    this.enemy = enemy;
    this.onComplete = onComplete;
    this.combatants = {};
    this.activeCombatants = {
      player: null,
      enemy: null
    };
    const player = new PlayerState();
    this.addCombatant(player.stats.id, 'player', player.stats);
    //Now the enemy team
    this.addCombatant('e_' + enemy.stats.id, 'enemy', this.enemy.stats);
  }

  addCombatant(id, team, config) {
    this.combatants[id] = new Combatant(
      {
        ...config,
        team,
        isPlayerControlled: team === 'player'
      },
      this
    );

    //Populate first active pokeLang
    this.activeCombatants[team] = this.activeCombatants[team] || id;
  }

  init() {
    this.turnCycle = new TurnCycle({
      battle: this,
      onNewEvent: (event) => {
        return new Promise((resolve) => {
          const battleEvent = new BattleEvent(event, this);
          battleEvent.init(resolve);
        });
      },
      onWinner: (winner) => {
        if (winner === 'player') {
          const playerState = new PlayerState();
          const combatant = this.combatants[playerState.stats.id];
          if (combatant) {
            playerState.hp = combatant.hp;
            playerState.xp = combatant.xp;
            playerState.maxXp = combatant.maxXp;
            playerState.level = combatant.level;
          }
        }

        this.onComplete(winner === 'player');
      }
    });
    this.turnCycle.init();
  }
}

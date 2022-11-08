import utils from '../utils';
import Abilitties from './Abilitties';

export default class Combatant {
  constructor(config, battle) {
    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });
    this.hp = typeof this.hp === 'undefined' ? this.maxHp : this.hp;
    this.battle = battle;
  }

  get hpPercent() {
    const percent = (this.hp / this.maxHp) * 100;
    return percent > 0 ? percent : 0;
  }

  get xpPercent() {
    return (this.xp / this.maxXp) * 100;
  }

  get isActive() {
    return this.battle?.activeCombatants[this.team] === this.id;
  }

  get givesXp() {
    return this.level * 20;
  }

  update(changes = {}) {
    //Update anything incoming
    Object.keys(changes).forEach((key) => {
      this[key] = changes[key];
    });
  }

  getReplacedEvents(originalEvents) {
    if (
      this.team === 'enemy' &&
      this.battle.combatants.p1.status?.type !== 'resilience' &&
      utils.randomFromArray([true, false, false, false, false])
    ) {
      const newEvents = originalEvents.map((event) => {
        if (event.type === 'stateChange') {
          return { ...event, damage: event.damage / 2 };
        }
        return event;
      });
      return [...newEvents, ...Abilitties.resilience.success];
    }

    return originalEvents;
  }

  getPostEvents() {
    if (this.status?.type === 'saucy') {
      return [
        { type: 'textMessage', text: "Feelin' saucy!" },
        { type: 'stateChange', recover: 5, onCaster: true }
      ];
    }
    return [];
  }

  decrementStatus() {
    const statusType = this.status?.type;
    if (this.status?.expiresIn > 0) {
      this.status.expiresIn -= 1;
      if (this.status.expiresIn === 0) {
        this.update({
          status: null
        });
        return {
          type: 'textMessage',
          text: `${statusType.toUpperCase()} status expired!`
        };
      }
    }
    return null;
  }

  init() {
    this.update();
  }
}

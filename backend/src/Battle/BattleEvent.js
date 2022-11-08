import utils from '../utils';
import BattleState from './BattleState';
import SubmissionMenu from './SubmissionMenu';

export default class BattleEvent {
  constructor(event, battle) {
    this.event = event;
    this.battle = battle;
  }

  async stateChange(resolve) {
    const { caster, target, damage, recover, status } = this.event;
    let who = this.event.onCaster ? caster : target;

    if (damage && utils.random() >= target.luck) {
      //modify the target to have less HP
      const calculatedDamage = caster.strength - target.defense;
      target.update({
        hp: target.hp - calculatedDamage
      });
    } else {
      this.event.text = `${caster.name} missed!`;
      this.textMessage(resolve);
    }

    if (recover) {
      let newHp = who.hp + recover;
      if (newHp > who.maxHp) {
        newHp = who.maxHp;
      }
      who.update({
        hp: newHp
      });
    }

    if (status) {
      who.update({
        status: { ...status }
      });
    }
    if (status === null) {
      who.update({
        status: null
      });
    }

    resolve();
  }

  textMessage(resolve) {
    const text = this.event.text
      .replace('{CASTER}', this.event.caster?.name)
      .replace('{TARGET}', this.event.target?.name)
      .replace('{ACTION}', this.event.action?.name);
    const battleState = BattleState.getInstance();
    battleState.update({ text });
    resolve(true);
  }

  submissionMenu(resolve) {
    const { caster } = this.event;
    const menu = new SubmissionMenu({
      caster: caster,
      enemy: this.event.enemy,
      replacements: Object.values(this.battle.activeCombatants).filter((c) => {
        return c.id !== caster.id && c.team === caster.team && c.hp > 0;
      }),
      onComplete: (submission) => {
        //submission { what move to use, who to use it on }
        resolve(submission);
      }
    });
    menu.init(this.battle.element);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}

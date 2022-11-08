import utils from '../utils';
import Actions from './Actions';

export default class SubmissionMenu {
  constructor({ caster, enemy, onComplete, replacements }) {
    this.caster = caster;
    this.enemy = enemy;
    this.replacements = replacements;
    this.onComplete = onComplete;
  }

  menuSubmit(action, instanceId = null) {
    this.onComplete({
      action,
      target: action.targetType === 'friendly' ? this.caster : this.enemy,
      instanceId
    });
  }

  decide() {
    this.menuSubmit(Actions.damage1);
  }

  autoDecidePlayer() {
    const random = utils.random();
    if (random <= 1) {
      this.menuSubmit(Actions.luckyCriticalStrike);
    } else if (random <= 10) {
      this.menuSubmit(Actions.criticalStrike);
    } else {
      this.menuSubmit(Actions.damage1);
    }
  }

  init() {
    if (this.caster.isPlayerControlled) {
      this.autoDecidePlayer();
    } else {
      this.decide();
    }
  }
}

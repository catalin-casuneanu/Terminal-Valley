export default class TurnCycle {
  constructor({ battle, onNewEvent, onWinner }) {
    this.battle = battle;
    this.onNewEvent = onNewEvent;
    this.onWinner = onWinner;
    this.currentTeam = 'player';
    this.turnsRemaining = 20;
  }

  nextTurn() {
    this.currentTeam = this.currentTeam === 'player' ? 'enemy' : 'player';
    this.turnsRemaining -= 1;
    this.turn();
  }

  async turn() {
    //Get the caster
    const casterId = this.battle.activeCombatants[this.currentTeam];
    const caster = this.battle.combatants[casterId];
    const enemyId =
      this.battle.activeCombatants[
        caster.team === 'player' ? 'enemy' : 'player'
      ];
    const enemy = this.battle.combatants[enemyId];

    await this.onNewEvent({
      type: 'textMessage',
      text: `Turns remaining: ${this.turnsRemaining}`
    });

    const submission = await this.onNewEvent({
      type: 'submissionMenu',
      caster,
      enemy
    });

    const resultingEvents = caster.getReplacedEvents(submission.action.success);

    for (let i = 0; i < resultingEvents.length; i++) {
      const event = {
        ...resultingEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target
      };
      await this.onNewEvent(event);
    }

    await this.onNewEvent({
      type: 'textMessage',
      text: `${caster.name} Hp: ${caster.hp}; ${enemy.name} Hp: ${enemy.hp}`
    });

    //Did the target die?
    const targetDead = submission.target.hp <= 0;
    if (targetDead) {
      await this.onNewEvent({
        type: 'textMessage',
        text: `${submission.target.name} is ruined!`
      });

      if (submission.target.team === 'enemy') {
        // @TODO: give player xp
      }
    }

    //Do we have a winning team?
    const winner = this.getWinningTeam();
    if (winner) {
      await this.onNewEvent({
        type: 'textMessage',
        text: `${caster.name} is the winner!`
      });
      this.onWinner(winner);
      return;
    }

    //Check for post events
    //(Do things AFTER your original turn submission)
    const postEvents = caster.getPostEvents();
    for (let i = 0; i < postEvents.length; i++) {
      const event = {
        ...postEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target
      };
      await this.onNewEvent(event);
    }

    //Check for status expire
    const expiredEvent = caster.decrementStatus();
    if (expiredEvent) {
      await this.onNewEvent(expiredEvent);
    }

    this.nextTurn();
  }

  getWinningTeam() {
    let aliveTeams = {};
    Object.values(this.battle.combatants).forEach((c) => {
      if (c.hp > 0) {
        aliveTeams[c.team] = true;
      }
    });
    if (!aliveTeams['player']) {
      return 'enemy';
    }
    if (!aliveTeams['enemy']) {
      return 'player';
    }
    return null;
  }

  async init() {
    await this.onNewEvent({
      type: 'textMessage',
      text: 'The Battle is starting'
    });

    this.turn();
  }
}

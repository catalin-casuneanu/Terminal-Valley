export default {
  damage1: {
    name: 'Whomp!',
    description: 'Punch of code',
    success: [
      { type: 'textMessage', text: '{CASTER} uses {ACTION}!' },
      { type: 'stateChange', damage: 10 }
    ],
    targetType: 'enemy'
  },
  criticalStrike: {
    name: 'Critical Whomp!',
    description: 'Critical punch of code',
    success: [
      { type: 'textMessage', text: '{CASTER} uses {ACTION}!' },
      { type: 'stateChange', damage: 10 }
    ],
    targetType: 'enemy'
  },
  luckyCriticalStrike: {
    name: 'Lucky Whomp!',
    description: 'Lucky punch of code',
    success: [
      { type: 'textMessage', text: '{CASTER} uses {ACTION}!' },
      { type: 'stateChange', damage: 10 }
    ],
    targetType: 'enemy'
  }
};

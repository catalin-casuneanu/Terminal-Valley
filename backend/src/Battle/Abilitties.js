export default {
  resilience: {
    name: 'Lucky Whomp!',
    description: 'Lucky punch of code',
    success: [
      {
        type: 'textMessage',
        text: `{CASTER} is resilient!`
      },
      { type: 'stateChange', status: { type: 'resilience', expiresIn: 2 } }
    ],
    targetType: 'enemy'
  }
};

window.Actions = {
  damage1: {
    name: "Whomp!",
    description: "Punch of code",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 10 }
    ]
  },
  criticalStrike: {
    name: "Max Whomp!",
    description: "Critical punch of code",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 10 },
    ]
  },
  luckyCriticalStrike: {
    name: "Max Whomp!",
    description: "Lucky punch of code",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 10 },
    ]
  },
  //Items
  item_recoverStatus: {
    name: "Coffee",
    description: "Feeling fresh and warm",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!" },
      { type: "stateChange", status: null },
      { type: "textMessage", text: "Feeling fresh!", },
    ]
  },
  item_recoverHp: {
    name: "pokeLang",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} sprinkles on some {ACTION}!", },
      { type: "stateChange", recover: 10, },
      { type: "textMessage", text: "{CASTER} recovers HP!", },
    ]
  },
}
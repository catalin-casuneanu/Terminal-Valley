class PlayerState {
  constructor() {
    this.pokeLangs = {
      "p1": {
        pokeLangId: "s001",
        hp: utils.randomFromMinMax(70, 100),
        maxHp: 100,
        strength: utils.randomFromMinMax(70, 80),
        defense: utils.randomFromMinMax(45, 55),
        speed: utils.randomFromMinMax(40, 50),
        luck: utils.randomFromMinMax(10, 30),
        xp: 0,
        maxXp: 100,
        level: 1,
        status: null,
      },
    }
    this.lineup = ["p1"];
    this.items = [
      { actionId: "item_recoverHp", instanceId: "item1" },
      { actionId: "item_recoverHp", instanceId: "item2" },
      { actionId: "item_recoverHp", instanceId: "item3" },
    ]
    this.storyFlags = {
    };
  }

  addpokeLang(pokeLangId) {
    const newId = `p${Date.now()}` + Math.floor(Math.random() * 99999);
    this.pokeLangs[newId] = {
      pokeLangId,
      hp: 50,
      maxHp: 50,
      xp: 0,
      maxXp: 100,
      level: 1,
      status: null,
    }
    if (this.lineup.length < 3) {
      this.lineup.push(newId)
    }
    utils.emitEvent("LineupChanged");
  }

  swapLineup(oldId, incomingId) {
    const oldIndex = this.lineup.indexOf(oldId);
    this.lineup[oldIndex] = incomingId;
    utils.emitEvent("LineupChanged");
  }

  moveToFront(futureFrontId) {
    this.lineup = this.lineup.filter(id => id !== futureFrontId);
    this.lineup.unshift(futureFrontId);
    utils.emitEvent("LineupChanged");
  }

}
window.playerState = new PlayerState();
import utils from '../utils';

export default class PlayerState {
  constructor() {
    this.stats = {
      name: 'hero',
      id: 'p1',
      hp: utils.randomFromMinMax(70, 100),
      maxHp: 100,
      strength: utils.randomFromMinMax(70, 80),
      defense: utils.randomFromMinMax(45, 55),
      speed: utils.randomFromMinMax(40, 50),
      luck: utils.randomFromMinMax(10, 30),
      xp: 0,
      maxXp: 100,
      level: 1,
      status: null
    };
  }
}

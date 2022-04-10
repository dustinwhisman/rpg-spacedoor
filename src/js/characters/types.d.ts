export type CharacterInput = {
  _id: string,
  name: string,
  game: string,
  group: string,
  stats: {
    data: Array<{
      _id: string,
      name: string,
      die: string,
      bonus: number,
      dcBonus: number,
      skills: {
        data: Array<{
          _id: string,
          name: string,
          die: string,
          bonusDie: string,
          bonus: number,
        }>
      }
    }>
  },
  damageDie: string,
  numDamageDie: number,
  damageBonus: number,
  healingDie: string,
  numHealingDie: number,
  healingBonus: number,
  damageThreshold: number,
  damageThresholdBonus: number,
  actionPointMax: number,
  actionPoints: number,
  experiencePoints: number,
  baseHitPointMax: number,
  hitPointMultiplier: number,
  hitPoints: number,
  hitPointRegen: number,
  baseShieldHitPointMax: number,
  shieldHitPointMultiplier: number,
  shieldHitPoints: number,
  shieldHitPointRegen: number,
  vulnerabilities: string[],
  resistances: string[],
  immunities: string[],
  upgrades: {
    data: Array<{
      _id: string,
      name: string,
      description: string,
      cost: number,
      type?: string,
    }>
  },
  inventory: {
    data: Array<{
      _id: string,
      name: string,
      description: string,
    }>,
  },
};

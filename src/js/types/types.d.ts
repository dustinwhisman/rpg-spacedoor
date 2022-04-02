export interface Skill {
  name: string,
  die: string,
  bonus: number,
}

export interface Stat {
  name: string,
  die: string,
  bonus: number,
  dcBonus: number,
  skills: Skill[],
}

export interface Upgrade {
  stat?: string,
  skill?: string,
  name: string,
  description: string,
  cost: number,
  canPurchase?: (any) => boolean,
  onPurchase?: (any) => void,
  onExchange?: (any) => void,
}

export interface Character {
  name: string,
  stats: Stat[],
  damageDie: string,
  numDamageDie: number,
  damageBonus: number,
  healingDie: string,
  numHealingDie: number,
  healingBonus: number,
  damageThreshold: number,
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
  upgrades: Upgrade[],
}

export interface Skill {
  _id?: string,
  name: string,
  die: string,
  bonusDie: string,
  bonus: number,
}

export interface Stat {
  _id?: string,
  name: string,
  die: string,
  bonus: number,
  dcBonus: number,
  skills: Skill[],
}

export interface Upgrade {
  _id?: string,
  stat?: string,
  skill?: string,
  name: string,
  description: string,
  cost: number,
  type?: string,
  canPurchase?: (any) => boolean,
  onPurchase?: (character: Character, upgrade: Upgrade) => Promise<Character | null>,
  onExchange?: (any) => void,
}

export interface InventoryItem {
  _id?: string,
  name: string,
  description: string,
}

export interface Character {
  _id: string,
  name: string,
  group: string,
  stats: Stat[],
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
  upgrades: Upgrade[],
  inventory: InventoryItem[],
}

export interface StatToUpdate {
  statName: string,
  newValue: number | string,
}

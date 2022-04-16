export interface Skill {
  name: string,
  die: string,
  bonusDie: string,
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
  type?: string,
  canPurchase?: (any) => boolean,
  onPurchase?: (character: Character, upgrade: Upgrade) => Promise<Character | null>,
  onExchange?: (any) => void,
}

export interface InventoryItem {
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

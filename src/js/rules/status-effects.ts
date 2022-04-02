export const statusEffects = [
  {
    name: 'Armor Break',
    description: 'Affected targets have their AC halved (rounded down). At the end of their turn, they can make a Cool saving throw to try to end the effect.',
    savingThrow: 'Cool',
    opposedStat: 'Tough',
    inflictedBy: [
      'attack',
    ],
  },
  {
    name: 'Asleep',
    description: 'Affected targets are unable to act in combat. In place of their Action, the target can make a Sharp saving throw to try to wake up. If they succeed, they wake up and can use their Bonus Action and Reaction.',
    savingThrow: 'Sharp',
    opposedStat: 'Charm',
    inflictedBy: [
      'action',
    ],
  },
  {
    name: 'Berserk',
    description: 'Affected targets must use their Action to attack the nearest enemy on their turn, and they may only use offensive Bonus Actions and Reactions. At the end of their turn, they can make a Sharp saving throw to try to end the effect.',
    savingThrow: 'Sharp',
    opposedStat: 'Charm',
    inflictedBy: [
      'action',
    ],
  },
  {
    name: 'Bleeding',
    description: 'Affected targets take bleed damage at the end of their turn, at which point they can make a Cool saving throw to try to end the effect.',
    savingThrow: 'Cool',
    opposedStat: 'Cool',
    inflictedBy: [
      'attack',
    ],
  },
  {
    name: 'Blinded',
    description: 'Affected targets are unable to see. Any rolls that require precision targeting must be made with Disadvantage, and any offensive rolls made against the player will be made with Advantage. At the end of their turn, the target can make a Sharp saving throw to try to end the effect.',
    savingThrow: 'Sharp',
    opposedStat: 'Sharp',
    inflictedBy: [
      'attack',
      'action',
    ],
  },
  {
    name: 'Charmed',
    description: 'Affected targets will behave as if allied with whoever inflicted the effect, but will still have self-preservation instincts. At the end of their turn, the Charmed target can make a Sharp saving throw to end the effect.',
    savingThrow: 'Sharp',
    opposedStat: 'Charm',
    inflictedBy: [
      'action',
    ],
  },
  {
    name: 'Confused',
    description: 'Affected targets will randomly attack anybody involved in combat, including themselves. On their turn, the target must roll a d4 to determine who is attacked, with 1 being themselves, and the other numbers being the next closest combatants. At the end of their turn, the Confused target can make a Sharp saving throw to end the effect.',
    savingThrow: 'Sharp',
    opposedStat: 'Charm',
    inflictedBy: [
      'action',
    ],
  },
  {
    name: 'Frightened',
    description: 'Affected targets must use their Movement to get away from whoever or whatever inflicted the effect. At the end of their turn, the target can make a Cool saving throw to try to end the effect.',
    savingThrow: 'Cool',
    opposedStat: 'Charm',
    inflictedBy: [
      'action',
    ],
  },
  {
    name: 'Mental Break',
    description: 'Affected targets have their core stat DCs halved (rounded down). At the end of their turn, they can make a Sharp saving throw to try to end the effect.',
    savingThrow: 'Sharp',
    opposedStat: 'Cool',
    inflictedBy: [
      'attack',
      'action',
    ],
  },
  {
    name: 'Poisoned',
    description: 'Affected targets take poison damage at the end of their turn, at which point they can make a Tough saving throw to try to end the effect.',
    savingThrow: 'Tough',
    opposedStat: 'Cool',
    inflictedBy: [
      'attack',
    ],
  },
  {
    name: 'Power Break',
    description: 'Affected targets deal half damage (rounded down). At the end of their turn, they can make a Tough saving throw to try to end the effect.',
    savingThrow: 'Tough',
    opposedStat: 'Tough',
    inflictedBy: [
      'attack',
    ],
  },
  {
    name: 'Restrained',
    description: 'Affected targets cannot use their Movement or Reaction. They can use their Action to make a Tough saving throw to break free, at which point they can use their Movement and Reaction, or they can choose to stay put and use their Action and Bonus Action for something else.',
    savingThrow: 'Tough',
    opposedStat: 'Tough',
    inflictedBy: [
      'action',
    ],
  },
  {
    name: 'Silenced',
    description: 'Affected targets cannot speak, and they lose the use of their Bonus Action. At the end of their turn, they can make a Cool saving throw to try to end the effect.',
    savingThrow: 'Cool',
    opposedStat: 'Sharp',
    inflictedBy: [
      'action',
    ],
  },
  {
    name: 'Slow',
    description: 'Affected targets can use either their Movement or their Action, but not both, and they cannot use their Bonus Action or Reaction. At the end of their turn, the target can make a Cool saving throw to try to end the effect.',
    savingThrow: 'Cool',
    opposedStat: 'Cool',
    inflictedBy: [
      'action',
    ],
  },
  {
    name: 'Stunned',
    description: 'Affected targets are unable to act in combat. In place of their Action, the target can make a Tough saving throw to try to snap out of it. If they succeed, they can use their Bonus Action and Reaction.',
    savingThrow: 'Tough',
    opposedStat: 'Tough',
    inflictedBy: [
      'attack',
    ],
  },
];

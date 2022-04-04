import React from 'react';

export const SecondaryStats = ({
  numDamageDie,
  damageDie,
  damageBonus,
  damageThreshold,
  numHealingDie,
  healingDie,
  healingBonus,
}: {
  numDamageDie: number,
  damageDie: string,
  damageBonus: number,
  damageThreshold: number,
  numHealingDie: number,
  healingDie: string,
  healingBonus: number,
}) => (
  <div>
    <p>
      {`Damage Dice: ${numDamageDie > 1 ? numDamageDie : ''}${damageDie}${damageBonus > 0 ? ` + ${damageBonus}` : ''}`}
    </p>
    <p>
      {`Damage Threshold: ${damageThreshold}`}
    </p>
    <p>
      {`Healing Dice: ${numHealingDie > 1 ? numHealingDie : ''}${healingDie}${healingBonus > 0 ? ` + ${healingBonus}` : ''}`}
    </p>
  </div>
);

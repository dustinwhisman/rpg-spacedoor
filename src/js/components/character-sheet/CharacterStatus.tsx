import React from 'react';

export const CharacterStatus = ({
  hitPoints,
  baseHitPointMax,
  hitPointMultiplier,
  hitPointRegen,
  baseShieldHitPointMax,
  shieldHitPoints,
  shieldHitPointMultiplier,
  shieldHitPointRegen,
  actionPoints,
  actionPointMax,
  experiencePoints,
}: {
  hitPoints: number,
  baseHitPointMax: number,
  hitPointMultiplier: number,
  hitPointRegen: number,
  baseShieldHitPointMax: number,
  shieldHitPoints: number,
  shieldHitPointMultiplier: number,
  shieldHitPointRegen: number,
  actionPoints: number,
  actionPointMax: number,
  experiencePoints: number,
}) => (
  <div>
    <p>
      {`HP: ${hitPoints}/${baseHitPointMax * hitPointMultiplier}`}
    </p>
    {hitPointRegen > 0 && (
      <p>
        {`HP Regen: ${hitPointRegen}`}
      </p>
    )}
    {baseShieldHitPointMax > 0 && (
      <p>
        {`Shield HP: ${shieldHitPoints}/${baseShieldHitPointMax * shieldHitPointMultiplier}`}
      </p>
    )}
    {shieldHitPointRegen > 0 && (
      <p>
        {`Shield HP Regen: ${shieldHitPointRegen}`}
      </p>
    )}
    <p>
      {`AP: ${actionPoints}/${actionPointMax}`}
    </p>
    <p>
      {`XP: ${experiencePoints}`}
    </p>
  </div>
);

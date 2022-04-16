import React, { Dispatch, SetStateAction } from 'react';
import { Character } from '../../types/types';
import { UpdateStatus } from './UpdateStatus';

export const CharacterStatus = ({
  id,
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
  update,
}: {
  id: string,
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
  update: Dispatch<SetStateAction<Character>>,
}) => (
  <div className="cmp-stack">
    <div className="util-display-flex">
      <p>
        {`HP: ${hitPoints}/${baseHitPointMax * hitPointMultiplier}`}
      </p>
      <UpdateStatus id={id} statName="hitPoints" value={hitPoints} maxValue={baseHitPointMax * hitPointMultiplier} update={update} />
    </div>
    {hitPointRegen > 0 && (
      <p>
        {`HP Regen: ${hitPointRegen}`}
      </p>
    )}
    {baseShieldHitPointMax > 0 && (
      <div className="util-display-flex">
        <p>
          {`Shield HP: ${shieldHitPoints}/${baseShieldHitPointMax * shieldHitPointMultiplier}`}
        </p>
        <UpdateStatus id={id} statName="shieldHitPoints" value={shieldHitPoints} maxValue={baseShieldHitPointMax * shieldHitPointMultiplier} update={update} />
      </div>
    )}
    {shieldHitPointRegen > 0 && (
      <p>
        {`Shield HP Regen: ${shieldHitPointRegen}`}
      </p>
    )}
    <div className="util-display-flex">
      <p>
        {`AP: ${actionPoints}/${actionPointMax}`}
      </p>
      <UpdateStatus id={id} statName="actionPoints" value={actionPoints} maxValue={actionPointMax} update={update} />
    </div>
    <div className="util-display-flex">
      <p>
        {`XP: ${experiencePoints}`}
      </p>
      <UpdateStatus id={id} statName="experiencePoints" value={experiencePoints} maxValue={Infinity} update={update} />
    </div>
  </div>
);

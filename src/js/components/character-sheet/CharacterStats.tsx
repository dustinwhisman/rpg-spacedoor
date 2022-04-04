import React from 'react';
import { Stat } from '../../types/types';
import { computedStat } from '../../characters/computed-stat';

export const CharacterStats = ({ stats }: { stats: Stat[] }) => (
  <table>
    <thead>
      <tr>
        <th scope="col">Stat</th>
        <th scope="col">Roll</th>
        <th scope="col">DC</th>
      </tr>
    </thead>
    <tbody>
      {stats.map(({
        name,
        die,
        bonus,
        dcBonus,
      }) => (
        <tr key={name}>
          <th scope="row">{name}</th>
          <td>
            {`${die}${bonus > 0 ? ` + ${bonus}` : ''}`}
          </td>
          <td>
            {computedStat(die, 2) + dcBonus}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

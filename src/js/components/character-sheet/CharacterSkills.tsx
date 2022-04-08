import React from 'react';
import { Skill, Stat } from '../../types/types';

const sortAlphabetically = (a: Skill, b: Skill) => {
  if (a.name < b.name) {
    return -1;
  }

  if (a.name > b.name) {
    return 1;
  }

  return 0;
};

export const CharacterSkills = ({ stats }: { stats: Stat[] }) => {
  const skills: Skill[] = [];
  stats.forEach((stat) => {
    stat.skills.forEach((skill) => {
      skills.push(skill);
    });
  });

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Skill</th>
          <th scope="col">Roll</th>
        </tr>
      </thead>
      <tbody>
        {skills
          .sort(sortAlphabetically)
          .map(({
            name, die, bonusDie, bonus,
          }) => (
            <tr key={name}>
              <th scope="row">{name}</th>
              <td>
                {`${die}${bonusDie ? ` + ${bonusDie}` : ''}${bonus > 0 ? ` + ${bonus}` : ''}`}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

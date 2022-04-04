import React from 'react';

export const CharacterTraits = ({
  vulnerabilities,
  resistances,
  immunities,
}: {
  vulnerabilities: string[],
  resistances: string[],
  immunities: string[],
}) => (
  <>
    <div>
      <p>Vulnerable to:</p>
      <ul>
        {vulnerabilities.map((vulnerability) => (
          <li key={vulnerability}>
            {vulnerability}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <p>Resistant to:</p>
      <ul>
        {resistances.map((resistance) => (
          <li key={resistance}>
            {resistance}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <p>Immune to:</p>
      <ul>
        {immunities.map((immunity) => (
          <li key={immunity}>
            {immunity}
          </li>
        ))}
      </ul>
    </div>
  </>
);

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
    {vulnerabilities.length > 0 && (
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
    )}
    {resistances.length > 0 && (
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
    )}
    {immunities.length > 0 && (
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
    )}
  </>
);

import React, { Dispatch, SetStateAction } from 'react';
import { statUpgrades } from '../../rules/upgrades';
import { Character } from '../../types/types';
import { UpgradeCard } from './UpgradeCard';

export const StatUpgrades = ({
  characterData,
  update,
}: {
  characterData: Character,
  update: Dispatch<SetStateAction<Character>>
}) => {
  const upgrades = statUpgrades();
  const statsWithUpgrades = upgrades
    .filter((upgradesForStat) => upgradesForStat.some(({ canPurchase, cost }) => (
      canPurchase?.(characterData) && characterData.experiencePoints >= cost
    )));

  if (!statsWithUpgrades.length) {
    return (
      <>
        <h3>
          Stat Upgrades
        </h3>
        <p>
          You don&apos;t qualify for any Stat Upgrades yet.
        </p>
      </>
    );
  }

  return (
    <details>
      <summary>
        Stat Upgrades
      </summary>
      <div className="cmp-stack">
        {statsWithUpgrades
          .map((upgradesForStat) => (
            <details key={upgradesForStat[0].stat}>
              <summary className="summary-deca">
                {`${upgradesForStat[0].stat} Upgrades`}
              </summary>
              <div className="cmp-upgrade-card__grid">
                {upgradesForStat
                  .filter(({ canPurchase, cost }) => (
                    canPurchase?.(characterData) && characterData.experiencePoints >= cost
                  ))
                  .map(({
                    name, description, cost, type, onPurchase,
                  }) => (
                    <UpgradeCard
                      key={name}
                      character={characterData}
                      name={name}
                      description={description}
                      cost={cost}
                      type={type}
                      onPurchase={onPurchase}
                      update={update}
                    />
                  ))}
              </div>
            </details>
          ))}
      </div>
    </details>
  );
};

/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Character } from '../../types/types';
import {
  healthUpgrades,
  damageUpgrades,
  damageTypeUpgrades,
  statusEffectUpgrades,
  shieldUpgrades,
  removeVulnerabilityUpgrades,
  resistanceUpgrades,
  immunityUpgrades,
  healingActions,
  statusEffectActions,
  bonusActions,
  bonusHealingActions,
  bonusStatusEffectActions,
  reactionUpgrades,
} from '../../rules/upgrades';
import { CharacterName } from './CharacterName';
import { CharacterStatus } from './CharacterStatus';
import { CharacterStats } from './CharacterStats';
import { SecondaryStats } from './SecondaryStats';
import { CharacterSkills } from './CharacterSkills';
import { CharacterTraits } from './CharacterTraits';
import { UpgradeCategory } from './UpgradeCategory';
import { DeleteCharacter } from './DeleteCharacter';
import { StatUpgrades } from './StatUpgrades';
import { SkillUpgrades } from './SkillUpgrades';

const CharacterSheet = ({ character }: { character: Character }) => {
  const [characterData, setCharacterData] = useState(character);

  return (
    <>
      <CharacterName name={characterData.name} />
      <CharacterStatus id={characterData._id} update={setCharacterData} {...characterData} />
      <CharacterStats stats={characterData.stats} />
      <SecondaryStats {...characterData} />
      <CharacterSkills stats={characterData.stats} />
      <CharacterTraits {...characterData} />

      <h2>
        Available Upgrades
      </h2>

      <StatUpgrades characterData={characterData} />
      <SkillUpgrades characterData={characterData} />

      <UpgradeCategory
        title="Health &amp; AP Upgrades"
        upgrades={healthUpgrades()}
        character={characterData}
      />
      <UpgradeCategory
        title="Damage Upgrades"
        upgrades={damageUpgrades()}
        character={characterData}
      />
      <UpgradeCategory
        title="Damage Type Upgrades"
        upgrades={damageTypeUpgrades()}
        character={characterData}
      />
      <UpgradeCategory
        title="Status Effect Upgrades"
        upgrades={statusEffectUpgrades()}
        character={characterData}
      />
      <UpgradeCategory
        title="Shield Upgrades"
        upgrades={shieldUpgrades()}
        character={characterData}
      />
      <UpgradeCategory
        title="Remove Vulnerability Upgrades"
        upgrades={removeVulnerabilityUpgrades()}
        character={characterData}
      />
      <UpgradeCategory
        title="Resistance Upgrades"
        upgrades={resistanceUpgrades()}
        character={characterData}
      />
      <UpgradeCategory
        title="Immunity Upgrades"
        upgrades={immunityUpgrades()}
        character={characterData}
      />
      <UpgradeCategory
        title="Healing Actions"
        upgrades={healingActions()}
        character={characterData}
      />
      <UpgradeCategory
        title="Status Effect Actions"
        upgrades={statusEffectActions()}
        character={characterData}
      />
      <UpgradeCategory
        title="Standard Bonus Actions"
        upgrades={bonusActions()}
        character={characterData}
      />
      <UpgradeCategory
        title="Healing Bonus Actions"
        upgrades={bonusHealingActions()}
        character={characterData}
      />
      <UpgradeCategory
        title="Status Effect Bonus Actions"
        upgrades={bonusStatusEffectActions()}
        character={characterData}
      />
      <UpgradeCategory
        title="Reactions"
        upgrades={reactionUpgrades()}
        character={characterData}
      />

      <DeleteCharacter character={characterData} />
    </>
  );
};

export const renderCharacterSheet = (character: Character) => {
  const element = document.querySelector('#character-sheet');

  if (element) {
    const root = createRoot(element);
    root.render(<CharacterSheet character={character} />);
  }
};

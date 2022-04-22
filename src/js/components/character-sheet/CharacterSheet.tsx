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
import { Actions } from './Actions';
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
      <Actions upgrades={characterData.upgrades} actionType="action" />
      <Actions upgrades={characterData.upgrades} actionType="bonus-action" />
      <Actions upgrades={characterData.upgrades} actionType="reaction" />

      <h2>
        Available Upgrades
      </h2>

      <StatUpgrades characterData={characterData} update={setCharacterData} />
      <SkillUpgrades characterData={characterData} update={setCharacterData} />

      <UpgradeCategory
        title="Health &amp; AP Upgrades"
        upgrades={healthUpgrades()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Damage Upgrades"
        upgrades={damageUpgrades()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Damage Type Upgrades"
        upgrades={damageTypeUpgrades()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Status Effect Upgrades"
        upgrades={statusEffectUpgrades()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Shield Upgrades"
        upgrades={shieldUpgrades()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Remove Vulnerability Upgrades"
        upgrades={removeVulnerabilityUpgrades()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Resistance Upgrades"
        upgrades={resistanceUpgrades()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Immunity Upgrades"
        upgrades={immunityUpgrades()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Healing Actions"
        upgrades={healingActions()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Status Effect Actions"
        upgrades={statusEffectActions()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Standard Bonus Actions"
        upgrades={bonusActions()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Healing Bonus Actions"
        upgrades={bonusHealingActions()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Status Effect Bonus Actions"
        upgrades={bonusStatusEffectActions()}
        character={characterData}
        update={setCharacterData}
      />
      <UpgradeCategory
        title="Reactions"
        upgrades={reactionUpgrades()}
        character={characterData}
        update={setCharacterData}
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

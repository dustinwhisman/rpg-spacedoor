import React, { Dispatch, SetStateAction } from 'react';
import { Character, Upgrade } from '../../types/types';

export const UpgradeCard = (
  {
    character,
    name,
    description,
    cost,
    type,
    onPurchase,
    update,
  }: {
    character: Character,
    name: string,
    description: string,
    cost: number,
    type: string | undefined,
    onPurchase: ((character: Character, upgrade: Upgrade) => Promise<Character | null>) | undefined,
    update: Dispatch<SetStateAction<Character>>
  },
) => {
  const onUpgrade = async () => {
    const updatedCharacter = await onPurchase?.(character, {
      name, description, cost, type,
    });

    if (updatedCharacter) {
      update(updatedCharacter);
    }
  };

  return (
    <article className={`cmp-upgrade-card cmp-upgrade-card--rank-${cost > 5 ? 6 : cost}`}>
      <p className="cmp-upgrade-card__name">
        {name}
      </p>
      <p className="cmp-upgrade-card__description">
        {description}
      </p>
      {onPurchase != null && (
        <div className="cmp-upgrade-card__button-block">
          <button
            type="button"
            onClick={onUpgrade}
          >
            Purchase
            <span className="util-visually-hidden">{name}</span>
          </button>
        </div>
      )}
      <p className="cmp-upgrade-card__cost">
        {`${cost} XP`}
      </p>
    </article>
  );
};

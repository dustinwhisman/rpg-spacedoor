import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { createRoot } from 'react-dom/client';
import { stats } from '../rules/stats';
import { fromDice } from '../rules/dice';
import { SortableItem } from './SortableItem';

const statValue = (name: string, index: number, type: 'primary' | 'secondary'): string | number => {
  if (type === 'primary') {
    return fromDice[fromDice.length - index - 1];
  }

  if (type === 'secondary') {
    const offensiveResults = ['d8', 'd6', 'd4'];
    const defensiveResults = [6, 4, 2];
    const healingResults = ['d8', 'd6', 'd4'];

    if (name === 'Offense') {
      return offensiveResults[index];
    }

    if (name === 'Defense') {
      return defensiveResults[index];
    }

    if (name === 'Healing') {
      return healingResults[index];
    }
  }

  return '';
};

const SortableList = ({ options, type }: { options: string[], type: 'primary' | 'secondary' }): JSX.Element => {
  const [items, setItems] = useState(options);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id != null && active.id !== over.id) {
      setItems((itemList) => {
        const oldIndex = itemList.indexOf(active.id);
        const newIndex = itemList.indexOf(over.id);

        return arrayMove(itemList, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div className="cmp-draggable-item__wrapper">
          {items.map((name, index) => (
            <SortableItem
              key={name}
              name={name}
              index={index}
              value={statValue(name, index, type)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export const renderPrimaryStatRanking = (): void => {
  const element = document.querySelector('#primary-stat-ranking');

  if (element) {
    const options = stats.map(({ name }) => name);

    const root = createRoot(element);
    root.render(<SortableList options={options} type="primary" />);
  }
};

export const renderSecondaryStatRanking = (): void => {
  const element = document.querySelector('#secondary-stat-ranking');

  if (element) {
    const options = [
      'Offense',
      'Defense',
      'Healing',
    ];

    const root = createRoot(element);
    root.render(<SortableList options={options} type="secondary" />);
  }
};

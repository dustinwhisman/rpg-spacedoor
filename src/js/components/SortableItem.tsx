/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = (
  { name, index, value }: { name: string, index: number, value: string | number },
) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        className="cmp-draggable-item"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {`${index + 1}: ${name}`}
      </div>
      <input type="hidden" name={name} value={value} data-stat />
    </>
  );
};

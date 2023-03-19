import React from 'react';
import NoteItem from './NoteItem';

export default function NoteList(props) {
  const { items, onDelete, onArchive } = props;

  return (
    <div className="note__list grid">
      {items.length > 0 ? (
        items.map((item) => (
          <NoteItem
            key={item.id}
            id={item.id}
            onDelete={onDelete}
            onArchive={onArchive}
            {...item}
          />
        ))
      ) : (
        <h2>catatan tidak tersedia</h2>
      )}
    </div>
  );
}

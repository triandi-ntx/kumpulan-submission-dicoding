import React from 'react';

export default function ArchiveButton(props) {
  const { id, onArchive, archived } = props;
  return (
    <button
      className="btn-archive"
      onClick={() => {
        onArchive(id);
      }}
    >
      {archived ? (
        <box-icon name="archive-out"></box-icon>
      ) : (
        <box-icon name="archive-in"></box-icon>
      )}
    </button>
  );
}

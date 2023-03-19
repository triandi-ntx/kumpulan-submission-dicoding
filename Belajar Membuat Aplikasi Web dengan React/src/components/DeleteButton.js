import React from 'react';

export default function DeleteButton(props) {
  const { id, onDelete } = props;
  return (
    <button
      onClick={() => {
        onDelete(id);
      }}
    >
      <box-icon name="x"></box-icon>
    </button>
  );
}

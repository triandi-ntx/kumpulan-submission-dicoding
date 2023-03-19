import React from 'react';

export default function NoteBody(props) {
  const { body } = props;
  return (
    <div className="note__body">
      <p className="note__body-description">{body}</p>
    </div>
  );
}

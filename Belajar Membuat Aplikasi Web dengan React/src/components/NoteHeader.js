import React from 'react';
import { showFormattedDate } from '../utils/data';

export default function NoteHeader(props) {
  const { title, createdAt } = props;
  return (
    <div>
      <h4 className="note__body-title">{title}</h4>
      <p className="note__body-date">
        Created At {showFormattedDate(createdAt)}{' '}
      </p>
    </div>
  );
}

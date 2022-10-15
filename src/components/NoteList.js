import React from 'react';
import PropTypes from 'prop-types';

import NoteItem from './NoteItem';

function NoteList({ notes }) {
  return (
    <section className="notes-list">
      {
        // eslint-disable-next-line react/prop-types
        notes.map((note) => (
          <NoteItem key={note.id} {...note} />
        ))
      }
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    archived: PropTypes.bool,
  })).isRequired,
};

export default NoteList;

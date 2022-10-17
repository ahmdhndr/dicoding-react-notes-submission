import React from 'react';
import { useNavigate } from 'react-router-dom';

import NoteInput from '../components/NoteInput';

import { addNote } from '../utils/network-data';

function AddPage() {
  const navigate = useNavigate();

  function onAddNoteHandler(note) {
    addNote(note);
    navigate('/');
  }

  return (
    <NoteInput addNote={onAddNoteHandler} />
  );
}

export default AddPage;

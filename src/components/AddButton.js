import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

function AddButton() {
  const navigate = useNavigate();

  function onAddHandler() {
    navigate('/notes/new');
  }

  return (
    <button type="button" className="action" title="Tambah" onClick={onAddHandler}>
      <FiPlus />
    </button>
  );
}

export default AddButton;

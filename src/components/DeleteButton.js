import React from 'react';
import PropTypes from 'prop-types';
import { BiTrash } from 'react-icons/bi';

function DeleteButton({ id, onDelete }) {
  return (
    <button type="button" className="action" title="Hapus" onClick={() => onDelete(id)}>
      <BiTrash />
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

DeleteButton.defaultProps = {
  id: '',
};

export default DeleteButton;

import React from 'react';
import PropTypes from 'prop-types';

function ToggleArchiveButton({
  id, title, onArchiveBtn, icon,
}) {
  return (
    <button type="button" className="action" title={title} onClick={() => onArchiveBtn(id)}>
      {icon}
    </button>
  );
}

ToggleArchiveButton.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  onArchiveBtn: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
};

ToggleArchiveButton.defaultProps = {
  id: '',
};

export default ToggleArchiveButton;

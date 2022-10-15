import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

function Navigation({ isLogin }) {
  function onHideMenuHandler() {
    const mainTag = document.getElementById('main');
    mainTag.classList.toggle('hide');
  }

  return (
    <header>
      <div className="menu" style={{ display: isLogin ? 'block' : 'none' }}>
        <FiMenu onClick={onHideMenuHandler} />
      </div>
      <h1>
        <Link to="/">Notes App</Link>
      </h1>
    </header>
  );
}

Navigation.propTypes = {
  isLogin: PropTypes.bool,
};

Navigation.defaultProps = {
  isLogin: false,
};

export default Navigation;

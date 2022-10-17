import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  FiMenu, FiLogOut, FiSun, FiMoon,
} from 'react-icons/fi';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

function Navigation({ isLogin, logout, name }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { locale, toggleLocale } = React.useContext(LocaleContext);
  function onHideMenuHandler() {
    const mainTag = document.getElementById('main');
    mainTag.classList.toggle('hide');
  }

  return (
    <header>
      <div className="menu" style={{ display: isLogin ? 'block' : 'none' }}>
        <FiMenu onClick={onHideMenuHandler} style={{ marginRight: '20px' }} />
      </div>
      <h1>
        <Link to="/">
          {locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}
        </Link>
      </h1>
      <button onClick={toggleLocale} className="toggle-locale" type="button">
        {locale === 'id' ? 'en' : 'id'}
      </button>
      <button onClick={toggleTheme} className="toggle-theme" type="button" title={locale === 'id' ? 'Ubah Tema' : 'Change Theme'}>
        {theme === 'light' ? <FiMoon /> : <FiSun />}
      </button>
      {isLogin && <button className="button-logout" type="button" onClick={logout}>{name} <FiLogOut /></button>}
    </header>
  );
}

Navigation.propTypes = {
  isLogin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
  name: PropTypes.string,
};

Navigation.defaultProps = {
  isLogin: null,
  name: null,
};

export default Navigation;

import React from 'react';
import PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';

import useInput from '../hooks/useInput';
import ThemeContext from '../contexts/ThemeContext';
import { changeLanguage } from '../utils';
import LocaleContext from '../contexts/LocaleContext';

function LoginForm({ login, loading }) {
  const { theme } = React.useContext(ThemeContext);
  const { locale } = React.useContext(LocaleContext);
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  const onLoginHandler = (evt) => {
    evt.preventDefault();

    login({ email, password });
  };

  return (
    <form onSubmit={onLoginHandler} className="input-login">
      <label htmlFor="email">Email
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </label>
      <label htmlFor="password">Password
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button type="submit">{loading ? <PulseLoader color={theme === 'light' ? '#FFFFFF' : '#121212'} /> : changeLanguage(locale, 'Masuk', 'Sign in')}</button>
    </form>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

LoginForm.defaultProps = {
  loading: false,
};

export default LoginForm;

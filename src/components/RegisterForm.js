import React from 'react';
import PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';

import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';
import { changeLanguage } from '../utils';

function RegisterForm({ register, loading }) {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [confirmPassword, handleConfirmPasswordChange] = useInput('');
  const { locale } = React.useContext(LocaleContext);

  const onRegisterHandler = (evt) => {
    evt.preventDefault();
    if (confirmPassword !== password) {
      alert('Password tidak sama');
      return;
    }

    register({ name, email, password });
  };

  return (
    <form onSubmit={onRegisterHandler} className="input-register">
      <label htmlFor="name">Name
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </label>
      <label htmlFor="email">Email
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </label>
      <label htmlFor="password">Password
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </label>
      <label htmlFor="confirmPassword">Confirm Password
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </label>
      <button type="submit">{loading ? <PulseLoader /> : changeLanguage(locale, 'Daftar', 'Register')}</button>
    </form>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

RegisterForm.defaultProps = {
  loading: false,
};

export default RegisterForm;

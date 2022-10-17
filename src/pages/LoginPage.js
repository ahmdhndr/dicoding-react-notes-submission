import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LoginForm from '../components/LoginForm';

import { login } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import { changeLanguage } from '../utils';

function LoginPage({ loginSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const { locale } = React.useContext(LocaleContext);

  async function onLogin({ email, password }) {
    setLoading(true);
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
      setLoading(false);
    }
    setLoading(false);
  }
  return (
    <section className="login-page">
      <h2>
        {locale === 'id' ? 'Masuk untuk mulai menggunakan aplikasi.' : 'Sign in to start using the app.'}
      </h2>
      <LoginForm login={onLogin} loading={loading} />
      <p>{changeLanguage(locale, 'Belum punya akun?', 'Don\'t have an account?')} <Link to="/register">{changeLanguage(locale, 'Daftar di sini', 'Register here')}</Link></p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;

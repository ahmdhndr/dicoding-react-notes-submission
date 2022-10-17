import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import LocaleContext from '../contexts/LocaleContext';
import { changeLanguage } from '../utils';
import { register } from '../utils/network-data';

function RegisterPage() {
  const [loading, setLoading] = React.useState(false);
  const { locale } = React.useContext(LocaleContext);
  const navigate = useNavigate();

  const onRegisterHandler = async (user) => {
    setLoading(true);
    const { error } = await register(user);

    if (!error) {
      setLoading(false);
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <section className="register-page">
      <h2>{changeLanguage(locale, 'Isi form untuk mendaftar.', 'Fill the form to register.')}</h2>
      <RegisterForm register={onRegisterHandler} loading={loading} />
      <p>{changeLanguage(locale, 'Sudah punyak akun?', 'Already have an account?')} <Link to="/">{changeLanguage(locale, 'Masuk di sini', 'Sign in here')}</Link></p>
    </section>
  );
}

export default RegisterPage;

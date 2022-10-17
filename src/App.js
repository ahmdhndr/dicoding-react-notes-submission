import React from 'react';
import {
  Link, Routes, Route, useLocation,
} from 'react-router-dom';
import { FiArchive, FiBook } from 'react-icons/fi';

import {
  HOME_PATH,
  ARCHIVES_PATH,
  DETAIL_NOTE_PATH,
  ADD_NOTE_PATH,
  NOT_FOUND_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  changeLanguage,
} from './utils';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/network-data';
import RegisterPage from './pages/RegisterPage';
import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';

const THEME = 'theme';
const LOCALE = 'locale';

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [theme, setTheme] = React.useState(() => localStorage.getItem(THEME) || 'light');
  const [locale, setLocale] = React.useState(() => localStorage.getItem(LOCALE) || 'id');
  const location = useLocation();

  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem(THEME, newTheme);
  };

  const toggleLocale = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    setLocale(newLocale);
    localStorage.setItem(LOCALE, newLocale);
  };

  const themeContextValue = React.useMemo(() => ({ theme, toggleTheme }), [theme]);
  const localeContextValue = React.useMemo(() => ({ locale, toggleLocale }));

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);

    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  if (initializing) {
    return null;
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="app-container" data-theme={theme}>
          <Navigation isLogin={authedUser} logout={onLogout} name={authedUser?.name} />
          {authedUser === null ? (
            <main id="main">
              <Routes>
                <Route path={LOGIN_PATH} element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path={REGISTER_PATH} element={<RegisterPage />} />
              </Routes>
            </main>
          ) : (
            <main id="main">
              <section className="sidenav-menu">
                <Link to="/" className={`sidenav-menu__item ${location.pathname === HOME_PATH && 'active'}`}>
                  <FiBook />
                  <p>{changeLanguage(locale, 'Catatan', 'Notes')}</p>
                </Link>
                <Link to="/archives" className={`sidenav-menu__item ${location.pathname === ARCHIVES_PATH && 'active'}`}>
                  <FiArchive />
                  <p>{changeLanguage(locale, 'Arsip', 'Archives')}</p>
                </Link>
              </section>
              <Routes>
                <Route path={HOME_PATH} element={<HomePage />} />
                <Route path={ARCHIVES_PATH} element={<ArchivePage />} />
                <Route path={DETAIL_NOTE_PATH} element={<DetailPage />} />
                <Route path={ADD_NOTE_PATH} element={<AddPage />} />
                <Route path={NOT_FOUND_PATH} element={<NotFoundPage />} />
              </Routes>
            </main>
          )}
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;

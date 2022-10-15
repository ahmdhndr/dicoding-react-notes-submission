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
} from './utils';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const authedArray = React.useState(false);
  const authedUser = authedArray[0];
  const location = useLocation();

  return (
    <div className="app-container">
      <Navigation isLogin={authedUser} />
      {!authedUser ? (
        <main id="main">
          <section>
            <Routes>
              <Route path={LOGIN_PATH} element={<p>Halaman Login</p>} />
              <Route path={REGISTER_PATH} element={<p>Halaman Login</p>} />
            </Routes>
          </section>
        </main>
      ) : (
        <main id="main">
          <section className="sidenav-menu">
            <Link to="/" className={`sidenav-menu__item ${location.pathname === HOME_PATH && 'active'}`}>
              <FiBook />
              <p>Catatan</p>
            </Link>
            <Link to="/archives" className={`sidenav-menu__item ${location.pathname === ARCHIVES_PATH && 'active'}`}>
              <FiArchive />
              <p>Arsip</p>
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
  );
}

export default App;

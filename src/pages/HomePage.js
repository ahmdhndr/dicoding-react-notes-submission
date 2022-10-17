import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiBook } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';

import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';

import { getActiveNotes } from '../utils/network-data';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';
import { changeLanguage } from '../utils';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [defaultKeyword, setDefaultKeyword] = React.useState(() => searchParams.get('keyword') || '');
  const { theme } = React.useContext(ThemeContext);
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    setLoading(true);

    const fetchNotesData = async () => {
      const { data } = await getActiveNotes();
      setNotes(data);
      setLoading(false);
    };

    fetchNotesData();

    return () => {
      setNotes();
      setLoading();
    };
  }, []);

  const onKeywordChangeHandler = (keyword) => {
    setDefaultKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes?.filter((note) => note.title.toLowerCase().includes(
    defaultKeyword.toLowerCase(),
  ));

  return (
    <section className="homepage">
      <h2>{changeLanguage(locale, 'Catatan Aktif', 'Note Actives')}</h2>
      <SearchBar keyword={defaultKeyword} keywordChange={onKeywordChangeHandler} />
      {loading ? (
        <p className="loader"><ClipLoader color={theme === 'light' ? '#121212' : '#FFFFFF'} className="loader-icon" /></p>
      ) : (
        !filteredNotes.length ? (
          <div className="notes-list-empty">
            <FiBook />
            <p>{changeLanguage(locale, 'Tidak ada catatan.', 'Empty notes.')}</p>
          </div>
        ) : (
          <NoteList notes={filteredNotes} />
        )
      )}
      <div className="homepage__action">
        <AddButton />
      </div>
    </section>
  );
}

export default HomePage;

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { BsArchive } from 'react-icons/bs';
import { ClipLoader } from 'react-spinners';

import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';

import { getArchivedNotes } from '../utils/network-data';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';
import { changeLanguage } from '../utils';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [defaultKeyword, setDefaultKeyword] = React.useState(() => searchParams.get('keyword') || '');
  const [loading, setLoading] = React.useState(false);
  const { theme } = React.useContext(ThemeContext);
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    setLoading(true);

    const fetchArchiveNotes = async () => {
      const { data } = await getArchivedNotes();
      setNotes(data);
      setLoading(false);
    };

    fetchArchiveNotes();

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
    <section className="archives-page">
      <h2>{changeLanguage(locale, 'Arsip Catatan', 'Note Archives')}</h2>
      <SearchBar keyword={defaultKeyword} keywordChange={onKeywordChangeHandler} />
      {loading ? (
        <p className="loader"><ClipLoader color={theme === 'light' ? '#121212' : '#FFFFFF'} className="loader-icon" /></p>
      ) : (
        !filteredNotes.length ? (
          <div className="notes-list-empty">
            <BsArchive />
            <p>{changeLanguage(locale, 'Tidak ada catatan.', 'Empty notes.')}</p>
          </div>
        ) : (
          <NoteList notes={filteredNotes} />
        )
      )}
    </section>
  );
}

export default ArchivePage;

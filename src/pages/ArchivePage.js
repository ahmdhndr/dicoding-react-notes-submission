import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { BsArchive } from 'react-icons/bs';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';

import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';

import { getArchivedNotes } from '../utils/local-data';

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');

  // eslint-disable-next-line no-shadow
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
      keyword: props.defaultKeyword || '',
    };

    autoBind(this);
  }

  onKeywordChangeHandler(keyword) {
    const { keywordChange } = this.props;
    this.setState(() => ({
      keyword,
    }));

    keywordChange(keyword);
  }

  render() {
    const { notes, keyword } = this.state;
    // eslint-disable-next-line arrow-body-style
    const filteredNotes = notes.filter((note) => {
      return note.title.toLowerCase().includes(
        keyword.toLowerCase(),
      );
    });

    return (
      <section className="archives-page">
        <h2>Arsip Catatan</h2>
        <SearchBar keyword={keyword} keywordChange={this.onKeywordChangeHandler} />
        {!filteredNotes.length ? (
          <div className="notes-list-empty">
            <BsArchive />
            <p>Tidak ada catatan.</p>
          </div>
        ) : (
          <NoteList notes={filteredNotes} />
        )}
      </section>
    );
  }
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

ArchivePage.defaultProps = {
  defaultKeyword: '',
};

export default ArchivePageWrapper;

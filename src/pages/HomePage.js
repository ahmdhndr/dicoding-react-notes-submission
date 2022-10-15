import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiBook } from 'react-icons/fi';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';

import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';

import { getActiveNotes } from '../utils/local-data';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');

  // eslint-disable-next-line no-shadow
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
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
      <section className="homepage">
        <h2>Catatan Aktif</h2>
        <SearchBar keyword={keyword} keywordChange={this.onKeywordChangeHandler} />
        {!filteredNotes.length ? (
          <div className="notes-list-empty">
            <FiBook />
            <p>Tidak ada catatan.</p>
          </div>
        ) : (
          <NoteList notes={filteredNotes} />
        )}
        <div className="homepage__action">
          <AddButton />
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

HomePage.defaultProps = {
  defaultKeyword: '',
};

export default HomePageWrapper;

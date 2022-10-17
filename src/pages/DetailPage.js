import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import autoBind from 'auto-bind';
import { ClipLoader } from 'react-spinners';

import NoteDetail from '../components/NoteDetail';
import DeleteButton from '../components/DeleteButton';
import NotFoundPage from './NotFoundPage';
import ToggleArchiveButton from '../components/ToggleArchiveButton';

import {
  archiveNote, deleteNote, getNote, unarchiveNote,
} from '../utils/network-data';

function DetailPageWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();

  function onArchiveHandler() {
    archiveNote(id);
    navigate('/');
  }

  function onUnarchiveHandler() {
    unarchiveNote(id);
    navigate('/');
  }

  function onDeleteHandler() {
    deleteNote(id);
    navigate('/');
  }

  return (
    <DetailPage
      onArchive={onArchiveHandler}
      onUnarchive={onUnarchiveHandler}
      onDelete={onDeleteHandler}
      id={id}
    />
  );
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      initializing: true,
    };

    autoBind(this);
  }

  async componentDidMount() {
    const { id } = this.props;
    const { data } = await getNote(id);

    this.setState(() => ({
      note: data,
      initializing: false,
    }));
  }

  render() {
    const { note, initializing } = this.state;
    const { onDelete, onArchive, onUnarchive } = this.props;

    if (initializing) {
      return (
        <section className="loader">
          <ClipLoader />
        </section>
      );
    }

    if (note === null) {
      return <NotFoundPage />;
    }

    return (
      <section className="detail-page">
        <NoteDetail {...note} />
        <div className="detail-page__action">
          {note?.archived ? (
            <ToggleArchiveButton title="Aktifkan" onArchiveBtn={onUnarchive} icon={<MdOutlineUnarchive />} />
          ) : (
            <ToggleArchiveButton title="Arsipkan" onArchiveBtn={onArchive} icon={<MdOutlineArchive />} />
          )}
          <DeleteButton onDelete={onDelete} />
        </div>
      </section>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DetailPageWrapper;

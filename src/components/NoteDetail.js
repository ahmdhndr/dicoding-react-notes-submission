import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';

import { showFormattedDate } from '../utils';

function NoteDetail({ title, createdAt, body }) {
  return (
    <>
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{parser(body)}</div>
    </>
  );
}

NoteDetail.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  body: PropTypes.string,
};

NoteDetail.defaultProps = {
  title: '',
  createdAt: '',
  body: '',
};

export default NoteDetail;

import React from 'react';
import { FiCheck } from 'react-icons/fi';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      maxChar: 50,
    };

    autoBind(this);
  }

  onTitleChangeEventHandler(evt) {
    const { maxChar } = this.state;
    if (maxChar >= 0 && evt.target.value.length <= 50) {
      this.setState(() => ({
        title: evt.target.value,
        maxChar: 50 - evt.target.value.length,
      }));
    }
  }

  onInputBodyHandler(evt) {
    this.setState(() => ({
      body: evt.target.innerHTML,
    }));
  }

  onAddEventHandler(evt) {
    evt.preventDefault();
    const { addNote } = this.props;
    addNote(this.state);
  }

  render() {
    const { title, body, maxChar } = this.state;
    return (
      <section className="add-new-page">
        <div className="add-new-page__input">
          <p className="add-new-page__input__title__limit">Sisa Karakter: {maxChar}</p>
          <input className="add-new-page__input__title" type="text" placeholder="Judul catatan" value={title} onChange={this.onTitleChangeEventHandler} />
          <div
            className="add-new-page__input__body"
            contentEditable
            data-placeholder="Isi catatan ..."
            onInput={this.onInputBodyHandler}
            defaultValue={body}
          />
          <div className="add-new-page__action">
            <button className="action" type="button" title="Simpan" onClick={this.onAddEventHandler}>
              <FiCheck />
            </button>
          </div>
        </div>
      </section>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;

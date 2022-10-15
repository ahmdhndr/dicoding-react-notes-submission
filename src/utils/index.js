const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  if (!date) {
    return null;
  }
  return new Date(date).toLocaleDateString('id-ID', options);
};

const HOME_PATH = '/';
const ARCHIVES_PATH = '/archives';
const DETAIL_NOTE_PATH = '/notes/:id';
const ADD_NOTE_PATH = '/notes/new';
const NOT_FOUND_PATH = '/*';
const LOGIN_PATH = '/*';
const REGISTER_PATH = '/register';

export {
  showFormattedDate,
  HOME_PATH,
  ARCHIVES_PATH,
  DETAIL_NOTE_PATH,
  ADD_NOTE_PATH,
  NOT_FOUND_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
};

import React from 'react';

function useInput(defaultValue) {
  const [value, setValue] = React.useState(defaultValue);
  const handleChangeValue = (evt) => setValue(evt.target.value);

  return [value, handleChangeValue];
}

export default useInput;

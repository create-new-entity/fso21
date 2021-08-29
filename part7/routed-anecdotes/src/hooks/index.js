import { useState } from 'react';

export const useField = (type, initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event) => {
    event ? setValue(event.target.value) : setValue('');
  }

  return {
    type,
    value,
    onChange
  }
};
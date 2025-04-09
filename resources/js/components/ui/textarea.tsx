import React, { useState } from 'react';

function TextareaComponent() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <textarea
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Type Project Description Here..."
    />
  );
}

export default TextareaComponent;
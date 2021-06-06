import React from 'react';

const Search = ({ srchStr, handleSrchStrChange }) => {
  return (
    <>
      <p>filter shown with <input value={srchStr} onChange={handleSrchStrChange}/></p>
    </>
  );
};

export default Search;
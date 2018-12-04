import React from 'react';

const SearchBar = ({searchInput, inputChangeHandler}) => {
  return (
    <div>
      <form className="form-inline">
        <input 
          type="text" 
          className="form-control"
          placeholder="Search"
          onChange={e => inputChangeHandler(e.target.value)} 
          value={searchInput} 
        />
      </form>
    </div>
  );
};

export default SearchBar;
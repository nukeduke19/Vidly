import React from "react";
const SearchBox = ({ value, onChange }) => {
  return (
    <input
      name="query"
      type="text"
      value={value}
      placeholder="Search..."
      className="form-control my-3"
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;

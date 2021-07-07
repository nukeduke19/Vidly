import React from "react";
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-1">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input id={name} name={name} {...rest} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

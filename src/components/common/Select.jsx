import React from "react";
const Input = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="mb-1">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select id={name} name={name} {...rest} className="form-control">
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

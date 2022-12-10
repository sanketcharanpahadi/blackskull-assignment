import React from "react";

const FormField = ({ label, name, value, type, onChangeHandler }) => {
  return (
    <div className="value">
      <label htmlFor="email" className="block mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        required
        className="border-gray-600 block w-full border-[1px] px-2 py-1"
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default FormField;

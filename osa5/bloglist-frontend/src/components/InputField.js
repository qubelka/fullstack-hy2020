import React from "react";

const InputField = ({value, type='text', name, onChange, placeholder}) =>
  <div>
    <input
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder} />
  </div>

export default InputField
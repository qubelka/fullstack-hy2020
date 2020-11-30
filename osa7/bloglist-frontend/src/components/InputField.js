import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ id, value, type='text', name, onChange, placeholder, children }) =>
  <div>
    <label htmlFor={id}>{children}</label>&nbsp;
    <input
      id={id}
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder} />
  </div>

InputField.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
}

export default InputField
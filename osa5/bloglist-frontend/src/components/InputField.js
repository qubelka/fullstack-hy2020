import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ value, type='text', name, onChange, placeholder }) =>
  <div>
    <input
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder} />
  </div>

InputField.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
}

export default InputField
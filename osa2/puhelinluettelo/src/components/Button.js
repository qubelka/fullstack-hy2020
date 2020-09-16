import React from "react";

const Button = ({type='submit', handleClick, children}) =>
    <button type={type} onClick={handleClick}>{children}</button>

export default Button
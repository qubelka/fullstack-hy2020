import React from "react";

const InputField = ({id, value, type='text', onChange, children}) => {
    return (
        <div>
            <label htmlFor={id}>{children}</label>&nbsp;
            <input id={id} value={value} type={type} onChange={onChange} />
        </div>
    )
}

export default InputField
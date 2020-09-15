import React from "react";
import InputField from "./InputField";

const Filter = ({filter, handleChange, setFilter}) =>
    <InputField id='filter' value={filter} onChange={handleChange(setFilter)}>
        filter by name:
    </InputField>

export default Filter
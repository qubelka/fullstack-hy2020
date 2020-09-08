import React from "react";

const Filter = ({handleChange, setFilter}) =>
        <div>
            <label htmlFor="filter">filter by name: </label>
            <input id="filter" type="text" onChange={handleChange(setFilter)}/>
        </div>

export default Filter
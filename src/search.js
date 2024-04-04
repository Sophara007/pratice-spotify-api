import React, {useState} from "react";

export function SearchMusic() {
const [search, setSearch] = useState('');
    function eventHandler(e) {
setSearch(e.target.value);
    }
    return (
        <input type="text" value={search} onChange={eventHandler} placeholder="Search...."></input>
    );
};


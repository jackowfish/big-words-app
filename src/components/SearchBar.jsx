import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import Button from './Button'
import {Link} from "react-router-dom"
import {BiSearchAlt2} from 'react-icons/bi';

//currently not in use, needs to be implemented
const SearchBar = () => {
    return(
        <div className="field">
            <div className="control has-icons-left">
                <input className="input" type="searchs" placeholder="Search For Books..."/>
                <span className="icon is-small is-left">
                    <i><BiSearchAlt2 size={20}/></i>
                </span>
            </div>
        </div>
    )
}

export default SearchBar;
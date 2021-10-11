import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import '../styles/Nav_Bar.css'
import { FaHome, FaSearch } from 'react-icons/fa';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { AiFillBook } from 'react-icons/ai';
import { RiAccountCircleFill } from 'react-icons/ri';

const NavBar = () => {

  return (
    <div className="topnav">
        <a className="row">
            <FaHome size={23}/>
            Home
        </a>
        <a className="row">
            <BsFillChatLeftTextFill size={21}/>
            My Words
        </a>
        <a className="row">
            <AiFillBook size={20}/>
            My Library
        </a>
        <a className="row">
            <FaSearch size={21}/>
            Search
        </a>
        <a className="row">
            <RiAccountCircleFill size={23}/>
            My Account
        </a>
    </div>
    )
}

export default NavBar;
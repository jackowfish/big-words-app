import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import '../styles/Nav_Bar.css'
import { FaHome, FaSearch } from 'react-icons/fa';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { AiFillBook } from 'react-icons/ai';
import { RiAccountCircleFill } from 'react-icons/ri';
import {Link, useLocation} from "react-router-dom"

const NavBar = (props) => {

  return (
    <div className="topnav">
        <div className="column">
            <Link id="HomepageLink" to="homepage">
                <FaHome size={23} color={props.current == "homepage" ? "black" : ""}/> <br/>
                Home
            </Link>
        </div>
        <div className="column">
            <Link id="MyWordsLink" to="mywords">
                <BsFillChatLeftTextFill size={21} color={props.current == "mywords" ? "black" : ""}/> <br/>
                My Words
            </Link>
        </div>
        <div className="column">
            <Link id="MyLibraryLink" to="mylibrary">
                <AiFillBook size={20} color={props.current == "mylibrary" ? "black" : ""}/> <br/>
                My Library
            </Link>
        </div>
        <div className="column">
            <Link id="SearchLink" to="search">
                <FaSearch size={21} color={props.current == "search" ? "black" : ""}/> <br/>
                Search
            </Link>
        </div>
        <div className="column">
            <Link id="MyAccountLink" to="myaccount">
                <RiAccountCircleFill size={23} color={props.current == "myaccount" ? "black" : ""}/> <br/>
                My Account
            </Link>
        </div>
    </div>
    )
}

export default NavBar;
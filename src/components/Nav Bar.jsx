import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import '../styles/Nav_Bar.css'
import { FaHome, FaSearch, FaBookMedical } from 'react-icons/fa';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { AiFillBook } from 'react-icons/ai';
import { RiAccountCircleFill } from 'react-icons/ri';
import {Link} from "react-router-dom"
import { getDatabase, ref, onValue, set } from "firebase/database";
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'

const NavBar = (props) => {

    const cookies = new Cookies();
    const history = useHistory();
    const db = getDatabase();

    if(cookies.get('BigWordsUser') == undefined) {
        history.push('/');
        window.location.reload(false);
    }

    const [isAdmin, setIsAdmin] = useState("");
    const [sizeDiff, setSizeDiff] = useState(0);
    const [adminClass, setAdminClass] = useState("column");

    // This is to check if a window is mobile or not
    const [width, setWidth] = useState(window.innerWidth);
    let isMobile = (width <= 500);
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
        if(isMobile) {
            setSizeDiff(5);
            setAdminClass("column admin");
        }
    }
    // Check to make sure user is an admin
    let user_type = 'user';

    try {
        user_type = ref(db, 'Users/' + cookies.get('BigWordsUser').user.uid + "/Type");
    } catch(error) {
        user_type = 'user';
    }
    
    onValue(user_type, (snapshot) => {
        if(isAdmin == false) {
            //console.log(snapshot.val());
        }
        if (isAdmin == false && snapshot.val() != null && snapshot.val().toLowerCase() == "admin") {
            setIsAdmin(true);
            if(isMobile) {
                setSizeDiff(5);
                setAdminClass("column admin");
            }
        }
    });

  return (
    <div className="topnav">
        <div className={adminClass}>
            <Link id="HomepageLink" to="homepage">
                <FaHome size={23 - sizeDiff} color={props.current == "homepage" ? "black" : ""}/> <br/>
                Home
            </Link>
        </div>
        <div className={adminClass}>
            <Link id="MyWordsLink" to="mywords">
                <BsFillChatLeftTextFill size={21 - sizeDiff} color={props.current == "mywords" ? "black" : ""}/> <br/>
                My Words
            </Link>
        </div>
        <div className={adminClass}>
            <Link id="MyLibraryLink" to="mylibrary">
                <AiFillBook size={20 - sizeDiff} color={props.current == "mylibrary" ? "black" : ""}/> <br/>
                My Library
            </Link>
        </div>
        <div className={adminClass}>
            <Link id="SearchLink" to="search">
                <FaSearch size={21 - sizeDiff} color={props.current == "search" ? "black" : ""}/> <br/>
                Search
            </Link>
        </div>
        <div className={adminClass}>
            <Link id="MyAccountLink" to="myaccount">
                <RiAccountCircleFill size={23 - sizeDiff} color={props.current == "myaccount" ? "black" : ""}/> <br/>
                Account
            </Link>
        </div>
        {isAdmin && 
            <div className={adminClass}>
                <Link id="AdminLink" to="admin">
                    <FaBookMedical size={23 - sizeDiff} color={props.current == "admin" ? "black" : ""}/> <br/>
                    Add Book
                </Link>
            </div>
        }
    </div>
    )
}

export default NavBar;
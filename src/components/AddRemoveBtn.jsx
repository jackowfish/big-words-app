import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getDatabase, ref, onValue, set } from "firebase/database";
import {BsChevronRight} from 'react-icons/bs'
import {HashRouter as Router, Switch, Route, Link, useParams, useRouteMatch} from "react-router-dom"

//Accessed from LogSelect
//Allows users to Add/Remove listers/readers from their current book log
class AddRemoveBtn extends React.Component {
    constructor(props){
        super();
        this.state = {
            id: props.id,
            clicked: false,
            userData: ""
        };
    }

    //
    onTriggerAdd = (id) => {
        this.state.userData = {id:id, willBe:"added"}
        this.props.logCallback(this.state.userData)
        this.state.clicked = !this.state.clicked
        this.forceUpdate();
    }

    //
    onTriggerRemove = (id) => {
        this.state.userData = {id:id, willBe:"removed"}
        this.props.logCallback(this.state.userData)
        this.state.clicked = !this.state.clicked
        this.forceUpdate();

    }

    render(){
        const addBtn = <button className="button is-small is-white" id={this.state.id} onClick={() => this.onTriggerAdd(this.state.id)}>Add</button>
        const removeBtn = <button className="button is-small is-danger" id={this.state.id} onClick={() => this.onTriggerRemove(this.state.id)}>Remove</button>
        return (<div>
            {(!this.state.clicked ? addBtn : removeBtn)}
        </div>)
    }
}

export default AddRemoveBtn
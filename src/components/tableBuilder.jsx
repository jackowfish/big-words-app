import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getDatabase, ref, onValue, set } from "firebase/database";
import {BsChevronRight} from 'react-icons/bs'
import {HashRouter as Router, Switch, Route, Link, useParams, useRouteMatch} from "react-router-dom"
import { BiUser } from 'react-icons/bi';
import { createPortal } from 'react-dom';


class TableBuilder extends React.Component {
    constructor(props){
        super();
        this.db = getDatabase();
        this.cookies = new Cookies();
        this.state = {
            componentArray: [],
            user: props.data.user,
            from: props.data.from,
            type: props.name,
            userData: [],
        };
    }

    componentDidMount() {
        this.render_data();
    }

    render_data(){
        const db= getDatabase();
        const components_array = [];
        const component_list = ref(db, this.state.user)

        onValue(component_list, (snapshot) => {
            const componentListData = snapshot.val();
            for(const currentData in componentListData){
                
                const dataFirst = ref(db, this.state.user + currentData + "/First Name")
                var dataFirstName = "";
                const dataLast = ref(db, this.state.user + currentData + '/Last Name/')
                var dataLastName="";

                onValue(dataFirst, (snapshot) => {
                    dataFirstName = snapshot.val();
                })
                onValue(dataLast, (snapshot) => {
                    dataLastName = snapshot.val();
                })
                
                        components_array.push(
                            {
                                id: currentData,
                                first: dataFirstName,
                                last: dataLastName
                            }
                        )
                    
            }
            this.setState(this.state.componentArray = components_array)
        });
    }

    onTrigger = (id) => {
        this.state.userData.push(id)
        this.props.parentCallback(this.state.userData)

        let clicked = document.getElementById(id)
        clicked.style.backgroundColor = "#FF932F"
    }

    onTriggerRemove = (id) => {
        this.setState({userData: this.state.userData.filter(test = (user)=>{
            return user !== id
        })})
        this.props.parentCallback(this.state.userData)
    }

    toggleButton = (id) => {
        var click = false

        if(click == false){
            click = true;
            return(<button className="button is-small" id={id}onClick={() => this.onTrigger(id)}>Add</button>)
        } else{
            return(<button className="button is-small" id={id}onClick={() => this.onTriggerRemove(id)}>Remove</button>)
        }  

    }

    render(){
        if(this.state.from == "account"){
            return(
                <tbody>
                   { this.state.componentArray.map((user) => {
                        return(
                        <tr key={user.id}>
                        <td>Name</td>
                        <td> {user.first} {user.last}</td>
                        <td><Link to={{
                            pathname:`/edit`,
                            search: `?sort=${user.id}`,
                            data:{
                                id:`${this.state.user + user.id}`,
                                type: `${this.state.type}`
                            }
                            }}> <BsChevronRight size={20}/></Link></td>
                        </tr>
                        )
                    })}
                </tbody>
            )
        }
        if(this.state.from =="logbook"){
            return(
                this.state.componentArray.map((user) => {
                    return(
                        <section className="modal-card-body" key={user.id}>
                            <div>
                                <h1>{user.first} {user.last}</h1>
                                <button className="button is-small" id={user.id}onClick={() => this.onTrigger(user.id)}>Add</button>
                                
                            </div>
                        </section>
                    )
                })
            )
        }
    }
}

export default TableBuilder
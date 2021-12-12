import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getDatabase, ref, onValue, set } from "firebase/database";
import {BsChevronRight} from 'react-icons/bs'
import {HashRouter as Router, Switch, Route, Link, useParams, useRouteMatch} from "react-router-dom"
import { BiUser } from 'react-icons/bi';
import { createPortal } from 'react-dom';
import AddRemoveBtn from './AddRemoveBtn';

//Accessed from LogBook
//Displays Listener/Reader information for users, 
//Passes selected listern/reader data between LogBook and AddRemoveBtn
class LogSelect extends React.Component {
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

    //Retrieving User's Reader/Listener Information from the database
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


    //Callback from AddRemoveBtn
    //When the add button is clicked, the listener/reader id will be pushed to userData and passed to LogBook
    //When the remove button is clicked, the listener/reader id will be removed from userData and passed to LogBook
    handleCallback = (childData) => {
        if(childData.willBe == "added"){
            this.state.userData.push(childData.id)
            this.props.parentCallback(this.state.userData)
        } else {
            this.state.userData = this.state.userData.filter(user => user != childData.id)
            this.props.parentCallback(this.state.userData)
        }
    }


    render(){
            return(
                this.state.componentArray.map((user) => {
                    return(
                        <section className="modal-card-body" key={user.id}>
                            <div>
                                <h1>{user.first} {user.last}</h1>
                                <AddRemoveBtn
                                logCallback={this.handleCallback}
                                id={user.id}
                                />                            
                            </div>
                        </section>
                    )
                })
            )
        
    }
}

export default LogSelect
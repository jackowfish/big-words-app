import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getDatabase, ref, onValue, set } from "firebase/database";
import {BsChevronRight} from 'react-icons/bs'
import {HashRouter as Router, Switch, Route, Link, useParams, useRouteMatch} from "react-router-dom"
import { BiUser } from 'react-icons/bi';
import { createPortal } from 'react-dom';

//Accessed from MyAccount
//This component is used to create a table of caregivers/readers/listeners based on the current user
class TableBuilder extends React.Component {
    constructor(props){
        super();
        this.db = getDatabase();
        this.cookies = new Cookies();
        this.state = {
            componentArray: [],
            name: props.name,
            user: props.data.user,
            from: props.data.from,
            type: props.name,
            loaded: false
        };
    }

    componentDidMount() {
        this.render_data();
    }
    
    render_data(){
        const db= getDatabase();
        const components_array = [];

        //retrieve caregiver information
        if(this.state.name == "Caretaker"){
            var dataId = this.cookies.get('BigWordsUser').user.uid 
            const dataFirst = ref(db, 'Users/' + dataId +  "/First Name")
            var dataFirstName = "";
            
            const dataLast = ref(db, 'Users/'+ dataId + '/Last Name/')
            var dataLastName="";

            onValue(dataFirst, (snapshot) => {
                dataFirstName = snapshot.val();
            })
            onValue(dataLast, (snapshot) => {
                dataLastName = snapshot.val();
            })
                
            components_array.push({
                id: dataId,
                first: dataFirstName,
                last: dataLastName
            })
            this.setState(this.state.componentArray = components_array)
                

        }
        //retrieve reader/listener information
        else{const component_list = ref(db, this.state.user)

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
            
            //only contains unique components
            const uniqueComponents = components_array.filter((ele, idx) => idx == components_array.findIndex( elem => elem.id == ele.id))
            this.setState(this.state.componentArray = uniqueComponents)
        });}
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
                        
                        {/* generates dynamic page link to EditPage */}
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
    }
}

export default TableBuilder
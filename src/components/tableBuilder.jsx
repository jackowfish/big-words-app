import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { getDatabase, ref, onValue, set } from "firebase/database";
import {BsChevronRight} from 'react-icons/bs'
import {HashRouter as Router, Switch, Route, Link, useParams, useRouteMatch} from "react-router-dom"


const TableBuilder = (props) => {
    const db = getDatabase();
    const dataList = ref(db, props.data);
    const objectArray = [];

    onValue(dataList, (snapshot) => {
        const dataListData = snapshot.val();
       
        for(const currentChild in dataListData){
            const checkDataStatus = ref(db, props.data + `${currentChild}`);
            const childFirst = ref(db,props.data + `${currentChild}`+"/First Name")
            var childFirstName="";
            const childLast = ref(db,props.data + `${currentChild}`+"/Last Name/" )
            var childLastName=""
            
            onValue(childFirst, (snapshot) => {
                childFirstName = snapshot.val();
            })
            onValue(childLast, (snapshot) => {
                childLastName = snapshot.val();
            })
            onValue(checkDataStatus, (snapshot) => {
                if(snapshot.val() !=null){
                    
                    objectArray.push(
                        { id: currentChild,
                            first: childFirstName,
                            last: childLastName,

                        }
                    )
                }
            })
        }

    })

   return(<tbody>
               {objectArray.map((user) => {
                //    console.log(test)
                   return(
                       <tr key={user.id}>
                           <td>Name</td>
                           <td>{user.first} {user.last}</td>
                           <td> <Link to={{pathname:`/edit`, 
                           search:`?sort=${user.id}`,
                                        data:{
                                            id: `${props.data + user.id}`,
                                            type: `${props.name}`
                                          
                                        }
                                        }}> <BsChevronRight size={20}/> </Link></td>
                       </tr>
                   )
               })}
        </tbody>
   )
}
export default TableBuilder;
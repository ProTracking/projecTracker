// @flow 
import * as React from 'react';
import { ListOfTodo } from '../../components/ListOfTodo';
import Nav from "../../components/Nav"

export const Dashboard = () => {
    return (
        <div style={{width: "100%"}}>
            <Nav />
            <ListOfTodo />
            
        </div>
    );
};
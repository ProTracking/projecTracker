// @flow 
import * as React from 'react';
import { SignOut } from '../../components/SignOut';
import { ListOfTodo } from '../../components/ListOfTodo';

export const Dashboard = () => {
    return (
        <div>
            < SignOut  />
            <ListOfTodo />
            
        </div>
    );
};
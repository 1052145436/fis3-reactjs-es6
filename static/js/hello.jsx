import React from 'react';
import ReactDOM from 'react-dom';

export default class Hello extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        function formatName(user){
            return user.firstName + ' ' + user.lastName+'!';
        }

        const user = {
            firstName:'Harper',
            lastName:'Perez'
        };

        const element = (
            <h1>Hello,{formatName(user)}</h1>
        );

        return element;
    }
}
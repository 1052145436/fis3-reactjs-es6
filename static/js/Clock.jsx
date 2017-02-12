import React from 'react';
import ReactDOM from 'react-dom';

export default class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date:new Date()
        }
    }

    componentDidMount(){
        this.timeID = setInterval(
            ()=>this.setState({date:new Date()}),
            1000
        )
    }

    componentWillUnmount(){
        clearInterval(this.timeID);
    }

    render(){
        return (
            <div>
                <h1>Hello,world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}
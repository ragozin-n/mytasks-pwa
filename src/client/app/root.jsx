import React, {Component} from 'react';

import Login from "./login";
import DashBoard from "./dashboard";

export default class RootComponent extends Component {
    render() {
        if(localStorage.token) {
            if(localStorage.token == localStorage.user.length+1) {
                return (<DashBoard/>)
            }
        }
        return (<Login/>);
    }
}
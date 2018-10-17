import React,{ Component } from 'react';
import {Route} from 'mirrorx';

import component from './child/router';

export default class App extends Component{
    render(){
        return (
            <div className="route-content">
                <Route path="/" component={component}/>
            </div>
        )
    }
}
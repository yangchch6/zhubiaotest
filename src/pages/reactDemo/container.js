import React,{Component} from 'react';
import HelloMessage from './components/HelloMessage';
import Timer from './components/Timer';

export default class DemoContainer extends Component{
    render(){
        return(
            <div>
                <HelloMessage name="Taylor"/>
                <Timer />
            </div>
        )
    }
}
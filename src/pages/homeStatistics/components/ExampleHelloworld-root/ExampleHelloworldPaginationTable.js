import React, { Component } from 'react'
import PaginationTable from 'components/PaginationTable'
import { actions } from 'mirrorx';
import { Button,Message,Modal, Loading } from 'tinper-bee';
import Select from 'bee-select';
import moment from "moment/moment";
import Header from 'components/Header';
import ExampleHelloworldForm from '../ExampleHelloworld-form';
import ReactEcharts from 'echarts-for-react';
import './index.less'
export default class ExampleHelloworldPaginationTable extends Component {
    constructor(props){
        super(props);
        let self=this;
        this.state = {
            data:[],
            date:[]
        }
    }
    
    async componentDidMount(){
        await actions.ExampleHelloworld.loadDayTodoList();//未完成表格数量
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.todoList != this.props.todoList){
            this.setState({
                data:nextProps.todoList
            })
        }
    }

    cellClick(type){
        switch(type){
            case 'day':
                actions.ExampleHelloworld.loadDayTodoList();
                this.setState({
                    date:['2018/8/18','2018/8/19','2018/8/20','2018/8/21','2018/8/22','2018/8/23','2018/8/24','2018/8/25']
                })
                break;
            case 'mon':
                actions.ExampleHelloworld.loadMonthTodoList();
                this.setState({
                    date:['2018-08','2018-09','2018-10']
                })
                break;
            default:
                break;
        }
    }

    getOption = () => {
        let { data,date } = this.state; 
        return {
            title : {
                text: '未完成表格数量统计',
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['未完成表格数量']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : date
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel : {
                        formatter: '{value} 个'
                    }
                }
            ],
            series : [
                {
                    name:'未完成表格数量',
                    type:'line',
                    data: data,
                }
            ]
        }
    }

    render(){
        const self=this;
        let {  } = this.props;
        let {  } = this.state;
        return (
            <div className='ExampleHelloworld-root'>
                <Header title='首页'/>
                <ExampleHelloworldForm { ...this.props }/>
                <div className='table-header mt25'>
                    <Button colors="primary" style={{"marginLeft":15}} size='sm' onClick={() => { self.cellClick('day') }}>
                    日
                    </Button>
                    <Button colors="primary" style={{"marginLeft":15}} size='sm' onClick={() => { self.cellClick('mon') }}>
                    月
                    </Button>
                </div>
                <div className="detail-echarts">
                    <ReactEcharts
                        option={this.getOption()}
                        style={{height: '300px', width: '100%'}}
                        className='echarts-for-react' 
                    />
                </div>
            </div>

        )

    }
}
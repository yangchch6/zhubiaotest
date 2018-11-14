import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";

import Header from 'components/Header';
import ExampleHelloworldTable from '../ExampleHelloworld-table';
import ExampleHelloworldForm from '../ExampleHelloworld-form';

import './index.less';

/**
 * ExampleHelloworldRoot Component
 */
class ExampleHelloworldRoot  extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    /**
     *
     */
    componentWillMount() {
        this.getTableData();
    }
    /**
     * 获取table表格数据
     */
    getTableData = () => {
        actions.ExampleHelloworld.loadList();
    }

    render() {
        let { pageSize, pageIndex, totalPages} = this.props;
        return (
            <div className='ExampleHelloworld-root'>
                <Header title='example_helloworld' back={true}/>
                <ExampleHelloworldForm { ...this.props }/>
                <ExampleHelloworldTable { ...this.props }/>
            </div>
        )
    }
}
export default ExampleHelloworldRoot;
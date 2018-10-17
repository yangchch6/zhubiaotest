import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Table,Button } from 'tinper-bee';
import Header from 'components/Header';
import moment from "moment/moment";

import './index.less'

// sampleTable 组件定义
class SampleTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            column : [
                {
                    title: "序号",
                    dataIndex: "index",
                    key: "index",
                    width: 80,
                    render(record, text, index) {
                        return index + 1;
                    }
                },
                    {
                        title: "订单类型",
                        dataIndex: "orderType",
                        key: "orderType",
                        width: 100,
                    },
                    {
                        title: "请购部门",
                        dataIndex: "orderDeptName",
                        key: "orderDeptName",
                        width: 100,
                    },
                    {
                        title: "订单编号",
                        dataIndex: "orderNo",
                        key: "orderNo",
                        width: 100,
                    },
                    {
                        title: "审核人",
                        dataIndex: "deptCheckBy",
                        key: "deptCheckBy",
                        width: 100,
                    },
                    {
                        title: "商品数量",
                        dataIndex: "orderGoodsCount",
                        key: "orderGoodsCount",
                        width: 100,
                    },
                    {
                        title: "请购人员",
                        dataIndex: "orderBy",
                        key: "orderBy",
                        width: 100,
                    },
                    {
                        title: "商品名称",
                        dataIndex: "orderGoods",
                        key: "orderGoods",
                        width: 100,
                    },
                    {
                        title: "备注信息",
                        dataIndex: "remark",
                        key: "remark",
                        width: 100,
                    },
                    {
                        title: "审核人",
                        dataIndex: "deptCheckByName",
                        key: "deptCheckByName",
                        width: 100,
                    },
                    {
                        title: "请购单位",
                        dataIndex: "orderDept",
                        key: "orderDept",
                        width: 100,
                    },
                    {
                        title: "订单金额",
                        dataIndex: "orderAmount",
                        key: "orderAmount",
                        width: 100,
                    },
                    {
                        title: "请购人员",
                        dataIndex: "orderByName",
                        key: "orderByName",
                        width: 100,
                    },
                    {
                        title: "请购时间",
                        dataIndex: "orderDate",
                        key: "orderDate",
                        width: 100,
                    },
                    {
                        title: "订单名称",
                        dataIndex: "orderName",
                        key: "orderName",
                        width: 100,
                    }
            ]
        }
    }
    componentDidMount(){
        actions.DemoTable.loadList();//table数据
    }
    /**
     * 编辑,详情，增加
     */
    cellClick = async(record, editFlag) => {
        actions.routing.push(
            {
                pathname: 'DemoOrder-edit',
                detailObj: record,
                editFlag: !!editFlag
            }
        )
    }
    delItem = (record, index) => {
        actions.DemoOrder.delItem({
            param: [{ id: record.id,ts: record.ts }],
            index: index
        });
    }
    /**
     *
     */
    render(){
        const self = this;
        const {column} = this.state;
        const { list,showLoading,pageSize, pageIndex, totalPages, } = this.props;
        console.log("list",list)
        return (
            <div className="table-list">
                <Header title='简单表格'/>
                <Table
                    loading={{show:showLoading,loadingType:"line"}}
                    rowKey={(r,i)=>i}
                    columns={column}
                    data={list}
                />
            </div>
        )
    }
}

export default SampleTable;
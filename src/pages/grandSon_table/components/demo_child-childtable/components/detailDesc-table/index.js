import React, { Component } from 'react';
import { actions ,connect } from "mirrorx";
import queryString from 'query-string';
import PaginationTable from 'components/PaginationTable';
import options from "components/RefOption";
import NoData from 'components/NoData';
import RefWithInput from 'yyuap-ref/dist2/refWithInput';
import Form from 'bee-form';
import { 
    InputNumber, InputGroup,FormControl, 
    Loading, 
    Table, 
    Button, 
    Row,Col, 
    Icon, 
    Checkbox, Modal, 
    Panel, PanelGroup, 
    Label, 
    Message, 
    Radio,
    Pagination,
    FormGroup,
} from "tinper-bee";

import './index.less';
const FormItem = Form.FormItem;

class DetailDescTable extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            selectData:[],
            editFlag:true,
            isEmpty:true,
        };
        let {btnFlag} = this.props;
        this.editFlag = btnFlag ? btnFlag<2 : true;
        
        this.column = [
            {
                title: "code",
                dataIndex: "code",
                key: "code",
                width: 150,
                render: (text, record, index) => this.renderColumns(text, record, index, "code",this.editFlag)
            }]
        
        this.adjustColumn();
    }

    // 查看状态下删除操作列
    adjustColumn = () => {
        let self = this;
        if(!self.editFlag) {
            this.column.pop();
        }
    }

    // 普通编辑框渲染
    renderColumns = (text, record,index, column,editFlag) =>{
        return (
            <this.EditableCell
                editable={editFlag}
                value={text}
                onChange={value => this.handleChange(value, index, column)}
            />
        );
    }

    // 生成单元格表单
    EditableCell = ({editable,value,onChange}) =>(
        <div>
            {editable
                ? <FormControl value={value} onChange={value => onChange(value)} />
                : value
            }
        </div>
    )

    handleChange = (value, index, column)=>{
        const newData = [...this.props.grandSonData];
        const target = newData.filter((item,newDataIndex) => index === newDataIndex)[0];
        console.log("newData,target:",newData,target)
        // debugger
        if (target) {
            target[column] = value;
            actions.demo_table.updateState({
                list: newData
            });
        }
    }

    handleFormChange = (field,index) => value => {
        const newData = [...this.props.list];
        const target = newData.filter((item,newDataIndex) => index === newDataIndex)[0];
        console.log("更新前的newData,target:",newData,target)
        if(target){
            target[field] = value;
            actions.demo_table.updateState({
                list: newData
            });
        }
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        const { list, btnFlag } = this.props;
        console.log("孙表list:",list);
        return (
            <div className="grandSon-table">
                <Row className='table-list'>
                    {
                        list.map((item,index) => {
                            return (
                                <Col md={3} key={index}>
                                    <Panel header="详情描述" style={{ marginTop: 40 }}>
                                        <FormItem>
                                            <Label>code</Label>
                                            <FormControl 
                                                disabled={btnFlag == 2||false} 
                                                value={item.code}
                                                onChange={this.handleFormChange("code",index)}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Label>desc</Label>
                                            <FormControl 
                                                disabled={btnFlag == 2||false} 
                                                value={item.desc}
                                                onChange={this.handleFormChange("desc",index)}
                                            />
                                        </FormItem>
                                    </Panel>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        );
    }
}

export default Form.createForm()(DetailDescTable);
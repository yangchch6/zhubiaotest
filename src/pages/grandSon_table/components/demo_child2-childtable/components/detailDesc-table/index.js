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
            isEmpty:true
        };
    }

    handleFormChange = (field,index) => value => {
        const newData = [...this.props.list];
        const target = newData.filter((item,newDataIndex) => index === newDataIndex)[0];
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
                                    <Panel  style={{ marginTop: 40 }}>
                                        <FormItem>
                                            <Label>详情描述：</Label> 
                                            <FormControl 
                                                disabled={btnFlag == 2||false} 
                                                value={item.desc || ''}
                                                onChange={this.handleFormChange("desc",index)}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <Label>code：</Label>
                                            <FormControl 
                                                disabled={btnFlag == 2||false} 
                                                value={item.code || ''}
                                                onChange={this.handleFormChange("code",index)}
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
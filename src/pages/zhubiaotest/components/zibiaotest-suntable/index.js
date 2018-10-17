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
    FormGroup
} from "tinper-bee";

class SunTable extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            selectData:[],
            sunTable_data:[]
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
            }
        ]
        
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

    EditableCell = ({editable,value,onChange}) =>(
        <div>
            {editable
                ? <FormControl value={value} onChange={value => onChange(value)} />
                : value
            }
        </div>
    )

    render() {
        return (
          <div>
            <Table
                bordered
                style={{ marginTop: 40 }}
                columns={this.column}
                emptyText={() => <NoData />}
                data={this.props.data}
                rowKey={r => r.id}
                title={currentData => <div>标题: 我是孙表</div>}
            />
          </div>
        );
      }
}

export default Form.createForm()(SunTable);
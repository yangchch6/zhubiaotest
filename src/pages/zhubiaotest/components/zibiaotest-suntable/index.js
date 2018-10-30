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
            editFlag:true,
            isEmpty:true
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
        const newData = [...this.props.data];
        const target = newData.filter((item,newDataIndex) => index === newDataIndex)[0];
        // debugger
        if (target) {
            target[column] = value;
            actions.zhubiaotest.updateState({
                list: newData
            });
        }
    }

    // 孙表删除
    // onChildDel = async (record, index)=>{
    //     console.log("行删除",record,index);
    //     let grandSonList = this.deepClone("data"),
    //         id = record['id'],
    //         uuid = record['uuid'],
    //         delArray = [];
        
    //     let grandSonLen = grandSonList.length;

    //     if(id) {
    //         let tempIndex = 0;
    //         for(let i=0;i<grandSonLen;i++) {
    //             let item = Object.assign([],grandSonList[i]);
    //             console.log(item)
    //             let temp = item.id;
    //             if(temp && temp==id){
    //                 tempIndex = i;
    //             }
    //         }
    //         let delItem = grandSonList[tempIndex];
    //         let delItemId = delItem.id;
    //         if(delItemId){
    //             delArray.push(Object.assign({},grandSonList[tempIndex],{dr:1}));
    //         }
    //         console.log("tempIndex,delItem,delArray:",tempIndex,delItem,delArray)
    //         grandSonList.splice(tempIndex,1);
    //         console.log("delArray",delArray);
    //     }

    //     console.log("this.props.grandSonList",this.props.data);
    //     console.log("删除后",grandSonList)
        
    //     await actions.zhubiaotest.updateState({
    //         grandSonData:grandSonList,
    //     })
    //     this.props.updateData(grandSonList);
    // }

    // deepClone = (param)=>{
    //     let array = [];
    //     this.props[param].map(item=>{
    //         let temp = Object.assign({},item);
    //         array.push(item);
    //     })
    //     return array;
    // }

    // 增加空行(在表格中编辑)
    // onAddEmptyRowTable = ()=>{
    //     let tempArray = [...this.props.data],
    //         uuid = setTimeout(function(){},1),
    //         emptyRow = {
    //             code:'',
    //             key:uuid,
    //         };
    //         emptyRow['uuid'] = uuid;

    //     console.log("====增加前：====",tempArray)

    //     tempArray.push(emptyRow);

    //     console.log("====增加后：====",tempArray)
    //     actions.zhubiaotest.updateState({grandSonData:tempArray})
    //     this.props.updateData(tempArray);//更新孙表显示数据
    // }

    render() {
        return (
            <div className="grandSon-table">
                <Row className='table-list'>
                    <Col md={12}>
                        <Table
                            bordered
                            style={{ marginTop: 40 }}
                            columns={this.column}
                            data={this.props.data}
                            rowKey={r => r.id}
                            title={currentData => <div>标题: 我是孙表</div>}
                        />
                    </Col>
                </Row>
            </div>
        );
      }
}

export default Form.createForm()(SunTable);
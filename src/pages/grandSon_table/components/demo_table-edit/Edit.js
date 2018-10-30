import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import queryString from 'query-string';
import { Switch, InputNumber,Loading, Tabs, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Radio } from "tinper-bee";
import Header from "components/Header";
import options from "components/RefOption";
import DatePicker from 'bee-datepicker';
import Form from 'bee-form';
import Select from 'bee-select';
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import moment from "moment";
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './edit.less';
import 'ac-upload/build/ac-upload.css';
import ChildTabledemo_child from '../demo_child-childtable';
import Child1Tabledemo_child from '../demo_child1-childtable';
import Child2Tabledemo_child from '../demo_child2-childtable';
import Child3Tabledemo_child from '../demo_child3-childtable';
import { setCookie, getCookie} from "utils";

const FormItem = Form.FormItem;
const Option = Select.Option;
const format = "YYYY-MM-DD HH:mm:ss";
const {TabPane} = Tabs;

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: {},
            fileNameData: props.rowData.attachment || [],//上传附件数据,
            btnFlag: 2
        }
    }
    async componentWillMount() {
        await actions.demo_table.getOrderTypes();
        let searchObj = queryString.parse(this.props.location.search);
        let { btnFlag } = searchObj;
        if (btnFlag && btnFlag > 0) {
            let { search_id } = searchObj;
            let tempRowData = await actions.demo_table.queryDetail({ search_id });
            let rowData = this.handleRefShow(tempRowData) || {};

            console.log('rowData',rowData);
            this.setState({
                rowData:rowData,
                btnFlag: Number(btnFlag)
            })
        }

    }

    //每个子表在保存操作前调用该方法
    beforeSave = (childListdemo_child,cacheArraydemo_child,delArraydemo_child,grandSonData) => {
        // 编辑保存但是未修改参照,修改参照字段为参照id数组
        if(childListdemo_child) {
            childListdemo_child.map((item,index)=>{
                        // 判断参照值是否有改动
                        let uuid = item.uuid,
                            refArray = [
                            ],
                            tempRefIdName =  [
                            ],
                            target = cacheArraydemo_child.filter(item=>item.uuid==uuid)[0];
                // 处理单行多个参照
                        for (let i=0,len=refArray.length; i<len; i++) {
                            let tempRef = item[refArray[i]+uuid],
                                tempShowName = item[tempRefIdName[i]];

                            if(tempRef) {

                                // 参照有改动
                                item[refArray[i]] = tempRef;
                            } else if(tempShowName) {

                                // 参照无改动
                                item[refArray[i]] = target[refArray[i]];
                            }
                        }
                        //判断孙表是否有改动
                        item['subList'] = grandSonData[index]
            })
        }
        console.log('save childList',childListdemo_child)
        console.log('save delArray',delArraydemo_child);
        // 添加删除的数组，删除的数组中dr项的值都为1
        let resultArray = childListdemo_child.concat(delArraydemo_child);
        return {resultArray}
    }

    save = () => {//保存
        this.props.form.validateFields(async (err, values) => {
            values.attachment = this.state.fileNameData;
            let numArray = [
            ];
            for(let i=0,len=numArray.length; i<len; i++ ) {
                values[numArray[i]] = Number(values[numArray[i]]);
            }


            if (err) {
                Message.create({ content: '数据填写错误', color: 'danger' });
            } else {
                let {rowData,
                } = this.state;
                if (rowData && rowData.id) {
                    values.id = rowData.id;
                    values.ts = rowData.ts;
                }
                    let {childListdemo_child1,cacheArraydemo_child1,delArraydemo_child1,
                        cacheArraydemo_child2,delArraydemo_child2,childListdemo_child2,
                        cacheArraydemo_child3,delArraydemo_child3,childListdemo_child3,
                        grandSonData,grandSonData2,grandSonData3} = this.props;
                    //子表1：
                    let { 
                        resultArray:resultArray1
                    } = this.beforeSave(childListdemo_child1,cacheArraydemo_child1,delArraydemo_child1)

                    //子表2
                    let { 
                        resultArray:resultArray2 
                    } = this.beforeSave(childListdemo_child2,cacheArraydemo_child2,delArraydemo_child2,grandSonData2)

                    //合成提交数据
                    let commitData = {
                        entity : values,
                        sublist:{
                                demo_childList1:resultArray1,
                                demo_childList2:resultArray2
                        }
                    };
                    console.log("save values", JSON.stringify(commitData));

                await actions.demo_table.save(
                    commitData,
                );
                // 置空缓存数据和删除数组
                await actions.demo_table.updateState({
                        //子表1
                        cacheArraydemo_child:[],
                        delArraydemo_child:[],
                        childListzibiaotest:[],
                        //子表2
                        cacheArrayzibiaotest2:[],
                        delArrayzibiaotest2:[],
                        childListzibiaotest2:[],
                        //孙表
                        grandSonData:[],
                        grandSonData2:[]
                })
            }
        });
    }

    //跳转至编辑页面
    goEdit = () => {
        let searchObj = queryString.parse(this.props.location.search);
        let { search_id } = searchObj;
        actions.routing.replace(
            {
                pathname: 'demo_table-edit',
                search:`?search_id=${search_id}&btnFlag=1`
            }
        )
        this.setState({ btnFlag : 1 })
    }

    // 处理参照回显
    handleRefShow = (tempRowData) => {
        let rowData = {};
        if(tempRowData){

            let {
            } = tempRowData;

            this.setState({
            })
            rowData = Object.assign({},tempRowData,
                {
                }
            )
        }
        return rowData;
    }

    onBack = async() => {
            await actions.demo_table.updateState({
                    childListdemo_child: [],
                    cacheArrademo_child:[],
                    delArraydemo_child:[],
                    //子表1
                    childListdemo_child1: [],
                    cacheArrademo_child1:[],
                    delArraydemo_child1:[],
                    //子表2
                    childListdemo_child2: [],
                    cacheArrademo_child2:[],
                    delArraydemo_child2:[],
                    //子表3
                    childListdemo_child3: [],
                    cacheArrademo_child3:[],
                    delArraydemo_child3:[],
            })
        window.history.go(-1);
    }

    // 动态显示标题
    onChangeHead = (btnFlag) => {
        let titleArr = ["新增","编辑","详情"];
        return titleArr[btnFlag]||'新增';
    }


    arryDeepClone = (array)=>{
        let result = [];
        if(array){
            array.map((item)=>{
                let temp = Object.assign([],item);
                result.push(temp);
            })
        }
    }

    // 通过search_id查询数据

    render() {
        const self = this;

        let { appType, id, processDefinitionId, processInstanceId } = queryString.parse(this.props.location.search);
        // btnFlag = Number(btnFlag);
        let {rowData,
            btnFlag
        } = this.state;

        let {
            cacheArraydemo_child,
            delArraydemo_child,
            childListdemo_child,
            //子表1
            cacheArraydemo_child1,
            delArraydemo_child1,
            childListdemo_child1,
            //子表2
            cacheArraydemo_child2,
            delArraydemo_child2,
            childListdemo_child2,
            //子表3
            cacheArraydemo_child3,
            delArraydemo_child3,
            childListdemo_child3,
            grandSonData,
            grandSonData2,
            grandSonData3
        } = this.props;

        let childObj = {
            cacheArraydemo_child,
            delArraydemo_child,
            childListdemo_child,
            //子表1
            cacheArraydemo_child1,
            delArraydemo_child1,
            childListdemo_child1,
            //子表2
            cacheArraydemo_child2,
            delArraydemo_child2,
            childListdemo_child2,
            //子表3
            cacheArraydemo_child3,
            delArraydemo_child3,
            childListdemo_child3,
            grandSonData,
            grandSonData2,
            grandSonData3
        }

        let title = this.onChangeHead(btnFlag);
        let { code,name, } = rowData;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className='demo_table-detail'>
                <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={this.props.showLoading}
                />
                <Header title={title} back={true} backFn={this.onBack}>
                    {(btnFlag < 2) ? (
                        <div className='head-btn'>
                            <Button className='head-cancel' onClick={this.onBack}>取消</Button>
                            <Button className='head-save' onClick={this.save}>保存</Button>
                        </div>
                    ) : ''}
                    {(btnFlag == 2) ? (
                        <div className='head-btn'>
                            <Button colors="primary" onClick={this.goEdit}>编辑</Button>
                        </div>
                    ) : ''}
                </Header>
                <Row>
                    <Col md={12}>
                        <Tabs
                            defaultActiveKey="1"
                            tabBarStyle="upborder"
                            className="demo1-tabs"
                        >
                            <TabPane tab='基础数据' key="1">
                                <Child1Tabledemo_child btnFlag={btnFlag} {...childObj}/>
                            </TabPane>
                            <TabPane tab='保洁' key="2">
                                <Child2Tabledemo_child btnFlag={btnFlag} {...childObj}/>
                            </TabPane>
                            <TabPane tab='设施' key="3">
                                <Child3Tabledemo_child btnFlag={btnFlag} {...childObj}/>
                            </TabPane>
                            <TabPane tab='水质' key="4">
                                {/* <Child2Tabledemo_child btnFlag={btnFlag} {...childObj}/> */}
                            </TabPane>
                            <TabPane tab='绿化' key="5">
                                {/* <Child2Tabledemo_child btnFlag={btnFlag} {...childObj}/> */}
                            </TabPane>
                            <TabPane tab='违法违章' key="6">
                                {/* <Child2Tabledemo_child btnFlag={btnFlag} {...childObj}/> */}
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(Edit);

import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import queryString from 'query-string';
import { Switch, InputNumber,Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Radio } from "tinper-bee";
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
import ChildTablezibiaotest from '../zibiaotest-childtable';
import ChildTablezibiaotestSecond from '../zibiaotest-childtable-second';
import { setCookie, getCookie} from "utils";

const FormItem = Form.FormItem;
const Option = Select.Option;
const format = "YYYY-MM-DD HH:mm:ss";

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: {},
            fileNameData: props.rowData.attachment || [],//上传附件数据
        }
    }
    async componentWillMount() {
        await actions.zhubiaotest.getOrderTypes();
        let searchObj = queryString.parse(this.props.location.search);
        let { btnFlag } = searchObj;
        if (btnFlag && btnFlag > 0) {
            let { search_id } = searchObj;
            let tempRowData = await actions.zhubiaotest.queryDetail({ search_id });
            let rowData = this.handleRefShow(tempRowData) || {};

            console.log('rowData',rowData);
            this.setState({
                rowData:rowData,
            })
        }

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
                    let {childListzibiaotest,cacheArrayzibiaotest,delArrayzibiaotest,
                        childListzibiaotest01,cacheArrayzibiaotest01,delArrayzibiaotest01} = this.props;
                    // 编辑保存但是未修改参照,修改参照字段为参照id数组
                    if(childListzibiaotest) {
                        childListzibiaotest.map((item,index)=>{
                                    // 判断参照值是否有改动
                                    let uuid = item.uuid,
                                        refArray = [
                                        ],
                                        tempRefIdName =  [
                                        ],
                                        target = cacheArrayzibiaotest.filter(item=>item.uuid==uuid)[0];
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


                        })
                    }
                    console.log('save childList',childListzibiaotest)
                    console.log('save delArray',delArrayzibiaotest);
                    // 添加删除的数组，删除的数组中dr项的值都为1
                    let resultArray = childListzibiaotest.concat(delArrayzibiaotest);
                    let resultArray01 = childListzibiaotest01.concat(delArrayzibiaotest01);

                    let commitData = {
                        entity : values,
                        sublist:{
                                zibiaotestList:resultArray,
                                zibiaotest01List:resultArray01
                        }
                    };
                    console.log("save values", JSON.stringify(commitData));


                await actions.zhubiaotest.save(
                    commitData,
                );
                // 置空缓存数据和删除数组
                await actions.zhubiaotest.updateState({
                        cacheArrayzibiaotest:[],
                        delArrayzibiaotest:[],
                        childListzibiaotest:[],
                        cacheArrayzibiaotest01:[],
                        delArrayzibiaotest01:[],
                        childListzibiaotest01:[]
                })
            }
        });
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
            await actions.zhubiaotest.updateState({
                childListzibiaotest: [],
                cacheArrayzibiaotest:[],
                delArrayzibiaotest:[],
                childListzibiaotest01: [],
                cacheArrayzibiaotest01:[],
                delArrayzibiaotest01:[],
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

        let { btnFlag,appType, id, processDefinitionId, processInstanceId } = queryString.parse(this.props.location.search);
        btnFlag = Number(btnFlag);
        let {rowData,
        } = this.state;

        let {
                cacheArrayzibiaotest,
                delArrayzibiaotest,
                childListzibiaotest,
                cacheArrayzibiaotest01,
                delArrayzibiaotest01,
                childListzibiaotest01
                
        } = this.props;

        let childObj = {
                cacheArrayzibiaotest,
                delArrayzibiaotest,
                childListzibiaotest,
        }

        let childObj2 = {
            cacheArrayzibiaotest01,
            delArrayzibiaotest01,
            childListzibiaotest01
        }

        let title = this.onChangeHead(btnFlag);
        let { code,name, } = rowData;
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className='zhubiaotest-detail'>
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
                </Header>
                <Row className='detail-body'>

                            <Col md={4} xs={6}>
                                <Label>
                                    code：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('code', {
                                            validateTrigger: 'onBlur',
                                            initialValue: code || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入code',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('code')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    name：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('name', {
                                            validateTrigger: 'onBlur',
                                            initialValue: name || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入name',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('name')}
                                </span>
                            </Col>
                </Row>

                        <div className="master-tag">
                            <div className="childhead">
                                <span className="workbreakdown" >子表1</span>
                            </div>
                        </div>
                        <ChildTablezibiaotest btnFlag={btnFlag} {...childObj}/>
                        {/* <div className="master-tag">
                            <div className="childhead">
                                <span className="workbreakdown" >子表2</span>
                            </div>
                        </div>
                        <ChildTablezibiaotestSecond btnFlag={btnFlag} {...childObj2}/> */}

            </div>
        )
    }
}

export default Form.createForm()(Edit);

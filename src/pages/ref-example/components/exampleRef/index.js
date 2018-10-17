import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Label,FormControl,Icon,InputGroup } from 'tinper-bee';
import Form from 'bee-form';
import Header from 'components/Header';
import createModal from 'yyuap-ref';
import './index.less';

const FormItem = Form.FormItem;


/**
 * ExampleRef Component
 * 参照示例
 */
class ExampleRef  extends Component {
    constructor(props) { 
        super(props);
        this.state = {

        }
    }

    onRefClick = (name)=>{
        // 弹出参照
        return ()=>{
            let option = {
                title: '可供货品类',
                refType:2,//1:树形 2.单表 3.树卡型 4.多选 5.default
                isRadio:false,//1.true 单选 2.false多选
                hasPage:true,
                tabData:[//tab标签
                    {"title":"常用","key":"commonUse"},
                    {"title":"全部","key":"total"},
                    {"title":"推荐","key":"recommed"}
                ],// option中可增加defaultActiveKey作为默认tab标签
                param:{//url请求参数
                    refCode:'newuser',
                    tenantId:'',
                    sysId:'',
                },
                refModelUrl:{
                    TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
                    TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                },
                checkedArray:[],
                onCancel: function (p) {//点击取消的回调
                    console.log(p)
                },
                onSave: function (sels) {//点击确定的回调
                    console.log(selfs);
                    let { setFieldsValue } = this.props.form;
                    setFieldsValue({
                        name:selfs
                    });
                },
            }
            createModal(option);
        }
    }
    
    render() {
        const self=this;
        const { getFieldProps, getFieldError} = this.props.form;
        return (
            <div className='example-ref'>
                <Header title='参照示例'/>
                <div className='file-src'>文件位置：src/pages/ref-example</div>
                <div className='edit-panel'>
                    <FormItem>
                        <Label  className='time'>可供货品类：</Label>
                        <InputGroup simple>
                            <FormControl className="supplier-input-adjust"
                                {
                                    ...getFieldProps('supplycategory', {
                                        initialValue: "螺丝钉",
                                        validateTrigger: 'onBlur',
                                        rules: [{ required: true, message: '请选择可供货品类!' }],
                                    })
                                }
                            />
                            <InputGroup.Button shape="border"  onClick={this.onRefClick("supplycategory")}>
                                <span className="uf uf-navmenu" > </span>
                            </InputGroup.Button>
                        </InputGroup>
                        <span className='error'>
                            {getFieldError('supplycategory')}
                        </span>
                    </FormItem>
                </div>
            </div>
        )
    }
}
export default Form.createForm()(ExampleRef);
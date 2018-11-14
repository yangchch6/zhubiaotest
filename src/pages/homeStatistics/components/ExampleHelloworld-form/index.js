import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Switch, InputNumber, Col, Row,FormControl, Label, Select, Radio } from "tinper-bee";
import Form from 'bee-form';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import SearchPanel from 'components/SearchPanel';
const FormItem = Form.FormItem;
import options from "components/RefOption";
const { RangePicker } = DatePicker;
import zhCN from "rc-calendar/lib/locale/zh_CN";
import moment from "moment";
import 'moment/locale/zh-cn';
import './index.less'

class ExampleHelloworldForm extends Component {
    constructor(props){
        super(props)
        let self = this;
        this.state = {
            company:'',
            class:'',
            selectDate: '',
            open:false
        }
    }
    componentWillMount(){
        // 获得example_helloworld列表数据
        actions.ExampleHelloworld.getOrderTypes();
    }
    /** 查询数据
     * @param {*} error 校验是否成功
     * @param {*} values 表单数据
     */
    search = (error,values) => {
        this.props.form.validateFields(async (err, values) => {
            let {
                
            } = this.state;
            await actions.ExampleHelloworld.loadList(values);
        });
    }
    /**
     * 重置
     */
    reset = () => {
        this.setState({
            company:'',
            class:'',
            selectDate:'',
        })
    }

    /**
     * 选择日期
     */
    onDateChange = (d, dataString) => {
        // console.log(dataString);
    };

    onDateSelect(d) {
        console.log("选择日期：", d.format('YYYY-MM-DD'));
        this.setState({
            selectDate:d.format('YYYY-MM-DD'),
            open: false
        })
    }

    //设置不可选择的日期
    disabledDate(current) {
        return current && current.valueOf() >= Date.now();
    }

    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        let { orderTypes } = this.props;
        let self = this;
        let {
        } = this.state;
        return (
            <SearchPanel
                    className='ExampleHelloworld-form'
                    searchOpen={true}
                    title="查询"
                    form={this.props.form}
                    reset={this.reset}
                    search={this.search}>
                <Row>
                    <Col md={4} xs={6}>
                        <Select
                            {
                                ...getFieldProps('company', {
                                    initialValue: 'gy',
                                })
                            }
                        >
                            <Option value="gy">管养公司</Option>
                            <Option value="bridge">桥隧公司</Option>
                            <Option value="qc">庆春公司</Option>
                            <Option value="zz">紫之公司</Option>
                        </Select>
                    </Col>
                    <Col md={4} xs={6}>
                        <Select
                            {
                                ...getFieldProps('class', {
                                    initialValue: 'aaa',
                                })
                            }
                        >
                            <Option value="aaa">机房巡查</Option>
                            <Option value="bbb">船闸运行</Option>
                            <Option value="ccc">水闸运行</Option>
                        </Select>
                    </Col>
                    <Col md={4} xs={6}>
                        <DatePicker
                            open={this.state.open}
                            format={"YYYY-MM-DD"}
                            locale={zhCN}
                            onSelect={this.onDateSelect.bind(this)}
                            onChange={this.onDateChange}
                            disabledDate={this.disabledDate}
                            placeholder={"选择截止日期"}
                            {
                                ...getFieldProps('selectDate', {
                                    initialValue: moment(),
                                })
                            }
                        />
                    </Col>     
                </Row>
            </SearchPanel>
        )
    }
}

export default Form.createForm()(ExampleHelloworldForm)
import React, { Component } from 'react';
import { Button, Row, Col, Label, FormControl, Checkbox, Select, Radio } from 'tinper-bee';
import { actions } from 'mirrorx';
import Header from "components/Header";
import Form from 'bee-form';
import SearchPanel from "components/SearchPanel";
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
const { RangePicker } = DatePicker;
import moment from "moment/moment";
import './index.less';
const FormItem = Form.FormItem;

class FormValidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voucherDate0: [],
            voucherDate1: [],
            voucherDate2: [],
            voucherDate3: []
        }
    }
    search = (number) => {
        this.props.form.validateFields(['orderCode'+number,'supplierName'+number,'voucherDate'+number],(error,values)=>{
            console.log('********');
            console.log(values);
        })
    }
    reset = (number) => {
        this.props.form.resetFields(['orderCode'+number,'supplierName'+number,'voucherDate'+number]);
        this.setState({
            voucherDate: []
        })
    }

    render() {
        // api 参考 /src/components/SearchPanel
        const self=this;
        const { getFieldProps, getFieldError } = this.props.form;
        const orderTypes= [{
            "code":"D001",
            "name":"D001"
          },{
            "code":"D002",
            "name":"D002"
          },{
            "code":"D003",
            "name":"D003"
          },{
            "code":"D004",
            "name":"D004"
          }];
        return (
            <div className = 'bee-form-example'>
                <Header title = 'form表单示例' />
                <div className='file-src'>文件位置：src/pages/demoForm</div>
                    {/* 三列布局 */}
                    <Row className = 'edit-panel'>
                        <Col md={4} sm={6} xs={12}>
                            <FormItem>
                                <Label>订单编号：
                                    <span className='mast'>*</span>
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('orderCode0', {
                                        initialValue: '',
                                        rules: [{
                                            required: true, message: '请输入订单编号',
                                        }],
                                    })
                                    }
                                />
                                <span className='error'>
                                    {
                                        getFieldError('orderCode0')
                                    }
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={4} sm={6} xs={12}>
                            <FormItem>
                                <Label>供应商名称：
                                    <span className='mast'>*</span>
                                </Label>
                                <FormControl
                                    {
                                        ...getFieldProps('supplierName0', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请输入供应商名称',
                                            }],
                                        })
                                    }
                                />
                                <span className='error'>
                                    {
                                        getFieldError('supplierName0')
                                    }
                                </span>
                            </FormItem>
                            
                        </Col>
                        <Col md={4} sm={6} xs={12}>
                            <FormItem>
                                <Label className='time'>凭证日期：</Label>
                                <RangePicker
                                    defaultValue={this.state.voucherDate}
                                    placeholder={'开始 ~ 结束'}
                                    dateInputPlaceholder={['开始', '结束']}
                                    {
                                    ...getFieldProps('voucherDate0', {
                                        onChange: function (v) {
                                            self.setState({
                                                voucherDate0: v
                                            })
                                        }
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={12}>
                            <div className = 'btn-group'>
                                <Button size='sm' className = 'reset-btn' onClick={()=>{this.reset(0)}}>
                                        重置
                                </Button>
                                <Button size='sm' className = 'submit-btn' onClick={()=>{this.search(0)}}>
                                        提交
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <div className='split'></div>

                    {/* 二列布局 */}
                    <Row className = 'edit-panel'>
                        <Col sm={6} xs={12}>
                            <FormItem>
                                <Label>订单编号：
                                    <span className='mast'>*</span>
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('orderCode1', {
                                        initialValue: '',
                                        rules: [{
                                            required: true, message: '请输入订单编号',
                                        }],
                                    })
                                    }
                                />
                                <span className='error'>
                                    {
                                        getFieldError('orderCode1')
                                    }
                                </span>
                            </FormItem>
                        </Col>
                        <Col sm={6} xs={12}>
                            <FormItem>
                                <Label>供应商名称：
                                    <span className='mast'>*</span>
                                </Label>
                                <FormControl
                                    {
                                        ...getFieldProps('supplierName1', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请输入供应商名称',
                                            }],
                                        })
                                    }
                                />
                                <span className='error'>
                                    {
                                        getFieldError('supplierName1')
                                    }
                                </span>
                            </FormItem>
                            
                        </Col>
                        <Col sm={6} xs={12}>
                            <FormItem>
                                <Label className='time'>凭证日期：</Label>
                                <RangePicker
                                    defaultValue={this.state.voucherDate}
                                    placeholder={'开始 ~ 结束'}
                                    dateInputPlaceholder={['开始', '结束']}
                                    {
                                    ...getFieldProps('voucherDate1', {
                                        onChange: function (v) {
                                            self.setState({
                                                voucherDate1: v
                                            })
                                        }
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col sm={6} xs={12}>
                            <FormItem>
                                <Label>采购组：
                                    <span className='mast'>*</span>
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('purchasingGroup1', {
                                        initialValue: '',
                                        rules: [{
                                            required: true, message: '请输入采购组',
                                        }],
                                    })
                                    }
                                />
                                <span className='error'>
                                    {
                                        getFieldError('purchasingGroup1')
                                    }
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={12}>
                            <div className = 'btn-group'>
                                <Button size='sm' className = 'reset-btn' onClick={()=>{this.reset(1)}}>
                                        重置
                                </Button>
                                <Button size='sm' className = 'submit-btn' onClick={()=>{this.search(1)}}>
                                        提交
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <div className='split'></div>
                    
                     {/* 单列铺满 */}
                     <Row className = 'edit-panel edit-panel-all'>
                        <FormItem>
                            <Col md={2}>
                                <Label>订单编号：
                                    <span className='mast'>*</span>
                                </Label>
                            </Col>
                            <Col md={10}>
                                <FormControl
                                    {
                                    ...getFieldProps('orderCode2', {
                                        initialValue: '',
                                        rules: [{
                                            required: true, message: '请输入订单编号',
                                        }],
                                    })
                                    }
                                />
                                <span className='error'>
                                    {
                                        getFieldError('orderCode2')
                                    }
                                </span>
                            </Col>
                        </FormItem>

                        <FormItem>
                            <Col md={2}>
                                <Label>供应商名称：
                                    <span className='mast'>*</span>
                                </Label>
                            </Col>
                            <Col md={10}>
                                <FormControl
                                    {
                                        ...getFieldProps('supplierName2', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请输入供应商名称',
                                            }],
                                        })
                                    }
                                />
                                <span className='error'>
                                    {
                                        getFieldError('supplierName2')
                                    }
                                </span>
                            </Col>
                        </FormItem>

                        <FormItem>
                            <Col md={2}>
                                <Label>凭证日期：</Label>
                            </Col>
                            <Col md={10}>
                                <RangePicker
                                    defaultValue={this.state.voucherDate}
                                    placeholder={'开始 ~ 结束'}
                                    dateInputPlaceholder={['开始', '结束']}
                                    {
                                    ...getFieldProps('voucherDate2', {
                                        onChange: function (v) {
                                            self.setState({
                                                voucherDate2: v
                                            })
                                        }
                                    })
                                    }
                                />
                            </Col>
                        </FormItem>
                        <FormItem>
                            <Col md={2}>
                                <Label>订单类型：</Label>
                            </Col>
                            <Col md={10}>
                                <Select {
                                    ...getFieldProps('type', {
                                        initialValue: '',
                                    }
                                    )}>
                                    <Option value="">请选择</Option>
                                    {
                                        orderTypes.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.code}>{item.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Col>
                        </FormItem>
                        <Col md={12}>
                            <div className = 'btn-group'>
                                <Button size='sm' className = 'reset-btn' onClick={()=>{this.reset(2)}}>
                                        重置
                                </Button>
                                <Button size='sm' className = 'submit-btn' onClick={()=>{this.search(2)}}>
                                        提交
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <div className='split'></div>

                    {/* 单列居中 */}
                    <Row className = 'edit-panel edit-panel-center'>
                        <Col md={12}>
                            <FormItem>
                                <Label>订单编号：
                                    <span className='mast'>*</span>
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('orderCode3', {
                                        initialValue: '',
                                        rules: [{
                                            required: true, message: '请输入订单编号',
                                        }],
                                    })
                                    }
                                />
                                <span className='error'>
                                    {
                                        getFieldError('orderCode3')
                                    }
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={12}>
                            <FormItem>
                                <Label>供应商名称：
                                    <span className='mast'>*</span>
                                </Label>
                                <FormControl
                                    {
                                        ...getFieldProps('supplierName3', {
                                            initialValue: '',
                                            rules: [{
                                                required: true, message: '请输入供应商名称',
                                            }],
                                        })
                                    }
                                />
                                <span className='error'>
                                    {
                                        getFieldError('supplierName3')
                                    }
                                </span>
                            </FormItem>
                            
                        </Col>
                        <Col md={12}>
                            <FormItem>
                                <Label className='time'>凭证日期：</Label>
                                <RangePicker
                                    defaultValue={this.state.voucherDate}
                                    placeholder={'开始 ~ 结束'}
                                    dateInputPlaceholder={['开始', '结束']}
                                    {
                                    ...getFieldProps('voucherDate3', {
                                        onChange: function (v) {
                                            self.setState({
                                                voucherDate3: v
                                            })
                                        }
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={12}>
                            <div className = 'btn-group'>
                                <Button size='sm' className = 'reset-btn' onClick={()=>{this.reset(3)}}>
                                        重置
                                </Button>
                                <Button size='sm' className = 'submit-btn' onClick={()=>{this.search(3)}}>
                                        提交
                                </Button>
                            </div>
                        </Col>
                    </Row>

                     <div className='split'></div>

                    {/* 三列带textarea */}

                    <Row className = 'edit-panel edit-panel-textarea'>

                            <Col md={1}>
                                <Label>订单编号：
                                    <span className='mast'>*</span>
                                </Label>
                            </Col>
                            <Col md={3}>
                                <FormControl
                                    {
                                    ...getFieldProps('orderCode4', {
                                        initialValue: '',
                                        rules: [{
                                            required: true, message: '请输入订单编号',
                                        }],
                                    })
                                    }
                                />
                                <span className='error'>
                                    {
                                        getFieldError('orderCode4')
                                    }
                                </span>
                            </Col>
                            <Col md={1}>
                                <Label>供应商名称：
                                    <span className='mast'>*</span>
                                </Label>
                            </Col>
                            <Col md={3}>
                            <FormControl
                                {
                                    ...getFieldProps('supplierName4', {
                                        initialValue: '',
                                        rules: [{
                                            required: true, message: '请输入供应商名称',
                                        }],
                                    })
                                }
                                />
                                <span className='error'>
                                    {
                                        getFieldError('supplierName4')
                                    }
                                </span>
                            </Col>
                            <Col md={1}>
                                <Label className='time'>凭证日期：</Label>
                            </Col>
                            <Col md={3}>
                            <RangePicker
                                    defaultValue={this.state.voucherDate}
                                    placeholder={'开始 ~ 结束'}
                                    dateInputPlaceholder={['开始', '结束']}
                                    {
                                    ...getFieldProps('voucherDate4', {
                                        onChange: function (v) {
                                            self.setState({
                                                voucherDate3: v
                                            })
                                        }
                                    })
                                    }
                                />
                            </Col>
                            <Col md={1}>
                                <Label className='time'>备注：</Label>
                            </Col>
                            <Col md={11}>
                            <textarea className='u-form-control'
                                {
                                    ...getFieldProps('mark', {
                                        initialValue: '',
                                    })
                                }
                                />
                            </Col>

                        <Col md={12}>
                            <div className = 'btn-group'>
                                <Button size='sm' className = 'reset-btn' onClick={()=>{this.reset(4)}}>
                                        重置
                                </Button>
                                <Button size='sm' className = 'submit-btn' onClick={()=>{this.search(4)}}>
                                        提交
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    
            </div>
        );
    }
}

export default Form.createForm()(FormValidate);
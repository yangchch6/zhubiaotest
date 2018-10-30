import React, { Component } from 'react';
import { Modal, Button, Table, Icon, Tooltip } from 'tinper-bee';
import './index.less';

export default class HistoryTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalSize: ''
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.columns = [
            { 
                title: "合同编码",
                dataIndex: "b", 
                key: "b", 
                width: '10%' 
            },
            { 
                title: "合同名称",
                dataIndex: "c", 
                key: "c", 
                width: '10%' 
            },
            { 
                title: "付款通道",
                dataIndex: "d", 
                key: "d", 
                width: '10%' 
            },
            { 
                title: "付款方式",
                dataIndex: "e", 
                key: "e", 
                width: '10%' 
            },
            { 
                title: "状态",
                dataIndex: "f", 
                key: "f", 
                width: '10%' 
            },
            { 
                title: "备注",
                dataIndex: "g", 
                key: "g", 
                width: '10%' 
            },
            { 
                title: "时间",
                dataIndex: "h", 
                key: "h", 
                width: '10%' 
            },
        ]
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    changeSize(size) {
        this.setState({
            modalSize: size
        });
    }

    render() {
        let { showModal } = this.state;
        let tip = (
			<div>
				历史记录表
			</div>
		)
        return (
            <div className="history-table">
                <Tooltip inverse overlay={tip} placement="left">
                    <div className="history-btn"
                        onClick={ ()=>{this.changeSize("xlg");this.open();} }>
                        {!showModal ? <Icon type="uf-arrow-left"></Icon> : <Icon type="uf-arrow-right"></Icon>}
                    </div>
                </Tooltip>
                <Modal show={ this.state.showModal } size={ this.state.modalSize } onHide={ this.close } >
                    <Modal.Header closeButton>
                        <Modal.Title > 历史记录表 </Modal.Title>
                    </Modal.Header >
                    <Modal.Body >
                        <Table
                            bordered
                            columns={this.columns}
                            height={43}
                            headerHeight={42}
                            />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.close }> 关闭 </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

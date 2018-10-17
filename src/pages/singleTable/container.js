import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import ExampleHelloworldTable from './components/ExampleHelloworld-root/ExampleHelloworldTable';
import ExampleHelloworldSelectTable from './components/ExampleHelloworld-root/ExampleHelloworldSelectTable';
import ExampleHelloworldPaginationTable from './components/ExampleHelloworld-root/ExampleHelloworldPaginationTable';
import ExampleHelloworldEdit from './components/ExampleHelloworld-edit/Edit';
// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedExampleHelloworldTable = connect( state => state.ExampleHelloworld, null )(ExampleHelloworldTable);
export const ConnectedExampleHelloworldSelectTable = connect( state => state.ExampleHelloworld, null )(ExampleHelloworldSelectTable);
export const ConnectedExampleHelloworldPaginationTable = connect( state => state.ExampleHelloworld, null )(ExampleHelloworldPaginationTable);
export const ConnectedExampleHelloworldEdit = connect( state => state.ExampleHelloworld, null )(ExampleHelloworldEdit);

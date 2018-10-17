import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import Demo_tableTable from './components/demo_table-root/Demo_tableTable';
import Demo_tableSelectTable from './components/demo_table-root/Demo_tableSelectTable';
import Demo_tablePaginationTable from './components/demo_table-root/Demo_tablePaginationTable';
import Demo_tableEdit from './components/demo_table-edit/Edit';
    import Demo_childChildtable from './components/demo_child-childtable'
    import Demo_child2Childtable from './components/demo_child2-childtable'
// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedDemo_tableTable = connect( state => state.demo_table, null )(Demo_tableTable);
export const ConnectedDemo_tableSelectTable = connect( state => state.demo_table, null )(Demo_tableSelectTable);
export const ConnectedDemo_tablePaginationTable = connect( state => state.demo_table, null )(Demo_tablePaginationTable);
export const ConnectedDemo_tableEdit = connect( state => state.demo_table, null )(Demo_tableEdit);
    export const ConnectedDemo_childChildtable  = connect( state => state.demo_table, null )(Demo_childChildtable);
    export const ConnectedDemo_child2Childtable  = connect( state => state.demo_table, null )(Demo_child2Childtable);

import request from "utils/request";
//定义接口地址
const URL = {
    "GET_DETAIL":  `${GROBAL_HTTP_CTX}/example_helloworld/list`,
    "SAVE_ORDER":  `${GROBAL_HTTP_CTX}/example_helloworld/save`,
    "GET_LIST":  `${GROBAL_HTTP_CTX}/example_helloworld/list`,    
    "DEL_ORDER":  `${GROBAL_HTTP_CTX}/example_helloworld/deleteBatch`,

    "GET_DAY_TODO_LIST": `https://mock.yonyoucloud.com/mock/356/hzlq/dayTodo`,
    "GET_MONTH_TODO_LIST":`https://mock.yonyoucloud.com/mock/356/hzlq/monthTodo`
}

/**
 * 获取未完成表格数量列表（按天查）
 * @param {*} params
 */
export const getDayTodoList = (params) => {
    let url =URL.GET_DAY_TODO_LIST;
    for(let attr in params){
        if((attr!='pageIndex')&&(attr!='pageSize')){
            url+='&search_'+attr+'='+params[attr];
        }else{
            url+='&'+attr+'='+params[attr];
        }
    }
    return request(url, {
        method: "get",
        data: params
    });
}

/**
 * 获取未完成表格数量列表 （按月查）
 * @param {*} params
 */
export const getMonthTodoList = (params) => {
    return request(URL.GET_MONTH_TODO_LIST, {
        method: "get",
        data: params
    });
}

/**
 * 获取列表
 * @param {*} params
 */
export const getList = (params) => {
    return request(URL.GET_DAY_TODO_LIST, {
        method: "get",
        data: params
    });
}

/**
 * 获取下拉列表
 * @param {*} params
 */
export const getSelect = (params) => {
    return request(URL.GET_SELECT, {
        method: "get",
        data: params
    });
}
/**
 * 删除table数据
 * @param {*} params
 */
export const deleteList = (params) => {
    return request(URL.DELETE, {
        method: "post",
        data:params
    });
}

export const saveList = (params) => {
    return request(URL.SAVE, {
        method: "post",
        data:params
    });
}
export const saveExampleHelloworld = (params) => {
    return request(URL.SAVE_ORDER, {
        method: "post",
        data: params
    });
}
export const delExampleHelloworld = (params) => {
    return request(URL.DEL_ORDER, {
        method: "post",
        data: params
    });
}

/**
 * 通过search_id 查询列表详情
*/

export const getDetail = (params) => {
    return request(URL.GET_DETAIL, {
        method: "get",
        param: params
    });
}

import request from "utils/request";
//定义接口地址
const URL = {
    // "GET_DETAIL":  `${GROBAL_HTTP_CTX}/zhubiaotest/getAssoVo`,
    "SAVE_ORDER":  `${GROBAL_HTTP_CTX}/zhubiaotest/saveAssoVo`,
    // "GET_LIST":  `${GROBAL_HTTP_CTX}/zhubiaotest/list`,
    "DEL_ORDER":  `${GROBAL_HTTP_CTX}/zhubiaotest/deleteBatch`,

    "GET_DETAIL": `https://mock.yonyoucloud.com/mock/311/demoOrder/zhubiaotest/getAssoVo`,
    "GET_LIST": `https://mock.yonyoucloud.com/mock/311/demoOrder/zhubiaotest/list`,

}

/**
 * 获取列表
 * @param {*} params
 */
export const getList = (params) => {
    let url =URL.GET_LIST+'?1=1';
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
export const saveDemo_table = (params) => {
    return request(URL.SAVE_ORDER, {
        method: "post",
        data: params
    });
}
export const delDemo_table = (params) => {
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

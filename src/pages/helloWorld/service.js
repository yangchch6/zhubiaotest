import request from "utils/request";

const URL = {
    "GET_DATA": `${GROBAL_HTTP_CTX}/hello_world/list`
}

export const getData = (params) => {
    return request(URL.GET_DATA,{
        method: "get",
        param: params
    })
}
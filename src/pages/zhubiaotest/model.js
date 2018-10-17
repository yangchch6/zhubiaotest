import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要
import { processData } from "utils";
import moment from 'moment';

export default {
    // 确定 Store 中的数据模型作用域
    name: "zhubiaotest",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        rowData:{},
        showLoading:false,
        list: [],
        orderTypes:[],
        pageIndex:1,
        pageSize:10,
        totalPages:1,
        total:0,
        childListzibiaotest:[],          //子表
        cacheArrayzibiaotest:[],         //缓存数据
        delArrayzibiaotest:[],
        childListzibiaotest01:[],        //子表01
        cacheArrayzibiaotest01:[],       //缓存数据01
        delArrayzibiaotest01:[],
        grandSonData:[],                 //孙表
        detail:{},
        searchParam:{},
        validateNum:99,//不存在的step

    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadList(param, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.zhubiaotest.updateState({ showLoading:true })
            if(param){
                param.pageIndex = param.pageIndex ? param.pageIndex - 1 : 0;
                param.pageSize = param.pageSize ? param.pageSize : 10;
            } else {
                param = {}
            }
            // 调用 getList 请求数据
            let res = processData(await api.getList(param));
            actions.zhubiaotest.updateState({  showLoading:false })
            if (res) {
                if(res.content&&res.content.length){
                    for(let i=0;i<res.content.length;i++){
                        let temp = Object.assign({},res.content[i]);
                        res.content[i].key=i+1;
                        
                        res.content[i].code = temp.code+"";
                    
                        
                        res.content[i].name = temp.name+"";
                    
                    }
                }
                // console.log('res content',res.content);
                actions.zhubiaotest.updateState({
                    list: res.content,
                    pageIndex:res.number + 1,
                    totalPages:res.totalPages,
                    total:res.totalElements
                });
            }
        },

        /**
         * getSelect：获取下拉列表数据
         * @param {*} param
         * @param {*} getState
         */
        getOrderTypes(param,getState){
            actions.zhubiaotest.updateState({
            orderTypes:  [{
                "code":"0",
                "name":"D001"
            },{
                "code":"1",
                "name":"D002"
            },{
                "code":"2",
                "name":"D003"
            },{
                "code":"3",
                "name":"D004"
            }]
            })
        },

        /**
         * getSelect：保存table数据
         * @param {*} param
         * @param {*} getState
         */
        async saveList(param, getState) {
            let result = await api.saveList(param);
            return result;
        },
        /**
         * 删除table数据
         * @param {*} id
         * @param {*} getState
         */
        async removeList(id, getState) {
            let result = await api.deleteList([{id}]);
            return result;
        },

        async delItem(param,getState){
            actions.zhubiaotest.updateState({
              showLoading:true
            })
            let res=processData(await api.delZhubiaotest(param.param),'删除成功');
            actions.zhubiaotest.loadList();
        },

        async save(param,getState){//保存
            actions.zhubiaotest.updateState({
              showLoading:true
            })
            let res = processData(await api.saveZhubiaotest(param),'保存成功');
            console.log("保存信息",res);
            if(res){
               window.history.go(-1);
            }
            actions.zhubiaotest.updateState({
                showLoading:false,

            });
        },

        async queryDetail(param,getState) {
            await actions.zhubiaotest.updateState({
                childListzibiaotest:[],
                childListzibiaotest01:[]
            });
            let {data:{detailMsg}}=await api.getDetail(param);
                    let childData = [...detailMsg.zibiaotestList] ;
                    let childData01 = [...detailMsg.zibiaotest01List];
                    let subList = [];//孙表数据
                    let cacheArrayzibiaotest = [];
                    let tempArrayzibiaotest = [];
                    let cacheArrayzibiaotest01 = [];
                    let tempArrayzibiaotest01 = [];
                    if(childData) {
                        childData.map((item,index)=>{
                            let temp = Object.assign({},item);
                            temp.uuid = setTimeout(function(){},1);
                            tempArrayzibiaotest.push(temp);
                            subList.push(item.subList);
                        })
                    }
                    console.log("subList:",subList);

                    if(childData01) {
                        childData01.map((item,index)=>{
                            let temp = Object.assign({},item);
                            temp.uuid = setTimeout(function(){},1);
                            tempArrayzibiaotest01.push(temp);
                        })
                    }

                    // tempArray中修改参照字段
                    if(tempArrayzibiaotest) {
                        tempArrayzibiaotest.map((item)=>{
                            let temp = Object.assign({},item);
                            cacheArrayzibiaotest.push(temp);
                        })
                    }

                    // tempArray中修改参照字段
                    if(tempArrayzibiaotest01) {
                        tempArrayzibiaotest01.map((item)=>{
                            let temp = Object.assign({},item);
                            cacheArrayzibiaotest01.push(temp);
                        })
                    }

                    console.log("childList,cacheArray",tempArrayzibiaotest,cacheArrayzibiaotest);
                    console.log("childList01,cacheArray01",tempArrayzibiaotest01,cacheArrayzibiaotest01);

                    await actions.zhubiaotest.updateState({
                        childListzibiaotest:tempArrayzibiaotest,
                        cacheArrayzibiaotest:cacheArrayzibiaotest,
                        childListzibiaotest01:tempArrayzibiaotest01,
                        cacheArrayzibiaotest01:cacheArrayzibiaotest01,
                        grandSonData:subList
                    })
            return  detailMsg.entity;
        },

        


    }
};
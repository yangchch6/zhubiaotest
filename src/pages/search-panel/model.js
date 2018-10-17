import {actions} from 'mirrorx';
import * as api from './service';

export default {
    name:"searchPanel",
    initialState:{

    },
    reducers:{
        updateState(state, data) {
            return {
                ...state,
                ...data
            };
        }
    },
    effects:{
        async upload(data, getState) {

        }
    }
}
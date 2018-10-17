import { actions } from 'mirrorx';
import * as api from "./service";

export default {
    name: "DemoForm",
    initialState: {

    },
    reducers: {
        save(state, data) {
            return {
                ...state,
                ...data
            }
        }
    },
    effects: {
        async upload(data, getState) {

        }
    }
}
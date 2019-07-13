import {type} from './action.jsx';

const initialState = {
    name: '首页'
};

export default (state = initialState, action) => {
    if (action.type === type.title) {
        return {
            ...state,
            name: action.name
        };
    }else {
        return {
            ...state
        }
    }
}
/*
import {type} from './action.jsx';

const initialState = {
    menuName: '首页'
};
const ebikeData = (state = initialState, action) => {
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName:action.menuName
            };
        default:
            return {...state};
            break;
    }
};

export default ebikeData;*/

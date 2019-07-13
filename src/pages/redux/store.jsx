import {createStore} from "redux";
import reducer from './reducer.jsx';


export default () => createStore(reducer);
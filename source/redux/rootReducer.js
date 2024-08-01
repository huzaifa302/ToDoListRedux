import {combineReducers} from 'redux';
import taskReducer from './taskreducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
});
export default rootReducer;

import {combineReducers} from 'redux';
import DesignerReducer from './designerReducer';


export default combineReducers( {
  designer: DesignerReducer
});
import {combineReducers} from 'redux';
import DesignerReducer from './designerReducer';
import FiltersReducer from './filtersReducer';

export default combineReducers( {
  designer: DesignerReducer,
  filters: FiltersReducer
});
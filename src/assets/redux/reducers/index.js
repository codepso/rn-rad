import {combineReducers} from 'redux';
import {types} from '../types';
import user from './user';

const reducer = combineReducers({
  user,
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    state = undefined;
  }

  return reducer(state, action);
};

export default rootReducer;

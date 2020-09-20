import {types} from '../types';
import {coreState} from '../state';

const initialState = {...coreState.user};

function user(state = initialState, action) {
  switch (action.type) {
    case types.SET_AUTH_USER: {
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
}

export default user;

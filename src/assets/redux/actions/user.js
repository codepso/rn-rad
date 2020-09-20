import {types} from '../types';

export function setAuthUser(payload) {
  return {
    type: types.SET_AUTH_USER,
    payload,
  };
}

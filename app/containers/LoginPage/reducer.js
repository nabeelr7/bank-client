/*
 *
 * LoginPage reducer
 *
 */

import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { routes } from 'utils';
import {
  NEXT_STEP,
  PREVIOUS_STEP,
  CHANGE_INPUT_NUMBER,
  CHANGE_INPUT,
} from 'containers/App/constants';

export const initialState = {
  pinCode: '',
  password: '',
  currentStep: 0,
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
const loginPageReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_INPUT_NUMBER:
      if (window.location.pathname === routes.login.path) {
        draft[action.name] = parseInt(action.value, 10) || '';
      }

      break;
    case CHANGE_INPUT:
      if (window.location.pathname === routes.login.path) {
        draft[action.name] = action.value;
      }

      break;
    case NEXT_STEP:
      if (window.location.pathname === routes.login.path) {
        draft.currentStep += 1;
      }

      break;
    case PREVIOUS_STEP:
      if (window.location.pathname === routes.login.path) {
        draft.currentStep -= 1;
      }

      break;
    case LOCATION_CHANGE:
      return initialState;
  }
}, initialState);

export default loginPageReducer;

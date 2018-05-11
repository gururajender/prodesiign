import { combineReducers } from 'redux';
import flashMessage from './Reducers/FlashMessages';
import auth from './Reducers/auth';

export default combineReducers ({
  flashMessage,
  auth
})

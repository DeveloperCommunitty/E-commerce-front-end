import { combineReducers } from "redux";
import cartReducer from './cart/slice.js';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;

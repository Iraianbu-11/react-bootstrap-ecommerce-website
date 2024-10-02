import handleCart from "./handleCart";
import productReducer from "./productReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    handleCart,
    products : productReducer,
})

export default rootReducers;
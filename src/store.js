import { createStore } from "redux";
import rootReducer from "./reducers/rootReducers";

function configureStore(state = { Cust_data:[], Prod_data:[] ,Sub_data:[],Ven_data:[]}) {
  return createStore(rootReducer,state);
}
export default configureStore;
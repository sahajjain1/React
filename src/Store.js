import {createStore} from "redux";
import rootReducer from "./Reducers/Indexx.js";
 /* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */
export default store;
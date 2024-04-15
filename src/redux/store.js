import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // agar asinxron action lar qo'llanilsa

import teachersReducer from "./reducers/teachersReducer"; // Yukoridagi reducer(lar)
const rootReducer = combineReducers({
  teachers: teachersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

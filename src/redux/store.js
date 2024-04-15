import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import teachersReducer from "./reducers/teachersReducer";
import studentsReducer from "./reducers/studentsReducer";
const rootReducer = combineReducers({
  teachers: teachersReducer,
  students: studentsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

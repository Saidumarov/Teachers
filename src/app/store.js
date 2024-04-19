import { configureStore } from "@reduxjs/toolkit";
import { teacherReducer } from "./teachersSlice";
import { studentReducer } from "./studentSlice";

const store = configureStore({
  reducer: {
    teachers: teacherReducer,
    students: studentReducer,
  },
});

export default store;

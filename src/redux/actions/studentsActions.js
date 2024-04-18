import axios from "axios";

export const fetchStudentsRequest = () => {
  return {
    type: "FETCH_STUDENTS_REQUEST",
  };
};

export const fetchStudentsSuccess = (students) => {
  return {
    type: "FETCH_STUDENTS_SUCCESS",
    payload: students,
  };
};

export const fetchStudentsFailure = (error) => {
  return {
    type: "FETCH_STUDENTS_FAILURE",
    payload: error,
  };
};

export const fetchStudents = () => {
  return (dispatch) => {
    dispatch(fetchStudentsRequest());
    axios
      .get("http://localhost:3000/students")
      .then((response) => {
        const students = response.data;
        dispatch(fetchStudentsSuccess(students));
      })
      .catch((error) => {
        dispatch(fetchStudentsFailure(error.message));
      });
  };
};

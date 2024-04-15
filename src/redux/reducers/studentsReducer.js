// Boshlang'ich holat (initialState)
const initialState = {
  students: [],
  loading: false,
  error: null,
};
// Reducer funksiya
const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Action lar uchun ma'lumotlarni o'zgartirish
    case "FETCH_STUDENTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_STUDENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        students: action.payload,
      };
    case "FETCH_STUDENTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default studentsReducer;

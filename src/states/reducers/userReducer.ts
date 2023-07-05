let item = null;
if (typeof window !== "undefined") {
  // Perform localStorage action
  item = localStorage.getItem("token");
}

const initState = {
  authToken: null,
  isAuthenticated: item ? true : false,
  isSuccessful: false,
  isErrored: false,
  isLoading: false,
};
const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
    case "USER_FORM_SUBMIT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload);
      window.location.href = "/form";
      return {
        ...state,
        authToken: action.payload,
        isAuthenticated: true,
        isLoading: false,
        isSuccessful: true,
      };
    case "USER_LOGIN_FAILURE":
    case "USER_FORM_SUBMIT_FAILURE":
      return {
        ...state,
        isLoading: false,
        isSuccessful: false,
        isErrored: true,
      };
    case "USER_FORM_SUBMIT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
      };
    default:
      return state;
  }
};

export default userReducer;

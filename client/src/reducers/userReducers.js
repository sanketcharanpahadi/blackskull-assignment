import {
  USER_CHANGE_EMAIL,
  USER_CHANGE_FIRSTNAME,
  USER_CHANGE_ISMEMBER,
  USER_CHANGE_LASTNAME,
  USER_CHANGE_PASSWORD,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

const initialState = {
  firstname: localStorage.getItem("firstname") || "",
  isMember: localStorage.getItem("token") ? true : false,
  email: localStorage.getItem("email") || "",
  password: localStorage.getItem("password") || "",
  lastname: localStorage.getItem("lastname") || "",
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  token: localStorage.getItem("token") || "",
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isMember: true, isLoading: true };

    case USER_SIGNUP_REQUEST:
      return { ...state, isLoading: true, isMember: false };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        email: action.payload.email,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        password: action.payload.password,
        isMember: true,
        token: action.payload.password,
      };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        email: action.payload.email,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        password: action.payload.password,
        isMember: true,
        token: action.payload.token,
      };

    case USER_LOGIN_FAIL:
      return {
        ...initialState,
        isMember: true,
        alertType: "danger",
        alertText: action.payload,
        showAlert: true,
      };

    case USER_SIGNUP_FAIL:
      return {
        ...initialState,
        isMember: false,
        alertType: "danger",
        alertText: action.payload,
        showAlert: true,
      };

    case USER_LOGIN_LOGOUT:
      localStorage.removeItem("email");
      localStorage.removeItem("firstname");
      localStorage.removeItem("lastname");
      localStorage.removeItem("token");
      localStorage.removeItem("password");
      return { ...initialState };

    case USER_CHANGE_ISMEMBER:
      return { ...initialState, isMember: !state.isMember };

    case USER_CHANGE_EMAIL:
      return { ...state, email: action.payload };

    case USER_CHANGE_FIRSTNAME:
      return { ...state, firstname: action.payload };

    case USER_CHANGE_LASTNAME:
      return { ...state, lastname: action.payload };

    case USER_CHANGE_PASSWORD:
      return { ...state, password: action.payload };

    case USER_UPDATE_REQUEST:
      return { ...state, isLoading: true, isMember: true };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        email: action.payload.email,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        password: action.payload.password,
        isMember: true,
        token: action.payload.token,
      };

    default:
      return state;
  }
};

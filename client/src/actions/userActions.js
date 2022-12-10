import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    console.log(data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        firstname: data.firstname,
        lastname: data.lastname,
        password: password,
        email: data.email,
        token: data.token,
      },
    });
    localStorage.setItem("firstname", JSON.stringify(data.firstname));
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("lastname", data.lastname);
    localStorage.setItem("password", password);
    localStorage.setItem("email", data.email);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signup =
  (email, password, firstname, lastname) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register",
        { email, password, firstname, lastname },
        config
      );
      console.log(data);

      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: {
          firstname: data.firstname,
          lastname: data.lastname,
          password: password,
          email: data.email,
          token: data.token,
        },
      });
      localStorage.setItem("firstname", JSON.stringify(data.firstname));
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("lastname", data.lastname);
      localStorage.setItem("password", password); //change data.password
      localStorage.setItem("email", data.email);
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUser =
  (email, password, firstname, lastname, token) => async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        "/api/users/updateUser",
        { email, firstname, lastname, password, token },
        config
      );
      console.log(data);
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: {
          firstname: data.firstname,
          lastname: data.lastname,
          password: password,
          email: data.email,
          token: data.token,
        },
      });
      localStorage.setItem("firstname", JSON.stringify(data.firstname));
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("lastname", data.lastname);
      localStorage.setItem("password", password);
      localStorage.setItem("email", data.email);
    } catch (error) {
      console.log(error);
    }
  };

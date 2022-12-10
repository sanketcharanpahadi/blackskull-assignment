import Alert from "../components/Alert";
import FormField from "../components/FormField";

import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../actions/userActions";
import {
  USER_CHANGE_EMAIL,
  USER_CHANGE_FIRSTNAME,
  USER_CHANGE_ISMEMBER,
  USER_CHANGE_LASTNAME,
  USER_CHANGE_PASSWORD,
} from "../constants/userConstants";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, isMember, showAlert, firstname, lastname, token } =
    useSelector((state) => state.userLogin);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isMember) {
      dispatch(login(email, password));
    } else {
      dispatch(signup(email, password, firstname, lastname));
    }
  };

  const toggleMemberHandler = () => {
    dispatch({ type: USER_CHANGE_ISMEMBER });
  };

  useEffect(() => {
    if (token) {
      console.log("hello1");
      navigate("/user/profile");
    } else {
      console.log("hello2");
      navigate("/register");
      console.log(token);
    }

    return () => {};
  }, [token, dispatch, navigate, email, firstname, lastname, password]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-200">
      <form
        className="flex flex-col gap-4 px-6 py-8 bg-white rounded w-80"
        onSubmit={submitHandler}
      >
        <h3 className="text-xl font-semibold text-center">
          {isMember ? "Login" : "Register"}
        </h3>
        {showAlert && <Alert />}
        <FormField
          name="email"
          type="email"
          label="Email"
          value={email}
          onChangeHandler={(e) =>
            dispatch({ type: USER_CHANGE_EMAIL, payload: e.target.value })
          }
        />
        {!isMember && (
          <FormField
            name="firstname"
            type="text"
            label="First Name"
            value={firstname}
            onChangeHandler={(e) =>
              dispatch({ type: USER_CHANGE_FIRSTNAME, payload: e.target.value })
            }
          />
        )}
        {!isMember && (
          <FormField
            name="lastname"
            type="text"
            label="Last Name"
            value={lastname}
            onChangeHandler={(e) =>
              dispatch({ type: USER_CHANGE_LASTNAME, payload: e.target.value })
            }
          />
        )}
        <FormField
          name="password"
          type="password"
          label="Password"
          value={password}
          onChangeHandler={(e) =>
            dispatch({ type: USER_CHANGE_PASSWORD, payload: e.target.value })
          }
        />

        <button
          type="submit"
          className="py-2 text-white bg-blue-500 rounded-sm"
        >
          {isMember ? "Login" : "Create Account"}
        </button>
        <div className="text-center">
          {isMember ? "Not a member yet? " : "Already a member "}
          <button
            type="button"
            className="text-cyan-600"
            onClick={toggleMemberHandler}
          >
            {isMember ? "Register" : "Login"}
          </button>
        </div>
      </form>
      <Link to="/chats">Chat</Link>
    </div>
  );
};

export default Form;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../actions/userActions";
import { USER_LOGIN_LOGOUT } from "../constants/userConstants";

const UserProfile = () => {
  const { email, firstname, password, lastname, token } = useSelector(
    (state) => state.userLogin
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pass, setPass] = useState("");
  const [uemail, setUemail] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/register");
      console.log("object");
      console.log(token);
    } else {
      console.log(token);
      setFname(firstname);
      setLname(lastname);
      setPass(password);
      setUemail(email);
    }
  }, [token, navigate, dispatch, firstname, lastname, password, email]);

  const removeUser = () => {
    dispatch({ type: USER_LOGIN_LOGOUT });
    navigate("/register");
  };

  const submitHandler = () => {
    if (uemail && fname && pass) {
      dispatch(updateUser(uemail, pass, fname, lname, token));
    } else {
      console.log("hahahaha");
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen user-profile">
        <h1 className="mb-8 text-xl font-bold text-gray-500">Identity</h1>
        <div className="form-actions w-[400px] flex justify-between mb-4">
          <button
            className="block px-6 py-2 font-semibold text-white bg-blue-400"
            onClick={removeUser}
          >
            Logout
          </button>
          <button
            className="block px-6 py-2 font-semibold text-white bg-blue-400"
            onClick={submitHandler}
          >
            Save
          </button>
        </div>
        <form className="w-[400px] block bg-gray-300 p-6">
          <div className="mb-3">
            <label htmlFor="profile-fname" className="block mb-1">
              First Name:
            </label>
            <input
              type="text"
              name="profile-fname"
              id="profile-fname"
              required
              value={fname}
              className="block w-full "
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profile-lname" className="block mb-1">
              Last Name:
            </label>
            <input
              type="text"
              name="profile-lname"
              id="profile-lname"
              value={lname}
              className="block w-full "
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profile-email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              name="profile-email"
              id="profile-email"
              required
              value={uemail}
              className="block w-full "
              onChange={(e) => setUemail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profile-password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              name="profile-password"
              id="profile-password"
              required
              value={pass}
              minLength="6"
              className="block w-full "
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;

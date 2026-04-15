import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl, LOGO } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(baseUrl + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections())
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div className="w-full shadow-sm bg-base-300">
      <div className="navbar  w-[80%] mx-auto flex justify-between">
        <div className="navbar-center">
          <img className="w-32 py-1 rounded-2xl" src={LOGO} alt="logo" />
        </div>
        {user && (
          <div className="dropdown">
            <div className="navbar-end btn space-x-3 btn-circle" tabIndex={0} role="button">
              <p className="text-white">welcome, {user.lastName}</p>
              <button className="btn btn-ghost btn-circle border-white border-[.5px]">
                <img className="h-full object-cover rounded-full" src={user.photoUrl} alt="" />
              </button>
            </div>

            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-24 p-2 shadow">
              <li>
                <Link to={"/feed"}>Home</Link>
              </li>
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li>
                <Link to={'/requests'}>Requests</Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
                </li>
              <li>
                <p onClick={handleLogout}>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

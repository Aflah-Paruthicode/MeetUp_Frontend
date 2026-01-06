import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl, LOGO } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(baseUrl + "/logout", {}, {withCredentials : true});
      dispatch(removeUser());
      return navigate('/login');
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // console.log(user, "user");
  }, [user]);

  return (
    <div className="w-full shadow-sm">
      <div className="navbar bg-base-100 w-[70%] mx-auto flex justify-between">
        
        <div className="navbar-center">
          <img className="w-32 py-1 rounded-2xl" src={LOGO} alt="logo" />
        </div>
        {user && (
          <div className="dropdown">
             <div className="navbar-end btn  btn-circle" tabIndex={0} role="button">
            <p className="text-white">{user.lastName}</p>
            <button className="btn btn-ghost btn-circle">
              <img className="w-60 py-1 rounded-full" src={user.photoUrl} alt="" />
            </button>
          </div> 
            
            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/proffile'}>Proffile</Link>
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

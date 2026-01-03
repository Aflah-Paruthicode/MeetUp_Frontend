import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { LOGO } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  useEffect(() => {
    console.log(user, "user");
  }, [user]);

  return (
    <div className="w-full shadow-sm">
      <div className="navbar bg-base-100 w-[70%] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <img className="w-32 py-1 rounded-2xl" src={LOGO} alt="logo" />
        </div>
        {user && (
          <div className="navbar-end">
            <p className="text-white">{user.lastName}</p>
            <button className="btn btn-ghost btn-circle">
              <img className="w-60 py-1 rounded-2xl" src={user.photoUrl} alt="" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

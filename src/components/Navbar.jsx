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
    <div className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <img className="h-8 w-auto object-contain brightness-110" src={LOGO} alt="logo" />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="dropdown dropdown-end">
              {/* User Profile Pill */}
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full border border-slate-200 hover:border-blue-400/50 hover:bg-white transition-all duration-300 shadow-sm group"
              >
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                  {user.firstName + " " + user.lastName}
                </span>
                <div className="h-8 w-8 rounded-full ring-2 ring-slate-50 overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={user.photoUrl}
                    alt="profile"
                  />
                </div>
              </div>

              {/* Premium Dropdown Menu */}
              <ul
                tabIndex={0}
                className="dropdown-content mt-4 z-1 menu p-2 shadow-2xl bg-white border border-slate-100 rounded-2xl w-52 overflow-hidden animate-in fade-in slide-in-from-top-2"
              >
                <li className="menu-title text-[10px] uppercase tracking-widest text-slate-400 font-bold px-4 py-2">
                  Account
                </li>
                <li>
                  <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-600 font-medium active:scale-95 transition-all">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-600 font-medium active:scale-95 transition-all">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-600 font-medium active:scale-95 transition-all">
                    Requests
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-600 font-medium active:scale-95 transition-all">
                    Connections
                  </Link>
                </li>
                <div className="h-px bg-slate-100 my-1 mx-2" />
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 font-semibold active:scale-95 transition-all"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                Login
              </Link>
              <button className="px-5 py-2.5 bg-slate-900 text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] active:scale-95 transition-all">
                Join Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

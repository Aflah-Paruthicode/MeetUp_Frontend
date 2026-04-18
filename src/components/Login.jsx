import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { baseUrl } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("aflu@gmail.com");
  const [password, setPassword] = useState("Aflu@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(baseUrl + "/login", { email, password }, { withCredentials: true });
      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (error) {
      console.log(error?.response?.data)
      setError(error?.response?.data || "Something went wrong!");
    }
  };   

  return (
    <div className="flex flex-col items-center justify-center text-slate-800">
  <div className="w-full min-w-80 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 border border-gray-100">
    
    <div className="flex flex-col items-center mb-10">
      <h1 className="text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500">
        Meet Up
      </h1>
    </div>

    <div className="space-y-6">
      <div className="relative group">
        <input 
          type="email" 
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address" 
          className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-100 focus:border-purple-500 outline-none transition-all duration-300 placeholder:text-gray-400 text-sm" 
        />
      </div>

      <div className="relative group">
        <input 
          type="password" 
          name="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" 
          className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-100 focus:border-purple-500 outline-none transition-all duration-300 placeholder:text-gray-400 text-sm" 
        />
      </div>

      {error && <p className="text-[11px] text-red-500 font-medium text-center animate-pulse">{error}</p>}

      <button 
        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-semibold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl shadow-slate-200 mt-4" 
        onClick={handleLogin}
      >
        Sign In
      </button>

      <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 py-2">
        <span className="h-px w-full bg-gray-100"></span>
        <span>OR</span>
        <span className="h-px w-full bg-gray-100"></span>
      </div>

      <button className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Continue with Facebook
      </button>
    </div>
  </div>

  <div className="mt-8 text-center">
    <p className="text-sm text-gray-500">
      New here? <Link to={'/signup'} className="text-purple-600 font-bold cursor-pointer hover:underline">Create account</Link>
    </p>
  </div>
</div>
  );
};

export default Login;

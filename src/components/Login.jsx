import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { baseUrl } from "../utils/constants";
import { useNavigate } from "react-router-dom";

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
      navigate("/feed");
    } catch (error) {
      console.log(error?.response?.data)
      setError(error?.response?.data || "Something went wrong!");
    }
  };   

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto my-auto">
      <legend className="fieldset-legend">Login</legend>

      <label className="label">Email</label>
      <input type="email" className="input" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />

      <label className="label">Password</label>
      <input type="password" className="input" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
      <p className="text-red-400">{error}</p>
      <button className="btn btn-neutral mt-4" onClick={handleLogin}>
        Login
      </button>
    </fieldset>
  );
};

export default Login;

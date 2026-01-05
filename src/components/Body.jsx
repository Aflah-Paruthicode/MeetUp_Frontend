import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dipatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(baseUrl + "/proffile/view", { withCredentials: true });
      dipatch(addUser(res.data))
    } catch (err) {
      if(err.status == 401) navigate('/login')
      console.error(err);
    }
  };

  useEffect(() => {
    if(!userData) fetchUser();
  },[])

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;

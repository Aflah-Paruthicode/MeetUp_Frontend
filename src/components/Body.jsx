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
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {  
    try {
      const res = await axios.get(baseUrl + "/profile/view", { withCredentials: true });
      dipatch(addUser(res.data));
    } catch (err) {
      if (err.status == 401) navigate("/login");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData) fetchUser();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
  <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/80 blur-[120px]" />
  <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/70 blur-[120px]" />

  <div className="relative z-10 flex flex-col min-h-screen">
    <Navbar />
    <main className="grow">
      <Outlet />
    </main>
  </div>
</div>
  );
};

export default Body;

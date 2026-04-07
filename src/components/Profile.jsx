import React from "react";
import Editprofile from "./EditProfile";
import { useSelector } from "react-redux";

const profile = () => {
  const user = useSelector((store) => store.user);
  return <div> {
    user && <Editprofile user={user} />
    } </div>;
};   

export default profile;

import React from "react";
import EditProffile from "./EditProffile";
import { useSelector } from "react-redux";

const Proffile = () => {
  const user = useSelector((store) => store.user);
  return <div> {
    user && <EditProffile user={user} />
    } </div>;
};   

export default Proffile;

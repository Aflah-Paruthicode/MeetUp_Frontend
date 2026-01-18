import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProffile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProffile = async () => {
    try {
      const res = await axios.patch(baseUrl + "/proffile/edit", { firstName, lastName, photoUrl, age, gender, skills, about }, { withCredentials: true });
      // console.log(res)
      dispatch(addUser(res?.data?.data))
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center gap-8 my-8">
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about, skills }} /> 

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 my-auto">
        <legend className="fieldset-legend">Edit Proffile</legend>

        <label className="label">First Name : </label>
        <input type="text" className="input" name="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} />

        <label className="label">Last Name : </label>
        <input type="text" className="input" name="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} />

        <label className="label">Photo Url : </label>
        <input type="text" className="input" name="photoUrl" onChange={(e) => setPhotoUrl(e.target.value)} value={photoUrl} />

        <label className="label">Age : </label>
        <input type="number" className="input" name="age" onChange={(e) => setAge(e.target.value)} value={age} />

        <label className="label">Gender : </label>
        <input type="text" className="input" name="gender" onChange={(e) => setGender(e.target.value)} value={gender} />

        <label className="label">About : </label>
        <input type="text" className="input" name="About" onChange={(e) => setAbout(e.target.value)} value={about} />

        <label className="label">Skills : </label>
        {skills.map((ele, ind) => (
          <input key={ind} type="text" className="input" name="skill" onChange={(e) => setSkills((skills[ind] = e.target.value))} value={ele} />
        ))} 

        {/* <p className="text-red-400">{error}</p> */}
        <button className="btn btn-neutral mt-4" onClick={saveProffile}>Save Changes</button>
      </fieldset>
    </div>
  );
};

export default EditProffile;

import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Editprofile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveprofile = async () => {
    try {
      const res = await axios.post(baseUrl + "/profile/edit", { firstName, lastName, photoUrl, age, gender, skills, about }, { withCredentials: true });
      dispatch(addUser(res?.data?.data))
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false)
      },3000)
    } catch (err) {
      setShowToast(false);
      setError(err?.response?.data);
      console.log(err)
    }
  };
 
  const [inputSkills, setInputSkills] = useState(user.skills.join(','));
  const saveSkills = (e) => {
    const val = e.target.value;
    setInputSkills(val);
    let newSkills = val.split(',').map(s => s.trim()).filter(s => s !== '');
    setSkills(newSkills);
  }

  return (
    <div className="flex justify-center gap-8 my-8 mt-32">
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about, skills }} />

      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 my-auto">
        <legend className="fieldset-legend">Edit profile</legend>

        <label className="label">First Name : </label>
        <input type="text" className="input" name="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} />

        <label className="label">Last Name : </label>
        <input type="text" className="input" name="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} />

        <label className="label">Photo Url : </label>
        <input type="text" className="input" name="photoUrl" onChange={(e) => setPhotoUrl(e.target.value)} value={photoUrl} />

        <label className="label">Age : </label>
        <input type="number" className="input" name="age" onChange={(e) => setAge(e.target.value)} value={age} />

        <label className="label">Gender : </label>
      <select value={gender} onChange={(e) => setGender(e.target.value)} className="select">
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <p className="label">Selected: {gender}</p>

        <label className="label">About : </label>
        <textarea className="textarea" placeholder="about..." onChange={(e) => setAbout(e.target.value)} value={about}></textarea>

        <label className="label">Skills : </label>
          <input  type="text" className="input" name="skill" onChange={saveSkills} value={inputSkills} />

        <p className="text-red-400">{error}</p>
        <button className="btn btn-neutral mt-4" onClick={saveprofile}>Save Changes</button>
      </fieldset>

      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success"> 
          <span>Message sent successfully.</span>
        </div>
      </div>}
    </div>
  );
};

export default Editprofile;

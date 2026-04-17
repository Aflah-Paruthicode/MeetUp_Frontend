import axios from "axios";
import React from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {

  if(!user) return

  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {

      await axios.post(baseUrl + '/request/send/' + _id + '/' + status, {}, { withCredentials: true })
      dispatch(removeFeed(_id));

    } catch (err) {
      console.log(err.message);
    }
  }
  console.log(user)
  return (
    <div className="card w-xs shadow-sm p-3 h-[70vh] bg-white">
      <figure>
        <img src={user.photoUrl} alt="user profile" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-gray-900/90">
          {user.firstName + " " + user.lastName}
          <div className="badge">{user.gender}</div>
        </h2>
        <p className="text-gray-900/60">{user.about}</p>
        <div className="card-actions justify-end">
          {user.skills.map((skill) => (
            <div key={skill} className="badge badge-outline p-2">
              {skill.toUpperCase()}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4">

          <button className="btn btn-outline" onClick={() => handleSendRequest('ignored', user._id)}>Ignore</button>
          <button className="btn bg-blue-400" onClick={() => handleSendRequest('interested', user._id)}>Interested</button>
        </div>
      </div>

    </div>
  );
};

export default UserCard;

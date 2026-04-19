import axios from "axios";
import React from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {

  if (!user) return

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
    <div className="card w-80 h-fit bg-white border border-white/10 shadow-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group">
      <figure className="relative h-64 overflow-hidden">
        <img
          src={user.photoUrl}
          alt="user profile"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
        <div className="absolute top-4 right-4">
          <span className="badge badge-primary px-3 py-1 font-semibold text-xs uppercase tracking-wider">
            {user.gender}
          </span>
        </div>
      </figure>

      <div className="card-body p-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-black tracking-tight">
            {user.firstName} <span className="text-blue-600">{user.lastName}</span>
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2 italic leading-relaxed">
            "{user.about}"
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 border border-gray-600 text-gray-600 uppercase tracking-tighter"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="card-actions mt-8 flex gap-3">
          <button
            className="flex-1 btn bg-transparent text-gray-600 border-gray-600 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all active:scale-95"
            onClick={() => handleSendRequest('ignored', user._id)}
          >
            Ignore
          </button>
          <button
            className="flex-1 btn bg-blue-600 border-none text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all active:scale-95"
            onClick={() => handleSendRequest('interested', user._id)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

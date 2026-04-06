import React from "react";

const UserCard = ({ user }) => {
  console.log(user)
  return (
    <div className="card bg-base-300 w-xs shadow-sm p-3">
      <figure>
        <img src={user.photoUrl} alt="user proffile" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName + " " + user.lastName}
          <div className="badge">{user.gender}</div>
        </h2>
        <p className="text-gray-50/50">{user.about}</p>
        <div className="card-actions justify-end">
          {user.skills.map((skill) => (
            <div key={skill} className="badge badge-outline p-2">
              {skill.toUpperCase()}
            </div>
          ))}
        </div>
      <div className="flex justify-center gap-4">

      <button className="btn btn-outline ">Ignore</button>
      <button className="btn bg-blue-400">Interested</button>
      </div>
      </div> 

    </div>
  );
};

export default UserCard;

import React from "react";

const UserCard = ({ user }) => {
  console.log(user)
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={user.photoUrl} alt="user proffile" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName + " " + user.lastName}
          <div className="badge badge-secondary">{user.gender}</div>
        </h2>
        <p>{user.about}</p>
        <div className="card-actions justify-end">
          {user.skills.map((skill) => (
            <div key={skill} className="badge badge-outline">
              {skill}
            </div>
          ))}
        </div>
      </div> 
    </div>
  );
};

export default UserCard;

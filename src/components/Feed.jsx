import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(baseUrl + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return <div className="p-3 flex justify-center gap-3">{feed && feed.map((user) => <UserCard key={user._id} user={user} />)}</div>;
};

export default Feed;

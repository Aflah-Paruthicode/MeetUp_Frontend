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

  if(feed && feed.length == 0) return <p className="text-black mt-10 text-xl font-semibold">0 Poeple in the feed.</p>

  return  feed && <div className="p-3 flex justify-center mt-36 gap-3"><UserCard user={feed[0]} /></div>
};

export default Feed;

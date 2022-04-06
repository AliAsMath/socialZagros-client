import { useEffect, useState, useContext } from "react";
import Friend from "./Friend";
import { AuthContext } from "./../../contex/auth-context";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import { authAction } from "./../../contex/authAction";
import { useNavigate } from "react-router-dom";

const Information = ({ user }) => {
  const [followings, setFollowings] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const isFollowed = currentUser.followings.includes(user._id);
  const naviaget = useNavigate();

  useEffect(() => {
    if (!user._id) return;
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_REQUEST_PATH + "/api/users/friends/" + user._id
        );

        setFollowings(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [user._id]);

  const followHandler = async () => {
    try {
      if (isFollowed) {
        await axios.put(
          process.env.REACT_APP_REQUEST_PATH +
            "/api/users/unfollow/" +
            user._id,
          { userId: currentUser._id }
        );

        dispatch(authAction.unFollow(user._id));
      } else {
        await axios.put(
          process.env.REACT_APP_REQUEST_PATH + "/api/users/follow/" + user._id,
          { userId: currentUser._id }
        );

        dispatch(authAction.follow(user._id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const chatHandler = async () => {
    const response = await axios.post(
      process.env.REACT_APP_REQUEST_PATH + "/api/conversations",
      { sender: currentUser._id, receiver: user._id }
    );
    naviaget("/messenger", { state: response.data });
  };

  return (
    <div className="vs:flex-[1] flex flex-col gap-3 md:gap-5 vs:py-3 p-3 md:pr-3 ">
      {currentUser.username !== user.username ? (
        <div className="flex gap-2">
          <button
            onClick={followHandler}
            className="flex items-center p-2 text-base font-medium text-white bg-blue-500 rounded outline-none w-fit"
          >
            {isFollowed ? "unFollow" : "Follow"}
            {isFollowed ? <Remove /> : <Add />}
          </button>
          <button
            onClick={chatHandler}
            className="flex items-center p-2 text-base font-medium text-white bg-blue-500 rounded outline-none w-fit"
          >
            Chat
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
          className="flex items-center p-2 text-base font-medium text-white bg-blue-500 rounded outline-none w-fit"
        >
          Log out
        </button>
      )}

      <div className="flex flex-col gap-1 text-xs font-normal vs:font-medium vs:text-sm">
        <h3 className="text-sm font-semibold vs:text-base">User information</h3>
        <p>
          <b>city:</b> {user.city}
        </p>
        <p>
          <b>From:</b> {user.from}
        </p>
        <p>
          <b>Relationship:</b> {user.relationship}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <h3 className="w-full text-xs font-semibold vs:text-base">
          User friends
        </h3>
        {followings.map((user) => (
          <Friend key={user._id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default Information;

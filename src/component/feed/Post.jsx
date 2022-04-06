import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contex/auth-context";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";

const Post = ({
  _id: postId,
  description,
  image,
  createdAt,
  likes,
  comment,
  userId,
}) => {
  const [postUser, setPostUser] = useState({});
  const { username, profilePic } = postUser;
  const { user: currentUser } = useContext(AuthContext);
  const [likeCounter, setLikeCounter] = useState(likes.length);
  const [isAlredyLiked, setIsAlredyLiked] = useState(
    likes.includes(currentUser._id)
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_REQUEST_PATH}/api/users?userId=${userId}`
      );

      setPostUser(response.data);
    };

    fetchUsers();
  }, [userId]);

  const likeHandler = async () => {
    try {
      await axios.put(
        process.env.REACT_APP_REQUEST_PATH + "/api/posts/like/" + postId,
        {
          userId: currentUser._id,
        }
      );
    } catch (err) {
      console.log(err);
    }

    setLikeCounter((prevState) =>
      isAlredyLiked ? prevState - 1 : prevState + 1
    );
    setIsAlredyLiked((prevState) => !prevState);
  };

  return (
    <div className="w-full shadow-[0px_1px_7px_0px_rgb(0,0,0,0.37)] rounded-xl md:p-2 p-1 lg:p-3">
      <div className="flex flex-col w-full gap-1 p-2 lg:gap-5 sm:gap-3 lg:p-3">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${username}`}>
            <img
              className="object-cover w-8 h-8 rounded-full"
              src={
                profilePic
                  ? process.env.REACT_APP_PUBLIC_PATH + profilePic
                  : "/assets/noProfile.png"
              }
              alt=""
            />
          </Link>
          <span className="text-base font-bold">'{username}'</span>
          <span className="text-xs">
            {
              <ReactTimeAgo
                className="self-end text-xs"
                date={new Date(createdAt)}
                locale="en-US"
              />
            }
          </span>
          <MoreVertIcon className="ml-auto" />
        </div>
        {description && (
          <span className="text-sm md:text-base">{description}</span>
        )}
        <img
          className="w-full h-full"
          src={process.env.REACT_APP_PUBLIC_PATH + image}
          alt=""
        />
        <div className="flex items-center gap-2">
          <img
            className="w-6 h-6 cursor-pointer"
            src="/assets/heart.png"
            alt=""
            onClick={likeHandler}
          />
          <img
            className="w-6 h-6 cursor-pointer"
            src="/assets/like.png"
            alt=""
            onClick={likeHandler}
          />
          <span className="text-sm">{likeCounter}</span>
          <span className="ml-auto text-sm md:text-base">
            {comment} comment
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;

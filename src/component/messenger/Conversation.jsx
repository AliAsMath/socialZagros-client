import { useEffect, useState } from "react";
import axios from "axios";

function Conversation({ conversation, currentUser }) {
  const [friendUser, setFriendUser] = useState({});

  useEffect(() => {
    const friendId = conversation.members.find(
      (memberId) => memberId !== currentUser._id
    );

    const getFriend = async () => {
      try {
        const result = await axios.get(
          process.env.REACT_APP_REQUEST_PATH + "/api/users?userId=" + friendId
        );

        setFriendUser(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFriend();
  }, [conversation, currentUser._id]);

  return (
    <li className="flex items-center ">
      <img
        className="object-cover w-8 h-8 mr-1 rounded-full sm:mr-4"
        src={
          process.env.REACT_APP_PUBLIC_PATH +
          (friendUser.profilePic
            ? friendUser.profilePic
            : "/image/noProfile.png")
        }
        alt=""
      />
      <span>{friendUser.username}</span>
    </li>
  );
}

export default Conversation;

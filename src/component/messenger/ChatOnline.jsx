import axios from "axios";
import { useEffect, useState } from "react";
import UserOnline from "./../rightbar/UserOnline";

function ChatOnline({ users, currentUser }) {
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios(
          process.env.REACT_APP_REQUEST_PATH +
            "/api/users/friends/" +
            currentUser._id
        );

        const friends = response.data;
        const allOlineUsersId = users.map((u) => u.userId);
        const onlineFriends = friends.filter((f) =>
          allOlineUsersId.includes(f._id)
        );

        setOnlineFriends(onlineFriends);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [currentUser, users]);

  return (
    <div className="sm:flex-[1] w-full h-fit flex flex-row overflow-x-auto  sm:flex-col gap-3 flex-shrink-0 p-2">
      {onlineFriends.map((onF) => (
        <UserOnline
          key={onF._id}
          username={onF.username}
          profilePicture={onF.profilePic}
        />
      ))}
    </div>
  );
}

export default ChatOnline;

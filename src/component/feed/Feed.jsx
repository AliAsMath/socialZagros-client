import Post from "./Post";
import Share from "./Share";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contex/auth-context";
import axios from "axios";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = username
          ? await axios.get(
              process.env.REACT_APP_REQUEST_PATH +
                "/api/posts/profile/" +
                username
            )
          : await axios.get(
              process.env.REACT_APP_REQUEST_PATH +
                "/api/posts/all/timeline/" +
                user._id
            );

        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="flex-[2] h-[calc(100vh-3rem)] w-full flex flex-col gap-5 md:gap-10 p-5 ">
      {(username === user.username || !username) && (
        <Share
          image={user.profilePic}
          userId={user._id}
          username={user.username}
          setPosts={setPosts}
        />
      )}
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
};

export default Feed;

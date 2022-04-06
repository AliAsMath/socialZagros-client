import Feed from "../component/feed/Feed";
import Sidebar from "../component/sidebar/Sidebar";
import Topbar from "../component/Topbar";
import Information from "../component/profile/Information";
import ProfileImage from "../component/profile/ProfileImage";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useWindowWidth } from "@react-hook/window-size";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const width = useWindowWidth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_REQUEST_PATH}/api/users?username=${username}`
      );

      setUser(response.data);
    };

    fetchUsers();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className=" flex overflow-y-scroll h-[calc(100vh-3rem)]">
        {width > 700 && <Sidebar />}
        <div className="flex flex-col flex-[3]">
          <ProfileImage user={user} />
          <div className="flex flex-col w-full vs:flex-row-reverse">
            <Information user={user} />
            <Feed username={username} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

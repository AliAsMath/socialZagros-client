import { useContext, useEffect, useState } from "react";
import ChatBox from "../component/messenger/ChatBox";
import ChatMenu from "../component/messenger/ChatMenu";
import ChatOnline from "../component/messenger/ChatOnline";
import Topbar from "../component/Topbar";
import { AuthContext } from "./../contex/auth-context";
import axios from "axios";
import { io } from "socket.io-client";
import { useWindowWidth } from "@react-hook/window-size";
import { useLocation } from "react-router-dom";

let socket;

function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({});
  const [users, setUsers] = useState([]);
  const width = useWindowWidth();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) return;
    setCurrentConversation(location.state);
  }, [location]);

  useEffect(() => {
    socket = io("https://still-falls-18802.herokuapp.com");
    socket.emit("userData", user._id);
  }, [user]);

  useEffect(() => {
    socket?.on("getUsers", (users) => setUsers(users));
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const result = await axios.get(
          process.env.REACT_APP_REQUEST_PATH + "/api/conversations/" + user._id
        );

        setConversations(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, [user._id]);

  return (
    <>
      <Topbar />
      <div className="flex relative sm:flex-row flex-col  h-[calc(100vh-3rem)] w-screen">
        <div className="sticky top-0 bg-gray-200">
          <ChatMenu
            conversations={conversations}
            setCurrentConversation={setCurrentConversation}
            currentUser={user}
          />
          {width < 600 && <ChatOnline users={users} currentUser={user} />}
        </div>
        <ChatBox
          socket={socket}
          currentConversation={currentConversation}
          currentUser={user}
        />
        {width > 600 && <ChatOnline users={users} currentUser={user} />}
      </div>
    </>
  );
}

export default Messenger;

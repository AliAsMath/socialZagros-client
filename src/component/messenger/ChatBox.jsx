import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import axios from "axios";

function ChatBox({ currentConversation, currentUser, socket }) {
  let isFetchingDataDone = useRef(false);
  const [messagesAndFriend, setMessagesAndFriend] = useState({
    messages: [],
    friend: {},
  });
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    if (!currentConversation.members) return;

    const friendId = currentConversation.members.find(
      (memberId) => memberId !== currentUser._id
    );

    const getFriendAndmessages = async () => {
      try {
        const userResult = await axios.get(
          process.env.REACT_APP_REQUEST_PATH + "/api/users?userId=" + friendId
        );

        const messagesResult = await axios.get(
          process.env.REACT_APP_REQUEST_PATH +
            "/api/messages/" +
            currentConversation._id
        );

        setMessagesAndFriend({
          messages: messagesResult.data,
          friend: userResult.data,
        });
        isFetchingDataDone.current = true;
      } catch (err) {
        console.log(err);
      }
    };
    isFetchingDataDone.current = false;
    getFriendAndmessages();
  }, [currentConversation, currentUser]);

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage(data);
    });
  }, [socket]);

  useEffect(() => {
    if (!currentConversation.members) return;
    if (!isFetchingDataDone.current) return;
    if (!currentConversation.members.includes(arrivalMessage.senderId)) return;
    setMessagesAndFriend((prevState) => {
      return {
        friend: prevState.friend,
        messages: [
          ...prevState.messages,
          {
            senderId: arrivalMessage.senderId,
            text: arrivalMessage.text,
            createdAt: Date.now(),
            _id: Date.now(),
          },
        ],
      };
    });
  }, [currentConversation, arrivalMessage, isFetchingDataDone]);

  const sendMessageHandler = async () => {
    const message = {
      conversationId: currentConversation._id,
      senderId: currentUser._id,
      text: newMessage,
    };

    socket?.emit("sendMessage", {
      senderId: message.senderId,
      receiverId: messagesAndFriend.friend._id,
      text: message.text,
    });

    try {
      const result = await axios.post(
        process.env.REACT_APP_REQUEST_PATH + "/api/messages",
        message
      );

      setMessagesAndFriend((prevState) => ({
        friend: prevState.friend,
        messages: [...prevState.messages, result.data],
      }));

      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesAndFriend.messages]);

  return (
    <div className="sm:flex-[2] w-full p-2 sm:h-full h-3/4">
      <ul className="flex flex-col gap-4 pr-2 overflow-y-auto h-3/4">
        {messagesAndFriend.messages.map((message) => (
          <div key={message._id} ref={scrollRef}>
            <Message
              own={message.senderId === currentUser._id}
              message={message}
              friend={messagesAndFriend.friend}
              currentUser={currentUser}
            />
          </div>
        ))}
      </ul>
      <div className="flex items-center gap-2 p-2 h-1/4">
        <textarea
          placeholder="Write something..."
          className="w-full p-1 border-2 rounded resize-none h-5/6 focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button
          onClick={sendMessageHandler}
          className="p-2 text-white rounded bg-emerald-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;

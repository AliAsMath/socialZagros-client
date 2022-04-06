import React from "react";
import Conversation from "./Conversation";

function ChatMenu({ conversations, currentUser, setCurrentConversation }) {
  return (
    <div className="sm:flex-[1] w-full flex flex-col items-center px-2  sm:h-full  sm:overflow-y-auto sm:sticky">
      <div className="top-0 w-full py-2 text-center sm:sticky">
        <input
          type="text"
          className="w-11/12 py-2 font-medium bg-gray-200 border-b border-gray-500 focus:outline-none"
          placeholder="Search for friends"
        />
      </div>
      <ul className="flex flex-row items-start w-full overflow-x-auto sm:flex-col">
        {conversations.map((c) => (
          <div
            className="flex items-center flex-shrink-0 p-2 rounded cursor-pointer sm:w-full hover:bg-gray-200"
            key={c._id}
            onClick={() => setCurrentConversation(c)}
          >
            <Conversation conversation={c} currentUser={currentUser} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ChatMenu;

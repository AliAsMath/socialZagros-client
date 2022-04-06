import ReactTimeAgo from "react-time-ago";

function Message(props) {
  const pic =
    process.env.REACT_APP_PUBLIC_PATH +
    (props.own
      ? props.currentUser.profilePic || "/image/noProfile.png"
      : props.friend.profilePic || "/image/noProfile.png");

  return (
    <li className={`flex w-full gap-1 ${props.own && "flex-row-reverse"}`}>
      <img src={pic} className="h-8 w-8 rounded-full" alt="" />
      <div
        className={`w-1/2 p-2 rounded-3xl  ${
          props.own ? "text-black bg-gray-300" : "text-white bg-blue-600"
        }`}
      >
        {!props.own && (
          <p className=" text-xs text-rose-300">{props.friend.username}</p>
        )}
        <p className="whitespace-pre-line">{props.message.text}</p>
      </div>

      <ReactTimeAgo
        className="text-xs self-end"
        date={new Date(props.message.createdAt)}
        locale="en-US"
      />
    </li>
  );
}

export default Message;

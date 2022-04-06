import { Link } from "react-router-dom";

const Friend = ({ username, profilePic }) => {
  return (
    <Link
      to={"/profile/" + username}
      className="md:w-[90px] w-[45px] cursor-pointer"
    >
      <img
        className="object-cover w-full md:h-[90px] h-[45px] rounded"
        src={
          profilePic
            ? process.env.REACT_APP_PUBLIC_PATH + profilePic
            : "/assets/noProfile.png"
        }
        alt=""
      />
      <p className="text-xs text-center">{username}</p>
    </Link>
  );
};

export default Friend;

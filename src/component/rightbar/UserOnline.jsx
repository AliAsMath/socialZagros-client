const UserOnline = ({ username, profilePicture }) => {
  return (
    <div className="relative flex items-center flex-shrink-0 ">
      <img
        className="object-cover w-10 h-10 mr-1 rounded-full sm:mr-4"
        src={
          process.env.REACT_APP_PUBLIC_PATH +
          (profilePicture ? profilePicture : "/image/noProfile.png")
        }
        alt=""
      />
      <span className="absolute top-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full left-7" />
      <span>{username}</span>
    </div>
  );
};

export default UserOnline;

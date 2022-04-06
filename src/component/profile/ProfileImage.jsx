const ProfileImage = ({ user }) => {
  return (
    <>
      <div className="relative w-full ">
        <img
          className="object-cover object-bottom w-full h-64 mb-12"
          src={
            user.coverPic
              ? process.env.REACT_APP_PUBLIC_PATH + user.coverPic
              : "/assets/noCover.jpg"
          }
          alt=""
        />
        <img
          className="absolute bg-white w-32 h-32 translate-x-1/2 border-4 border-white rounded-full right-1/2 top-[60%]"
          src={
            user.profilePic
              ? process.env.REACT_APP_PUBLIC_PATH + user.profilePic
              : "/assets/noProfile.png"
          }
          alt=""
        />
      </div>
      <h4 className="mt-3 text-2xl font-bold text-center">
        {user.username &&
          user.username[0].toUpperCase() + user.username.slice(1)}
      </h4>
      <p className="font-light text-center">Hello my friends</p>
    </>
  );
};

export default ProfileImage;

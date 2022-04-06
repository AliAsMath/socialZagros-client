import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../contex/auth-context";
import { useWindowWidth } from "@react-hook/window-size";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const width = useWindowWidth();

  return (
    <div className="sticky top-0 z-20 flex flex-wrap items-center w-screen h-12 gap-1 py-3 pr-1 bg-blue-500 sm:flex-nowrap">
      <div className="md:pl-5 basis-5 pl-2 lg:flex-[1] md:flex-[0.7] flex-[0.3]  shrink">
        <Link
          to="/"
          className="text-white cursor-pointer lg:text-2xl md:text-xl md:font-semibold lg:font-bold"
        >
          ZagrosSocial
        </Link>
      </div>
      <div className="w-5/12 flex-[1.7]  text-right">
        <div className="flex items-center w-full h-8 px-2 bg-white rounded-full">
          <Search className="lg:text-xl md:text-lg" />
          <input
            className="w-full text-sm border-none md:text-sm lg:text-base focus:outline-none"
            placeholder="Search for friend, post or video"
          />
        </div>
      </div>
      <div className="flex basis-24 gap-1 items-center justify-around flex-[0.1]  sm:flex-[1.2] text-white">
        <div className="flex gap-1 text-xs md:gap-2 md:text-sm ">
          <Link to="/messenger">
            <span className="cursor-pointer">Messenger</span>
          </Link>
        </div>
        {width > 600 && (
          <>
            <div className="flex items-center justify-between gap-2">
              <div className="relative cursor-pointer">
                <Person className="text-base lg:text-2xl md:text-xl" />
                <span className="absolute flex items-center justify-center lg:w-4 lg:h-4 w-2 h-2 text-[0.4rem] lg:text-xs md:h-3 md:w-3 md:text-[0.6rem] text-white rounded-full lg:-top-1 md:top-0 top-1 md:-right-1 right-0 bg-rose-600 ">
                  1
                </span>
              </div>
              <div className="relative cursor-pointer">
                <Chat className="text-base lg:text-2xl md:text-xl" />
                <span className="absolute flex items-center justify-center lg:w-4 lg:h-4 w-2 h-2 text-[0.4rem] lg:text-xs md:h-3 md:w-3 md:text-[0.6rem] text-white rounded-full lg:-top-1 md:top-0 top-1 md:-right-1 right-0 bg-rose-600 ">
                  1
                </span>
              </div>
              <div className="relative cursor-pointer">
                <Notifications className="text-base lg:text-2xl md:text-xl" />
                <span className="absolute flex items-center justify-center lg:w-4 lg:h-4 w-2 h-2 text-[0.4rem] lg:text-xs md:h-3 md:w-3 md:text-[0.6rem] text-white rounded-full lg:-top-1 md:top-0 top-1 md:-right-1 right-0 bg-rose-600 ">
                  1
                </span>
              </div>
            </div>
          </>
        )}
        <Link to={"/profile/" + user.username}>
          <img
            className="object-cover w-8 h-8 rounded-full cursor-pointer"
            src={
              user.profilePic
                ? process.env.REACT_APP_PUBLIC_PATH + user.profilePic
                : "/assets/noProfile.png"
            }
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;

import SidebarItem from "./SidebarItem";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import Contact from "./Contact";
import { Users } from "../../dummyData";

const Sidebar = () => {
  return (
    <div className="flex-[1] sticky top-0 h-[calc(100vh-3rem)] pl-4 pt-4 overflow-y-scroll">
      <ul className="flex flex-col justify-start gap-5 ">
        <SidebarItem Icon={RssFeed} title="Feed" />
        <SidebarItem Icon={Chat} title="Chats" />
        <SidebarItem Icon={PlayCircleFilledOutlined} title="Videos" />
        <SidebarItem Icon={Group} title="Groups" />
        <SidebarItem Icon={Bookmark} title="Bookmarks" />
        <SidebarItem Icon={HelpOutline} title="Questions" />
        <SidebarItem Icon={WorkOutline} title="Jobs" />
        <SidebarItem Icon={Event} title="Events" />
        <SidebarItem Icon={School} title="Courses" />
      </ul>
      <button className="p-2 my-5 border-none rounded bg-slate-300">
        Show More
      </button>
      <hr className="w-11/12 border-t-2" />
      <ul className="flex flex-col gap-3">
        {Users.map((user) => (
          <Contact key={user.id} {...user} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

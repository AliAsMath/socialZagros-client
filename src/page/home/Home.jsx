import Feed from "../../component/feed/Feed";
import Rightbar from "../../component/rightbar/Rightbar";
import Sidebar from "../../component/sidebar/Sidebar";
import Topbar from "../../component/Topbar";
import { useWindowWidth } from "@react-hook/window-size";

const Home = () => {
  const width = useWindowWidth();
  return (
    <>
      <Topbar />
      <div className="flex overflow-y-scroll h-[calc(100vh-3rem)]">
        {width > 600 && <Sidebar />}
        <Feed />
        {width > 600 && <Rightbar />}
      </div>
    </>
  );
};

export default Home;

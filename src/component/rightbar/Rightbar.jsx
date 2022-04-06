import UserOnline from "./UserOnline";
import { Users } from "../../dummyData";

const Rightbar = () => {
  return (
    <div className="flex-[1] flex flex-col h-[calc(100vh-3rem)] gap-5 py-3 pr-3">
      <div className="flex gap-2 text-sm">
        <img className="w-8 h-8 " src="/assets/gift.png" alt="" />
        <h4>
          <b>Maryam</b> and <b>3 other friends</b> have birthday today.
        </h4>
      </div>
      <img
        className="object-cover w-full rounded-xl"
        src="/assets/ad.png"
        alt=""
      />
      <div className="flex flex-col gap-3">
        <h4 className="font-bold">Online friends</h4>
        {Users.map((user) => (
          <UserOnline key={user.id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default Rightbar;

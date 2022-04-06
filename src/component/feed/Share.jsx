import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import axios from "axios";

const Share = ({ image, userId, username, setPosts }) => {
  const [file, setFile] = useState(null);
  const desc = useRef();

  const sharePostHandler = async (e) => {
    e.preventDefault();

    console.log(file);

    const fileAddressArray = file.name.split(".");
    const format = fileAddressArray[fileAddressArray.length - 1];

    const newPost = { userId, description: desc.current.value, format };

    try {
      const result = await axios.post(
        process.env.REACT_APP_REQUEST_PATH + "/api/posts",
        newPost
      );

      const data = new FormData();
      const fileName = result.data._id + "." + format;
      data.append("postIdAndImageFormat", fileName);
      data.append("file", file);

      await axios.post(
        process.env.REACT_APP_REQUEST_PATH + "/api/upload/post",
        data
      );

      setPosts((prevPosts) => [result.data, ...prevPosts]);
    } catch (err) {
      console.log(err);
    }

    setFile(null);
  };

  return (
    <div className="w-full shadow-[0px_1px_7px_0px_rgb(0,0,0,0.37)] rounded-xl md:pb-10 pb-3 p-3">
      <div className="flex items-center gap-2">
        <img
          className="object-cover w-16 h-16 rounded-full"
          src={
            process.env.REACT_APP_PUBLIC_PATH +
            (image ? image : "/image/noProfile.png")
          }
          alt=""
        />
        <input
          className="focus:outline-none"
          placeholder={`What's in your mind ${
            username && username[0].toUpperCase() + username.slice(1)
          }?`}
          type="text"
          ref={desc}
        />
      </div>
      <hr className="m-5" />
      {file && (
        <div className="relative mb-2">
          <img
            className="object-cover w-full"
            src={URL.createObjectURL(file)}
            alt=""
          />
          <Cancel
            onClick={() => setFile(null)}
            className="absolute top-0 right-0 text-gray-500 translate-x-1/2 -translate-y-1/2 cursor-pointer"
          />
        </div>
      )}
      <form
        onSubmit={sharePostHandler}
        className="flex items-center w-full md:px-5 px-2 md:text-xs sm:text-[0.5rem] vs:text-xs text-[0.6rem] gap-2 vs:gap-4 md:gap-7"
      >
        <label className="cursor-pointer " htmlFor="file">
          <PermMedia className="mr-1 lg:text-base md:text-xs sm:text-[0.5rem] vs:text-xs text-[0.6rem] text-orange-600" />
          <span>Photo or Video</span>
        </label>
        <input
          className="hidden "
          type="file"
          id="file"
          accept=".png,.jpg,.jpeg"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="">
          <Label className="mr-1 lg:text-base md:text-xs sm:text-[0.5rem] vs:text-xs text-[0.6rem] text-blue-600" />
          <span>Tag</span>
        </div>
        <div className="">
          <Room className="mr-1 lg:text-base md:text-xs sm:text-[0.5rem] vs:text-xs text-[0.6rem] text-green-600" />
          <span>Location</span>
        </div>
        <div className="">
          <EmojiEmotions className="mr-1 lg:text-base md:text-xs sm:text-[0.5rem] vs:text-xs text-[0.6rem] text-yellow-600" />
          <span>Feelings</span>
        </div>
        <button
          type="submit"
          className="p-2 ml-auto text-white bg-green-600 rounded"
        >
          Share
        </button>
      </form>
    </div>
  );
};

export default Share;

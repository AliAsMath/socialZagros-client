const Contact = ({ username, profilePicture }) => {
  return (
    <li className="flex items-center">
      <img
        className="object-cover w-8 h-8 mr-4 rounded-full"
        src={process.env.REACT_APP_PUBLIC_PATH + profilePicture}
        alt=""
      />
      <span>{username}</span>
    </li>
  );
};

export default Contact;

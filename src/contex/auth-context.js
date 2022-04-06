import { createContext, useEffect, useReducer } from "react";
import authReducer from "./authReducer";

const initState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  // {
  //   _id: "62378b65c8565465908804bf",
  //   username: "ali",
  //   email: "ali@gmail.com",
  //   password: "$2b$10$6lT1J2eFbJW8miZte6CpReaIj/motF00BFzavz0H4ezp1Msr0stQG",
  //   profilePic: "/image/person/1.jpeg",
  //   coverPic: "/image/post/1.jpeg",
  //   isAdmin: false,
  //   createdAt: { $date: { $numberLong: "1647807333852" } },
  //   updatedAt: { $date: { $numberLong: "1648153680815" } },
  //   __v: { $numberInt: "0" },
  //   description: "I come from Iran",
  //   followers: ["62378dafee204cd979bea829"],
  //   followings: ["62378dafee204cd979bea829"],
  //   city: "Iran",
  //   from: "Dorud",
  //   relationship: "Single",
  // },
  isFetching: false,
  error: "",
};

export const AuthContext = createContext(initState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

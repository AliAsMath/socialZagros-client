import Home from "./page/home/Home";
import Login from "./page/Login";
import Profile from "./page/Profile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./page/Register";
import { AuthContext } from "./contex/auth-context";
import { useContext } from "react";
import Messenger from "./page/Messenger";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace />}
        />
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useSelector } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import SignUp from "./components/SignUp";

function App() {

  const userData = useSelector((store) => store.user);
  
  return (
    <>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={userData ? <Navigate to={'/'} /> : <div className="flex justify-center items-center bg-linear-to-br from-gray-200 to-gray-50 min-h-screen"><Login /></div>} />
              <Route path="signup" element={userData ? <Navigate to={'/'} /> : <div className="flex justify-center items-center bg-linear-to-br from-gray-200 to-gray-50 min-h-screen"><SignUp /></div>} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;

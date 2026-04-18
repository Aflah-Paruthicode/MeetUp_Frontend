import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<div className="flex justify-center items-center bg-linear-to-br from-gray-200 to-gray-50 min-h-screen"><Login /></div>} />
              <Route path="signup" element={<SignUp />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
            </Route> 
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

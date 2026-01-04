import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Login from "./components/Login";
import Proffile from "./components/Proffile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/proffile" element={<Proffile />} />
              <Route path="/home" element={<div>home page</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

import "./App.css";
import Body from "./Body";
import Navbar from "./Navbar";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes >
        <Route path="/" element={<Body />} >
        <Route path="/login" element={<div>Login page</div>} />
        <Route path="/home" element={<div>home page</div>} />
        </Route>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;

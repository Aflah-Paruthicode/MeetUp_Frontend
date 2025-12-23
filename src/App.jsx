import "./App.css";
import Navbar from "./Navbar";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes >
        <Route path="/login" element={<div>Login page</div>} />
        <Route path="/home" element={<div>Login page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

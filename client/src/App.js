import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import Home from "./components/Home.js";
import CreatedDog from "./components/CreatedDog.js";
import Detail from "./components/Detail.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/dogs" element={<CreatedDog />}></Route>
        <Route path="/dogs/:id" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

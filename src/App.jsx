import { useContext, useState } from "react";
import "./App.css";
import Signup from "./p/s/signup";
import Header from "./c/h/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./p/home/home";
import ScrollToTop from "./c/s-t/scrollToTop";
import Successfull from "./p/succ/successfull";
import Not from "./p/404/not";
import { AppContext } from "./context";

function App() {
  const { success } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Header />
        <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        {success && <Route path="/success" element={<Successfull />}/>}
        <Route path="*" element={<Not />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useContext } from "react";
import "./App.css";
import Signup from "./p/s/signup";
import Header from "./c/h/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./p/home/home";
import ScrollToTop from "./c/s-t/scrollToTop";
import Successfull from "./p/succ/successfull";
import Not from "./p/404/not";
import { AppContext } from "./context";
import Admin from "./p/adminP/admin";
import Users from "./p/all-users/users";
import UserDetail from "./p/user-detail/user-detail";
import Moderators from "./p/login-moderators/moderators";

function ProtectedRoute({ element }) {
  const token = localStorage.getItem("accessToken"); // Tokenni olish
  return token ? element : <Not />; // Token yo'q bo'lsa 404 sahifasi
}

function App() {
  const { success } = useContext(AppContext);
  
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {success && <Route path="/success" element={<Successfull />} />}

        {/* Faqat token bo'lsa ochiladi, aks holda Not Found */}
        <Route path="/users-list" element={<ProtectedRoute element={<Users />} />} />
        <Route path="/users-list/:id" element={<ProtectedRoute element={<UserDetail />} />} />

        {/* Admin panel (hozircha o‘chirilgan) */}
        {/* <Route path="/admin-panel" element={<Admin />} /> */}

        <Route path="/login-moderators" element={<Moderators />} />
        <Route path="*" element={<Not />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

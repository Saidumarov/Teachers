import React from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Teachers from "../components/Teachers/Teachers";
import Students from "../components/Students/Students";
import Profile from "../components/Profile/Profile";
import TeachersAdd from "../components/TeachersAdd/TeachersAdd";
import TeachersEdit from "../components/TeachersEdit/TeachersEdit";
import StudentsEdit from "../components/StudentsEdit/StudentsEdit";
import StudentsAdd from "../components/StudentsAdd/StudentsAdd";
import LoginPanel from "../components/Login/Login";
import { useEffect, useState } from "react";

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigate();
  const parms = window.location.href;
  // login
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLogin(true);
      if (parms.includes("/login")) {
        return navigation("/");
      }
      return;
    } else {
      setIsLogin(false);
      return navigation("/login");
    }
  }, [isLogin, parms]);
  return (
    <>
      {isLogin ? <Header /> : ""}
      <Routes>
        <Route path="/" element={<Teachers />} />
        <Route path="/students" element={<Students />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginPanel login={setIsLogin} />} />
        <Route path="/teachers/add" element={<TeachersAdd />} />
        <Route path="/students/add" element={<StudentsAdd />} />
        <Route path="/teachers/edit/:id" element={<TeachersEdit />} />
        <Route path="/students/edit/:id" element={<StudentsEdit />} />
      </Routes>
    </>
  );
};

export default Router;

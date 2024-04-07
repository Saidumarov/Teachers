import { Route, Routes, useNavigate } from "react-router-dom";
import Teachers from "../components/Teachers/Teachers";
import Students from "../components/Students/Students";
import TeachersAdd from "../components/TeachersAdd/TeachersAdd";
import TeachersEdit from "../components/TeachersEdit/TeachersEdit";
import StudentsEdit from "../components/StudentsEdit/StudentsEdit";
import StudentsAdd from "../components/StudentsAdd/StudentsAdd";
import LoginPanel from "../components/Login/Login";
import { useEffect, useState } from "react";
import Sitebar from "../components/SiteBar_and_Header";
import Profile from "../components/Profile/Profile";

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
      <Routes>
        <Route path="/login" element={<LoginPanel login={setIsLogin} />} />
        <Route path="/" element={<Sitebar />}>
          <Route index element={<Teachers />} />
          <Route path="/students" element={<Students />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/teachers/add" element={<TeachersAdd />} />
          <Route path="/students/add" element={<StudentsAdd />} />
          <Route path="/teachers/edit/:id" element={<TeachersEdit />} />
          <Route path="/students/edit/:id" element={<StudentsEdit />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;

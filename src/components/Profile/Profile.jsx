import React from "react";

import "./index.scss";
import userpn from "../../assets/2.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "@mui/material";
const Profile = () => {
  const [name, setName] = useState(false);
  const [password, setpassword] = useState(false);
  const navigation = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const hendelSubmit = () => {
    if (user.name && user.password !== "") {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Updateed  user successfully");
      setUser({
        name: "",
        password: "",
      });
    } else {
      if (user.name === "") {
        setName(true);
      }
      if (user.password === "") {
        setpassword(true);
      }
    }
  };
  const hendelChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value.trim() });
    setpassword(false);
    setName(false);
  };

  const hendelLogaut = () => {
    localStorage.clear();
    navigation("/");
  };
  return (
    <div className="container">
      <div className="profil">
        <img src={userpn} alt="" />
        <div className="login">
          <Input
            type="user"
            placeholder="Name"
            required
            name="name"
            value={user.name}
            className={`input ${name ? "active" : ""}`}
            onChange={hendelChange}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={user.password}
            onChange={hendelChange}
            className={`input ${password ? "active" : ""}`}
          />
          <div className="btn">
            <Button onClick={hendelSubmit}>Update</Button>
            <Button onClick={hendelLogaut}>Logaut</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

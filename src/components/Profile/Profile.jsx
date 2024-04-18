import "./index.scss";
import userpn from "../../assets/User-avatar.svg.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "antd";
import { useFormik } from "formik";
const Profile = () => {
  const [name, setName] = useState(false);
  const [password1, setpassword] = useState(false);
  const navigation = useNavigate();

  const { values, handleChange, resetForm } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const { username, password } = values;

  const hendelSubmit = () => {
    if (username && password) {
      localStorage.setItem("user", JSON.stringify(values));
      toast.success("Updateed  user successfully");
      resetForm();
    } else {
      if (username === "") {
        setName(true);
      }
      if (password === "") {
        setpassword(true);
      }
    }
  };

  const hendelLogaut = () => {
    localStorage.clear();
    navigation("/");
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      handleChange({ target: { name: "username", value: user.username } });
      handleChange({ target: { name: "password", value: user.password } });
    }
  }, []);

  return (
    <div className="container">
      <div className="profil">
        <img src={userpn} alt="" />
        <div className="login">
          <Input
            type="user"
            placeholder="Name"
            required
            name="username"
            value={username}
            className={`input ${name ? "active" : ""}`}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={password}
            className={`input ${password1 ? "active" : ""}`}
            onChange={handleChange}
          />
          <div className="btn">
            <Button type="primary" onClick={hendelSubmit}>
              Update
            </Button>
            <Button type="primary" danger onClick={hendelLogaut}>
              Logaut
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

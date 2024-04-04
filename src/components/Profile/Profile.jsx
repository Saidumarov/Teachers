import "./index.scss";
import userpn from "../../assets/2.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "antd";
const Profile = () => {
  const [name, setName] = useState(false);
  const [password, setpassword] = useState(false);
  const navigation = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const hendelSubmit = () => {
    if (user.username && user.password) {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Updateed  user successfully");
      setUser({
        username: "",
        password: "",
      });
    } else {
      if (user.username === "") {
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
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser({
      username: user.username,
      password: user.password,
    });
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
            value={user.username}
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

import { useContext, useEffect, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button } from "antd";
import { Input, Select } from "antd";
import { Users } from "../../provider";

const TeachersAdd = () => {
  const navegate = useNavigate();
  const [users, setUsers] = useState([]);
  const { userData, setUserData } = useContext(Users);
  const [user, setUser] = useState({
    name: "",
    group: "",
    sur: "",
    level: "",
  });

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:3000/teachers").then((res) => {
        const user = res.data;
        setUsers(user);
      });
    };
    fetchData();
  }, []);

  const add = async () => {
    const newData = { ...user, id: users.length + 1 + "" };
    await axios.post("http://localhost:3000/teachers", newData).then((res) => {
      setUserData(res.data);
      navegate("/");
      toast.success("Added Teacher Success");
    });
  };
  const handelChange = (e) => {
    console.log(e.target.name);

    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <>
      <Container>
        <div className="add">
          <div className="form">
            <Input
              type="name"
              onChange={handelChange}
              placeholder="Firstname"
              id="name"
              name="name"
            />
          </div>
          <div className="form">
            <Input
              onChange={handelChange}
              type="username"
              placeholder="Surname"
              id="sur"
              name="sur"
            />
          </div>
          <div className="form">
            <Select
              name="group"
              placeholder="Group"
              onChange={(value) =>
                handelChange({ target: { name: "group", value } })
              }
            >
              <Select.Option value="N45">N45</Select.Option>
              <Select.Option value="N44">N44</Select.Option>
            </Select>
          </div>
          <div className="form">
            <Select
              placeholder="Level"
              name="level"
              onChange={(value) =>
                handelChange({ target: { name: "level", value } })
              }
            >
              <Select.Option value="senior">Senior</Select.Option>
              <Select.Option value="middle">Middle</Select.Option>
              <Select.Option value="junior">Junior</Select.Option>
            </Select>
          </div>
        </div>
        <Button
          type="primary"
          className="save"
          onClick={add}
          disabled={!user.name || !user.group || !user.sur || !user.level}
        >
          Save
        </Button>
        <Button
          type="primary"
          danger
          className="save"
          onClick={() => navegate("/")}
        >
          Close
        </Button>
      </Container>
    </>
  );
};

export default TeachersAdd;

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button, Input, Select } from "antd";
import { Users } from "../../provider";

const StudentsAdd = () => {
  const navegate = useNavigate();
  const [users, setUsers] = useState([]);
  const { userData, setUserData } = useContext(Users);
  const [user, setUser] = useState({
    name: "",
    group: "",
    sur: "",
  });

  useEffect(() => {
    const fetchData = () => {
      axios.get("https://teachersapi.onrender.com/students").then((res) => {
        const user = res.data;
        setUsers(user);
      });
    };
    fetchData();
  }, []);

  const add = async () => {
    const newData = { ...user };
    await axios
      .post("https://teachersapi.onrender.com/students", newData)
      .then((res) => {
        navegate("/students");
        toast.success("Added Student Success");
        setUserData(res.data);
      });
  };

  //
  const handelChange = (e) => {
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
        </div>
        <Button
          type="primary"
          className="save"
          onClick={add}
          disabled={!user.name || !user.group || !user.sur}
        >
          Save
        </Button>
        <Button
          type="primary"
          danger
          className="save"
          onClick={() => navegate("/students")}
        >
          Close
        </Button>
      </Container>
    </>
  );
};

export default StudentsAdd;

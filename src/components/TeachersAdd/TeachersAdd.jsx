import React from "react";

import { useEffect, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Container } from "@mui/material";

const TeachersAdd = () => {
  const navegate = useNavigate();
  const [users, setUsers] = useState([]);
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
      console.log(res.data);
      navegate("/");
      toast.success("Added Teacher Success");
    });
  };
  const handelChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handelChange1 = (e) => {
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
            <label htmlFor="name">Firstname</label>
            <input
              type="name"
              onChange={handelChange}
              placeholder="Firstname"
              id="name"
              name="name"
            />
          </div>
          <div className="form">
            <label htmlFor="sur">Surname</label>
            <input
              onChange={handelChange}
              type="username"
              placeholder="Surname"
              id="sur"
              name="sur"
            />
          </div>
          <div className="form">
            <select name="group" onChange={handelChange}>
              <option value="all">Group</option>
              <option value="N45">N45</option>
              <option value="N44">N44</option>
            </select>
          </div>
          <div className="form">
            <select name="level" onChange={handelChange1}>
              <option value="all">Level</option>
              <option value="senior">Senior</option>
              <option value="middle">Middle</option>
              <option value="junior">Junior</option>
            </select>
          </div>
        </div>
        <Button
          variant="contained"
          color="success"
          className="save"
          onClick={add}
          disabled={!user.name || !user.group || !user.sur || !user.level}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="warning"
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

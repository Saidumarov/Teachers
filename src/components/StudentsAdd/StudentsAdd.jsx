import React from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Container } from "@mui/material";

const StudentsAdd = () => {
  const navegate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    group: "",
    sur: "",
  });

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:3000/students").then((res) => {
        const user = res.data;
        setUsers(user);
      });
    };
    fetchData();
  }, []);

  const add = async () => {
    const newData = { ...user, id: users.length + 1 + "" };
    await axios.post("http://localhost:3000/students", newData).then((res) => {
      console.log(res.data);
      navegate("/students");
      toast.success("Added Student Success");
    });
  };
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
        </div>
        <Button
          variant="contained"
          color="success"
          className="save"
          onClick={add}
          disabled={!user.name || !user.group || !user.sur}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="warning"
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

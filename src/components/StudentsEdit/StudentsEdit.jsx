import React from "react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Container } from "@mui/material";

const StudentsEdit = () => {
  const navegate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    id: "",
    name: "",
    group: "",
    sur: "",
  });

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:3000/students/${id}`)
        .then((res) => {
          const user = res.data;
          setUser({
            id: user.id,
            name: user.name,
            group: user.group,
            sur: user.sur,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [id]);

  const editAdd = () => {
    navegate("/students");
    axios
      .put(`http://localhost:3000/students/${id}`, user)
      .then((res) => {
        toast.success("Edit Student Success ");
      })
      .catch((err) => {
        console.log(err);
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
              value={user.name}
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
              value={user.sur}
            />
          </div>
          <div className="form">
            <select name="group" value={user.group} onChange={handelChange}>
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
          onClick={editAdd}
          disabled={!user.name || !user.group || !user.sur}
        >
          Update
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

export default StudentsEdit;

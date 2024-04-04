import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button, Input, Select } from "antd";
import { Option } from "antd/es/mentions";

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
            <Input
              type="name"
              onChange={handelChange}
              placeholder="Firstname"
              id="name"
              name="name"
              value={user.name}
            />
          </div>
          <div className="form">
            <Input
              onChange={handelChange}
              type="username"
              placeholder="Surname"
              id="sur"
              name="sur"
              value={user.sur}
            />
          </div>
          <div className="form">
            <Select name="group" value={user.group} onChange={handelChange}>
              <Option value="all">Group</Option>
              <Option value="N45">N45</Option>
              <Option value="N44">N44</Option>
            </Select>
          </div>
        </div>
        <Button
          type="primary"
          className="save"
          onClick={editAdd}
          disabled={!user.name || !user.group || !user.sur}
        >
          Update
        </Button>
        <Button
          type="primary"
          className="save"
          danger
          onClick={() => navegate("/students")}
        >
          Close
        </Button>
      </Container>
    </>
  );
};

export default StudentsEdit;

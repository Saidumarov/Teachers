import { useContext, useEffect, useState } from "react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button, Input, Select } from "antd";
import { Users } from "../../provider";

const TeachersEdit = () => {
  const navegate = useNavigate();
  const { id } = useParams();
  const { userData, setUserData } = useContext(Users);
  const [user, setUser] = useState({
    id: "",
    name: "",
    group: "",
    sur: "",
    level: "",
  });

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`https://teachersapi.onrender.com/teachers/${id}`)
        .then((res) => {
          const user = res.data;
          setUser({
            id: user.id,
            name: user.name,
            group: user.group,
            sur: user.sur,
            level: user.level,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [id]);

  const editAdd = () => {
    navegate("/");
    axios
      .put(`https://teachersapi.onrender.com/teachers/${id}`, user)
      .then((res) => {
        toast.success("Edit Teacher Success ");
        setUserData(res.data);
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
            <Select
              name="group"
              value={user.group}
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
              name="level"
              value={user.level}
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
          onClick={editAdd}
          disabled={!user.name || !user.group || !user.sur || !user.level}
        >
          Update
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

export default TeachersEdit;

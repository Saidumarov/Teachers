import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button, Input, Select } from "antd";
import { Users } from "../../provider";

const StudentsEdit = () => {
  const navegate = useNavigate();
  const { id } = useParams();
  const { userData, setUserData } = useContext(Users);
  const [user, setUser] = useState({
    id: "",
    name: "",
    group: "",
    sur: "",
  });

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`https://teachersapi.onrender.com/students/${id}`)
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
      .put(`https://teachersapi.onrender.com/students/${id}`, user)
      .then((res) => {
        toast.success("Edit Student Success ");
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

import { useContext, useEffect, useState } from "react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button, Input, Select } from "antd";
import { useFormik } from "formik";
import { Users } from "../../provider";

const TeachersEdit = () => {
  const navegate = useNavigate();
  const { id } = useParams();

  const { setUserData } = useContext(Users);

  const { values, handleChange, setValues } = useFormik({
    initialValues: {
      name: "",
      group: "",
      sur: "",
      level: "",
    },
  });

  const { name, group, sur, level } = values;

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`https://teachersapi.onrender.com/teachers/${id}`)
        .then((res) => {
          const user = res.data;
          setValues({
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
      .put(`https://teachersapi.onrender.com/teachers/${id}`, values)
      .then((res) => {
        toast.success("Edit Teacher Success ");
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <div className="add">
          <div className="form">
            <Input
              type="name"
              onChange={handleChange}
              placeholder="Firstname"
              id="name"
              name="name"
              value={name}
            />
          </div>
          <div className="form">
            <input
              onChange={handleChange}
              type="username"
              placeholder="Surname"
              id="sur"
              name="sur"
              value={sur}
            />
          </div>
          <div className="form">
            <Select
              name="group"
              value={group}
              onChange={(value) =>
                handleChange({ target: { name: "group", value } })
              }
            >
              <Select.Option value="N45">N45</Select.Option>
              <Select.Option value="N44">N44</Select.Option>
            </Select>
          </div>
          <div className="form">
            <Select
              name="level"
              value={level}
              onChange={(value) =>
                handleChange({ target: { name: "level", value } })
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
          disabled={!name || !group || !sur || !level}
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

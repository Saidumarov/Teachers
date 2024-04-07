import { useContext, useEffect, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button } from "antd";
import { Input, Select } from "antd";
import { Users } from "../../provider";
import { useFormik } from "formik";

const TeachersAdd = () => {
  const navegate = useNavigate();
  const { userData, setUserData } = useContext(Users);

  const { values, handleChange } = useFormik({
    initialValues: {
      name: "",
      group: "",
      sur: "",
      level: "",
    },
  });

  const { name, group, sur, level } = values;

  const add = async () => {
    await axios
      .post("https://teachersapi.onrender.com/teachers", values)
      .then((res) => {
        setUserData(res.data);
        navegate("/");
        toast.success("Added Teacher Success");
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
            />
          </div>
          <div className="form">
            <Input
              onChange={handleChange}
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
                handleChange({ target: { name: "group", value } })
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
          onClick={add}
          disabled={!name || !group || !sur || !level}
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

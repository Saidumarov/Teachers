import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button, Input, Select } from "antd";
import { useFormik } from "formik";

const StudentsAdd = () => {
  const navegate = useNavigate();

  const { values, handleChange } = useFormik({
    initialValues: {
      name: "",
      group: "",
      sur: "",
    },
  });

  const { name, group, sur } = values;

  const add = async () => {
    await axios
      .post("https://teachersapi.onrender.com/students", values)
      .then((res) => {
        navegate("/students");
        toast.success("Added Student Success");
      });
  };

  //

  console.log(values);
  return (
    <>
      <Container>
        <div className="add">
          <div className="form">
            <Input
              type="name"
              placeholder="Firstname"
              id="name"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="form">
            <Input
              type="username"
              placeholder="Surname"
              id="sur"
              name="sur"
              onChange={handleChange}
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
        </div>
        <Button
          type="primary"
          className="save"
          onClick={add}
          disabled={!name || !group || !sur}
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

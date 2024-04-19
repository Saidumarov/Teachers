import { useContext } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button, Input, Select } from "antd";
import { useForm } from "react-hook-form";
import { Users } from "../../provider";

const TeachersAdd = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(Users);
  const { handleSubmit, setValue, getValues } = useForm();

  // Form submission handler
  const onSubmit = async () => {
    const data = getValues();
    try {
      await axios
        .post("https://teachersapi.onrender.com/teachers", data)
        .then((res) => {
          setUserData(res.data);
        });
      toast.success("Added Teacher Success");
      navigate("/");
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="add">
          <div className="form">
            <Input
              type="text"
              onChange={(e) => setValue("name", e.target.value)}
              placeholder="Firstname"
              name="name"
              required
            />
          </div>
          <div className="form">
            <Input
              type="text"
              onChange={(e) => setValue("sur", e.target.value)}
              placeholder="Surname"
              name="sur"
              required
            />
          </div>
          <div className="form">
            <Select
              name="group"
              placeholder="Group"
              onChange={(value) => setValue("group", value)}
            >
              <Select.Option value="N45">N45</Select.Option>
              <Select.Option value="N44">N44</Select.Option>
            </Select>
          </div>
          <div className="form">
            <Select
              placeholder="Level"
              name="level"
              onChange={(value) => setValue("level", value)}
            >
              <Select.Option value="senior">Senior</Select.Option>
              <Select.Option value="middle">Middle</Select.Option>
              <Select.Option value="junior">Junior</Select.Option>
            </Select>
          </div>
        </div>
        <Button type="primary" className="save" htmlType="submit">
          Save
        </Button>
        <Button
          type="primary"
          danger
          className="save"
          onClick={() => navigate("/")}
        >
          Close
        </Button>
      </form>
    </Container>
  );
};

export default TeachersAdd;

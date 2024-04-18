import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button, Input, Select } from "antd";
import { Users } from "../../provider";
import { useForm } from "react-hook-form";

const StudentsAdd = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(Users);
  const { handleSubmit, setValue, getValues } = useForm();

  // Form submission handler
  const onSubmit = async () => {
    const data = getValues();
    try {
      await axios.post("http://localhost:3000/students", data).then((res) => {
        setUserData(res.data);
      });
      toast.success("Added Student Success");
      navigate("/students");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <>
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
          </div>
          <Button type="primary" className="save" htmlType="submit">
            Save
          </Button>
          <Button
            type="primary"
            danger
            className="save"
            onClick={() => navigate("/students")}
          >
            Close
          </Button>
        </form>
      </Container>
    </>
  );
};

export default StudentsAdd;

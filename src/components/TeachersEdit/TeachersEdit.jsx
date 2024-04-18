import { useContext, useEffect } from "react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button, Input, Select } from "antd";
import { useForm } from "react-hook-form";
import { Users } from "../../provider";

const TeachersEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setUserData } = useContext(Users);

  const { handleSubmit, setValue, register } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/teachers/${id}`
        );
        const { name, group, sur, level } = response.data;
        setUserData(response.data);
        setValue("name", name);
        setValue("group", group);
        setValue("sur", sur);
        setValue("level", level);
        setValue("id", id);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };
    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios
        .put(`http://localhost:3000/teachers/${id}`, data)
        .then((res) => {
          setUserData(res.data);
        });
      toast.success("Edit Teacher Success ");
      navigate("/");
    } catch (error) {
      console.error("Error editing teacher:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="add">
          <div className="form">
            <input
              type="text"
              placeholder="Firstname"
              name="name"
              {...register("name", { required: true })}
            />
          </div>
          <div className="form">
            <input
              type="text"
              placeholder="Surname"
              name="sur"
              {...register("sur", { required: true })}
            />
          </div>
          <div className="form">
            <select
              placeholder="Group"
              name="group"
              {...register("group", { required: true })}
            >
              <option value="N45">N45</option>
              <option value="N44">N44</option>
            </select>
          </div>
          <div className="form">
            <select
              placeholder="Level"
              name="level"
              {...register("level", { required: true })}
            >
              <option value="senior">Senior</option>
              <option value="middle">Middle</option>
              <option value="junior">Junior</option>
            </select>
          </div>
        </div>
        <Button type="primary" className="save" htmlType="submit">
          Update
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

export default TeachersEdit;

import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button } from "antd";
import { Users } from "../../provider";
import { useForm } from "react-hook-form";

const StudentsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setUserData } = useContext(Users);
  const { handleSubmit, setValue, register } = useForm();
  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/students/${id}`
        );
        const { name, group, sur } = response.data;
        setUserData(response.data);
        setValue("name", name);
        setValue("group", group);
        setValue("sur", sur);
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
        .put(`http://localhost:3000/students/${id}`, data)
        .then((res) => {
          setUserData(res.data);
        });
      toast.success("Edit Student Success ");
      navigate("/students");
    } catch (error) {
      console.error("Error editing teacher:", error);
    }
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="add">
            <div className="form">
              <input
                type="name"
                placeholder="Firstname"
                id="name"
                name="name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form">
              <input
                type="username"
                placeholder="Surname"
                id="sur"
                name="sur"
                {...register("sur", { required: true })}
              />
            </div>
            <div className="form">
              <select name="group" {...register("group", { required: true })}>
                <option value="N45">N45</option>
                <option value="N44">N44</option>
              </select>
            </div>
          </div>
          <Button type="primary" className="save" htmlType="submit">
            Update
          </Button>
          <Button
            type="primary"
            className="save"
            danger
            onClick={() => navigate("/students")}
          >
            Close
          </Button>
        </form>
      </Container>
    </>
  );
};

export default StudentsEdit;

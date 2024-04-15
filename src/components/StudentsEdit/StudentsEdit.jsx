import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { Button, Input, Select } from "antd";
import { useFormik } from "formik";
import { Users } from "../../provider";

const StudentsEdit = () => {
  const navegate = useNavigate();
  const { id } = useParams();
  const { setUserData } = useContext(Users);

  const { values, handleChange, setValues } = useFormik({
    initialValues: {
      name: "",
      group: "",
      sur: "",
    },
  });

  const { name, group, sur } = values;
  //
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`https://teachersapi.onrender.com/students/${id}`)
        .then((res) => {
          const user = res.data;
          setValues({
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

  console.log(values);

  const editAdd = () => {
    navegate("/students");
    axios
      .put(`https://teachersapi.onrender.com/students/${id}`, values)
      .then((res) => {
        toast.success("Edit Student Success ");
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
            <Input
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
        </div>
        <Button
          type="primary"
          className="save"
          onClick={editAdd}
          disabled={!name || !group || !sur}
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

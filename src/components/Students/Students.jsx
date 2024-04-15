import { Container } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Edit, { Delete } from "../../constants";
import { toast } from "react-toastify";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { Button, Input, Select } from "antd";
import LoadingProduct from "../../loading";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../redux/actions/studentsActions";
import { Users } from "../../provider";
export default function Students() {
  const navegate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useContext(Users);
  const { students, loading, error } = useSelector((state) => state.students);
  const [data, setData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  // pagenation function
  const startOffset = itemOffset;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(startOffset, endOffset);
  const pageCount = Math.ceil(data?.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    const newOffset = selectedPage * itemsPerPage;
    setItemOffset(newOffset);
  };

  //  Delete the Student
  const deleteAdd = (id) => {
    if (window.confirm("Delete Student ")) {
      axios
        .delete(`https://teachersapi.onrender.com/students/${id}`)
        .then((res) => {
          toast.success("Delete Student Success ");
          dispatch(fetchStudents());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //  Edit the Student
  const edit = (id) => {
    navegate(`/students/edit/${id}`);
  };

  //  Filter functions
  const { values, handleChange } = useFormik({
    initialValues: {
      search: "",
      group: "all",
    },
  });

  const { search, group } = values;

  useEffect(() => {
    let v = search && search.toLowerCase();
    let filteredData = students;

    if (v) {
      filteredData = filteredData.filter(
        (el) =>
          el.name.toLowerCase().includes(v) ||
          el.sur.toLowerCase().includes(v) ||
          el.group.toLowerCase().includes(v)
      );
    }

    if (group !== "all") {
      filteredData = filteredData.filter((el) => el.group === group);
    }

    setData(filteredData);
  }, [search, group]);

  // fetch data
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch, userData]);

  useEffect(() => {
    if (students.length > 0) {
      setData(students);
    }
  }, [students]);

  return (
    <Container>
      {loading ? <LoadingProduct /> : null}

      <div className="container">
        <div className="filter">
          <div className="input">
            <Input
              type="text"
              placeholder="Search..."
              style={{ height: "50px" }}
              allowClear
              name="search"
              onChange={handleChange}
            />
          </div>
          <div className="filter_item">
            <Select
              value={group}
              placeholder="Group"
              name="group"
              onChange={(value) =>
                handleChange({ target: { name: "group", value } })
              }
            >
              <Select.Option value="all">Group</Select.Option>
              <Select.Option value="N45">N45</Select.Option>
              <Select.Option value="N44">N44</Select.Option>
            </Select>
          </div>
          <Button
            id="addT"
            className="addT"
            type="primary"
            onClick={() => navegate("/students/add")}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="tabel">
        <div className="tr">
          <p>#</p>
          <p>First</p>
          <p>Last</p>
          <p>Group</p>
          <p>Action</p>
        </div>
        {currentItems && currentItems
          ? currentItems?.map((el, index) => (
              <div className="tr1" key={index}>
                <p>{index + 1}</p>
                <p>{el?.name}</p>
                <p>{el?.sur}</p>
                <p> {el?.group} </p>
                <p>
                  <Button
                    type="primary"
                    className="edit"
                    onClick={() => edit(el?.id)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    type="primary"
                    danger
                    className="delete"
                    onClick={() => deleteAdd(el?.id)}
                  >
                    <Delete />
                  </Button>
                </p>
              </div>
            ))
          : ""}
      </div>
      <div className="pagenation">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<GrNext />}
          onPageChange={({ selected }) => handlePageClick(selected)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<GrPrevious />}
          marginPagesDisplayed={2}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </Container>
  );
}

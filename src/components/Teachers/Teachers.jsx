import { Container } from "@mui/material";
import { Button } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Edit, { Delete } from "../../constants";
import { toast } from "react-toastify";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import "./index.scss";
import { Input, Select } from "antd";
import { Users } from "../../provider";
import LoadingProduct from "../../loading";
import { useFormik } from "formik";
export default function Teachers() {
  const navegate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const { userData, setUserData } = useContext(Users);
  const [isloading, setIsLoading] = useState(true);
  const itemsPerPage = 5;
  //
  const fetchData = () => {
    axios.get("https://teachersapi.onrender.com/teachers").then((res) => {
      const data = res.data;
      setData(data);
      setData1(data);
      setIsLoading(false);
    });
  };

  //
  useEffect(() => {
    fetchData();
  }, [userData]);

  //

  // pagenation function
  const startOffset = itemOffset;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(startOffset, endOffset);
  const pageCount = Math.ceil(data?.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    const newOffset = selectedPage * itemsPerPage;
    setItemOffset(newOffset);
  };

  const deleteAdd = (id) => {
    if (window.confirm("Delete Teacher ?")) {
      axios
        .delete(`https://teachersapi.onrender.com/teachers/${id}`)
        .then((res) => {
          toast.success("Delete Teacher Success ");
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const edit = (id) => {
    navegate(`/teachers/edit/${id}`);
  };

  const { values, handleChange } = useFormik({
    initialValues: {
      search: "",
      group: "all",
      level: "all",
    },
  });

  const { search, group, level } = values;

  useEffect(() => {
    let filteredData = data1;

    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredData = filteredData.filter(
        (el) =>
          el.name.toLowerCase().includes(lowerSearch) ||
          el.sur.toLowerCase().includes(lowerSearch) ||
          el.group.toLowerCase().includes(lowerSearch)
      );
    }

    if (group !== "all") {
      filteredData = filteredData.filter((el) => el.group === group);
    }

    if (level !== "all") {
      filteredData = filteredData.filter((el) => el.level === level);
    }

    setData(filteredData);
  }, [search, group, level]);

  return (
    <Container>
      {isloading ? <LoadingProduct /> : null}
      <div className="container">
        <div className="filter">
          <div className="input">
            <Input
              type="text"
              placeholder="Search..."
              variant="outlined"
              style={{ height: "50px" }}
              allowClear
              name="search"
              onChange={handleChange}
            />
          </div>
          <div className="filter_item">
            <Select
              placeholder="Group"
              value={group}
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
          <div className="filter_item" id="filter">
            <Select
              placeholder="Level"
              value={level}
              name="level"
              onChange={(value) =>
                handleChange({ target: { name: "level", value } })
              }
            >
              <Select.Option value="all">Level</Select.Option>
              <Select.Option value="senior">Senior</Select.Option>
              <Select.Option value="middle">Middle</Select.Option>
              <Select.Option value="junior">Junior</Select.Option>
            </Select>
          </div>
          <Button
            id="addT1"
            className="addT"
            type="primary"
            onClick={() => navegate("/teachers/add")}
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
          <p>Level</p>
          <p>Action</p>
        </div>
        {currentItems && currentItems
          ? currentItems?.map((el, index) => (
              <div className="tr1" key={index}>
                <p>{index + 1}</p>
                <p>{el?.name}</p>
                <p>{el?.sur}</p>
                <p> {el?.group} </p>
                <p> {el?.level} </p>
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

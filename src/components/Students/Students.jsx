import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Edit, { Delete } from "../../constants";
import { toast } from "react-toastify";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { Button, Input, Select } from "antd";
import LoadingProduct from "../../loading";
import { useFormik } from "formik";
export default function Students() {
  const navegate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [grup, setGrup] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const itemsPerPage = 5;
  //
  const fetchData = () => {
    axios.get("https://teachersapi.onrender.com/students").then((res) => {
      const data = res.data;
      setData(data);
      setData1(data);
      setIsLoading(false);
    });
  };

  //

  useEffect(() => {
    fetchData();
  }, []);

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

  //

  const deleteAdd = (id) => {
    if (window.confirm("Delete Student ")) {
      axios
        .delete(`https://teachersapi.onrender.com/students/${id}`)
        .then((res) => {
          toast.success("Delete Student Success ");
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const edit = (id) => {
    navegate(`/students/edit/${id}`);
  };

  const { values, handleChange } = useFormik({
    initialValues: {
      search: "",
      group: "all",
    },
  });

  const { search, group } = values;

  useEffect(() => {
    let v = search && search.toLowerCase();
    let filteredData = data1;

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

  return (
    <Container>
      {isloading ? <LoadingProduct /> : null}

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

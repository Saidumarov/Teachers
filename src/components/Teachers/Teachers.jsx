import { Container } from "@mui/material";
import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Edit, { Delete } from "../../constants";
import { toast } from "react-toastify";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import "./index.scss";
import { Input, Select } from "antd";

export default function Teachers() {
  const navegate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [grup, setGrup] = useState();
  const [level, setLevel] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  //
  const fetchData = () => {
    axios.get("http://localhost:3000/teachers").then((res) => {
      const data = res.data;
      setData(data);
      setData1(data);
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

  const handleChange = (value) => {
    setGrup(value);
    console.log(value);
    let newperson = data1?.filter((el) => {
      return value === "all" ? el : el?.group === value;
    });
    setData(newperson);
  };
  //
  const handleChange1 = (value) => {
    setLevel(value);
    let newperson = data1?.filter((el) => {
      return value === "all" ? el : el?.level === value;
    });
    setData(newperson);
  };

  const deleteAdd = (id) => {
    if (window.confirm("Delete Teacher ?")) {
      axios
        .delete(`http://localhost:3000/teachers/${id}`)
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

  const search = (value) => {
    let v = value.toLowerCase();
    let search = data1?.filter((el) => {
      return (
        el?.name?.toLowerCase().includes(v) ||
        el?.sur?.toLowerCase().includes(v) ||
        el?.group?.toLowerCase().includes(v)
      );
    });
    setData(search);
  };
  return (
    <Container>
      <div className="container">
        <div className="filter">
          <div className="input">
            <Input
              type="text"
              placeholder="Search..."
              variant="outlined"
              style={{ height: "50px" }}
              allowClear
              onChange={(e) => search(e.target.value)}
            />
          </div>
          <div className="filter_item">
            <Select placeholder="Group" value={grup} onChange={handleChange}>
              <Select.Option value="all">Group</Select.Option>
              <Select.Option value="N45">N45</Select.Option>
              <Select.Option value="N44">N44</Select.Option>
            </Select>
          </div>
          <div className="filter_item" id="filter">
            <Select placeholder="Level" value={level} onChange={handleChange1}>
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

import React from "react";

import { Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Edit, { Delete } from "../../constants";
import { toast } from "react-toastify";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import "./index.scss";
export default function Students() {
  const navegate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [grup, setGrup] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  //
  const fetchData = () => {
    axios.get("http://localhost:3000/students").then((res) => {
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

  const handleChange = (event) => {
    let value = event.target.value;
    setGrup(value);
    let newperson = data1?.filter((el) => {
      return value === "all" ? el : el?.group === value;
    });
    setData(newperson);
  };

  const deleteAdd = (id) => {
    if (window.confirm("Delete Student ")) {
      axios
        .delete(`http://localhost:3000/students/${id}`)
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
            <TextField
              type="text"
              label="Search"
              variant="outlined"
              onChange={(e) => search(e.target.value)}
            />
          </div>
          <div className="filter_item">
            <select value={grup} onChange={handleChange}>
              <option value="all">Group</option>
              <option value="N45">N45</option>
              <option value="N44">N44</option>
            </select>
          </div>
          <Button
            id="addT"
            className="addT"
            variant="contained"
            color="success"
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
                  <button className="edit" onClick={() => edit(el?.id)}>
                    <Edit />
                  </button>
                  <button className="delete" onClick={() => deleteAdd(el?.id)}>
                    <Delete />
                  </button>
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

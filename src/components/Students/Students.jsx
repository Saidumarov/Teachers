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
import { Users } from "../../provider";
export default function Students() {
  const navegate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const { userData, setUserData } = useContext(Users);
  const [grup, setGrup] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
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

  //

  const handelChange = (event) => {
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
            <Input
              type="text"
              placeholder="Search..."
              style={{ height: "50px" }}
              allowClear
              onChange={(e) => search(e.target.value)}
            />
          </div>
          <div className="filter_item">
            <Select
              value={grup}
              placeholder="Group"
              onChange={(value) =>
                handelChange({ target: { name: "group", value } })
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

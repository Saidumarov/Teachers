import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { PiStudentLight } from "react-icons/pi";
import { ImProfile } from "react-icons/im";
import { Avatar } from "antd";
import { GiTeacher } from "react-icons/gi";
const { Header, Sider, Content } = Layout;
const Sitebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const herf = window.location.pathname;
  const [text, setText] = useState();
  const root = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    if (herf == "/") {
      setText("Teachers");
    }
    if (herf == "/students") {
      setText("Students");
    }
    if (herf == "/profile") {
      setText("Profile");
    }
    if (herf == "/teachers/add") {
      setText("Add Teacher");
    }
    if (herf == "/students/add") {
      setText("Add Student");
    }
    if (herf.includes("/teachers/edit")) {
      setText("Edit Teacher");
    }
    if (herf.includes("/students/edit")) {
      setText("Edit Student");
    }
  }, [herf]);
  const sitebar = [
    {
      title: "Teachers",
      key: "/",
      label: "Teachers",
      icon: <GiTeacher />,
    },
    {
      title: "Students",
      key: "/students",
      label: "Students",
      icon: <PiStudentLight />,
    },
    {
      title: "Profile",
      key: "/profile",
      label: "Profile",
      icon: <ImProfile />,
    },
  ];

  return (
    <Layout>
      <Sider className="home" trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={sitebar}
          onClick={(e) => root(e.key)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "100px",
          }}
          className="header"
        >
          <div className="flex">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <h2>{text}</h2>
          </div>
          <Avatar size={40} icon={<UserOutlined />} />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sitebar;

import { Button, Form, Input } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserLarge } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";

const LoginPanel = ({ login }) => {
  const navigation = useNavigate();

  const onFinish = (values) => {
    localStorage.setItem("users", JSON.stringify(values));
    toast.success("User saved successfully");
    navigation("/");
    login(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login_p">
      <div className="container">
        <div className="login">
          <div className="login_item">
            <p>Login</p>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={<FaUserLarge />}
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<RiLockPasswordLine />}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPanel;

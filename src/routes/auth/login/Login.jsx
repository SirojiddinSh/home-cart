import { Button, Form, Input, Divider } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../../../api";
import TelegramLoginButton from "telegram-login-button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const navigate = useNavigate();
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            dispatch({ type: "LOADING" });
            const { data } = await axios.post("/auth/login", values);
            dispatch({
                type: "LOGIN",
                token: data.payload.token,
                user: data.payload.user,
            });
            if (data?.payload?.token) {
                toast.success("Login successful!");
                navigate("/dashboard");
            }
        } catch (error) {
            dispatch({ type: "ERROR" });
            toast.error(
                error.response.data.msg ||
                    "Something went wrong. Please try again."
            );
        }

        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        toast.error("Login failed! Please try again.");
    };

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 24,
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
                <h1
                    style={{
                        textAlign: "center",
                        fontSize: "40px",
                        marginBottom: "10px",
                    }}
                >
                    Login
                </h1>
                <Form.Item
                    style={{ marginBottom: "5px" }}
                    label="Username"
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
                    style={{ marginBottom: "15px" }}
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password
                        style={{
                            marginBottom: "10px",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    style={{ width: "100%" }}
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Button
                        disabled={loading}
                        style={{ width: "100%" }}
                        type="primary"
                        htmlType="submit"
                    >
                        Login
                    </Button>
                    <Divider
                        style={{
                            fontSize: "17px",
                            marginBottom: "10px",
                            fontWeight: "600",
                            color: "gray",
                        }}
                    >
                        Or
                    </Divider>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "15px",
                        }}
                    >
                        <GoogleLogin
                            disabled={loading}
                            onSuccess={async (credentialResponse) => {
                                const decode =
                                    credentialResponse.credential.split(".")[1];
                                const userData = JSON.parse(atob(decode));
                                const user = {
                                    username: userData.email,
                                    password: userData.sub,
                                    first_name: userData.name,
                                };
                                try {
                                    const { data } = await axios.post(
                                        "/auth/login",
                                        user
                                    );
                                    console.log(data);
                                    dispatch({
                                        type: "LOGIN",
                                        token: data.payload.token,
                                        user: data.payload.user,
                                    });
                                    toast.success("Login successful!");
                                } catch (error) {
                                    dispatch({ type: "ERROR" });
                                    toast.error(
                                        "Google login failed! Please try again."
                                    );
                                }
                            }}
                            onError={() => {
                                console.log("Login Failed");
                                toast.error("Google login failed!");
                            }}
                            useOneTap
                        />
                        <TelegramLoginButton
                            telegramAuthUrl="https://7oy-4-dars.vercel.app"
                            disabled={loading}
                            botName="Frontend_4_dars_bot"
                            dataOnauth={async (user) => {
                                console.log(user);
                                try {
                                    if (user.username || user.id) {
                                        const user2 = {
                                            username: user.username || user.id,
                                            password: user.id,
                                            first_name:
                                                user.first_name || "Unknown",
                                            photo_url: user.photo_url || "",
                                        };
                                        const response = await axios.post(
                                            "/auth",
                                            user2
                                        );
                                        console.log(response.data);
                                        navigate("/dashboard");
                                    } else {
                                        throw new Error(
                                            "Telegram login credential is undefined"
                                        );
                                    }
                                } catch (error) {
                                    console.error(
                                        "Telegram login failed:",
                                        error.config.data
                                    );
                                    toast.error(
                                        "Telegram login failed! Please try again."
                                    );
                                }
                            }}
                        />
                    </div>
                </Form.Item>
                <p>
                    Don't have an account?{" "}
                    <NavLink to="/auth/register" style={{ color: "blue" }}>
                        Register
                    </NavLink>
                </p>
            </Form>
        </>
    );
};

export default Login;

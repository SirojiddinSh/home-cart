import { Button, notification, Table } from "antd";
import useFetch from "../../../../hooks/useFetch";
import axios from "../../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
    const [data, isLoading] = useFetch("/admin/registered-users");
    const columns = [
        {
            title: "Firstname",
            dataIndex: "first_name",
        },
        {
            title: "Username",
            dataIndex: "username",
        },
        {
            title: "Date",
            dataIndex: "registeredAt",
        },
        {
            title: "Actions",
            render: (user) => (
                <Button onClick={() => handlePromoteUser(user)} type="primary">
                    Promote
                </Button>
            ),
        },
    ];

    const handlePromoteUser = (user) => {
        try {
            const response = axios.post("/admin/add-admin", {
                username: user.username,
            });
            if (response.status == 200) {
                toast.success("User promoted successfully");
                console.log(response);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to promote user");
        }
    };

    return (
        <Table
            rowKey={(row) => row._id}
            columns={columns}
            dataSource={data}
            loading={isLoading}
        />
    );
};

export default Users;

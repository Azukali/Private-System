import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import {
  UnorderedListOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (idItem) => {
        return <b>{idItem}</b>;
      },
      description: {},
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      description: {},
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              onClick={() => {
                confirmMethod(item);
              }}
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              style={{ marginRight: "1vw" }}
            ></Button>
            <Button
              type="primary"
              shape="circle"
              icon={<UnorderedListOutlined />}
            ></Button>
          </div>
        );
      },
    },
  ];

  const confirmMethod = (item) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteMethod(item);
      },
      onCancel() {},
    });
  };

  const deleteMethod = (item) => {
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:8000/roles/${item.id}`);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/roles").then((res) => {
      console.log(res.data);
      setDataSource(res.data);
    });
  }, []);

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>
    </div>
  );
}

export default RoleList;

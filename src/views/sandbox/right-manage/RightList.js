import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Modal } from "antd";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

const { confirm } = Modal;

function RightList() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/rights?_embed=children").then((res) => {
      const list = res.data;
      list[0].children = "";
      setDataSource(list);
    });
  }, []);

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
      title: "权限名称",
      dataIndex: "title",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (keyItem) => {
        return <Tag color="gold">{keyItem}</Tag>;
      },
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
              icon={<EditOutlined />}
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
      // content: "Some descriptions",
      onOk() {
        // console.log("OK");
        deleteMethod(item);
      },
      onCancel() {
        // console.log("Cancel");
      },
    });
  };

  const deleteMethod = (item) => {
    // console.log(item);
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    axios.patch(`http://localhost:8000/posts/${item.id}`);
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      />
      ;
    </div>
  );
}

export default RightList;

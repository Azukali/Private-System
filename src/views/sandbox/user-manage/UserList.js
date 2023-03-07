import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Switch } from "antd";
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
    axios.get("http://localhost:8000/users?_expand=role").then((res) => {
      const list = res.data;
      console.log(list);
      setDataSource(list);
    });
  }, []);

  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      render: (region) => {
        return <b>{region === "" ? "全球" : region}</b>;
      },
      description: {},
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => {
        return role.roleName;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render: (roleState,item) => {
       return <Switch checked={roleState} disabled={item.default} onChange={() => {
        switchMethod(item);
      }}></Switch>;
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
              disabled={item.default}
            ></Button>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.default}
            ></Button>
          </div>
        );
      },
    },
  ];

  const switchMethod = (item) => {
    item.roleState = item.roleState === true ? false : true;
    setDataSource([...dataSource]);
    axios.patch(`http://localhost:8000/users/${item.id}`, {
      roleState: item.roleState,
      });
  };

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
    console.log(item);
  };

  //

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        rowKey={(item) => item.id}
      />
    </div>
  );
}

export default RightList;

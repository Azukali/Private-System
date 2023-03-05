import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Modal, Popover, Switch } from "antd";
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
      list.forEach((item) => {
        if (item.children.length === 0) {
          item.children = "";
        }
      });
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
            <Popover
              content={
                <div style={{ textAlign: "center" }}>
                  <Switch
                    checked={item.pagepermisson}
                    onChange={() => {
                      switchMethod(item);
                    }}
                  />
                </div>
              }
              title="配置项"
              trigger={item.pagepermisson === undefined ? "" : "hover"}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                disabled={item.pagepermisson === undefined}
              ></Button>
            </Popover>
          </div>
        );
      },
    },
  ];

  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
    setDataSource([...dataSource]);
    if (item.grade === 1) {
      axios.patch(`http://localhost:8000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    } else {
      axios.patch(`http://localhost:8000/children/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    }
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
    if (item.grade === 1) {
      setDataSource(dataSource.filter((data) => data.id !== item.id));
      axios.delete(`http://localhost:8000/rights/${item.id}`);
    } else {
      let list = dataSource.filter((data) => data.id === item.rightId); //  rightId找到上一级
      console.log(list);
      list[0].children = list[0].children.filter((data) => data.id !== item.id); // 对比出当前点击项除外的 其他项
      console.log(list);
      setDataSource([...dataSource]); // 重新渲染
      axios.delete(`http://localhost:8000/children/${item.id}`);
    }
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
      />
      ;
    </div>
  );
}

export default RightList;

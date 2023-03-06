import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Tree } from "antd";
import {
  UnorderedListOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

function RoleList() {
  const [dataSource, setDataSource] = useState([]); // 角色列表数据
  const [rightList, setRightList] = useState([]); // 权限列表数据
  const [currentRights, setCurrentRights] = useState([]); // 当前选中的权限列表数据
  const [currenID, setCurrenID] = useState(0); // 当前选中的角色 ID
  const [isModalOpen, setIsModalOpen] = useState(false); // 是否打开权限设置模态框

  const changeCurrentRights = (item) => {// 更新当前角色的权限列表
    setCurrentRights(item.rights);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setDataSource(
      dataSource.map((item) => {
        if (item.id === currenID) {
          return {
            ...item,
            rights: currentRights,
          };
        }
        return item;
      })
    );

    axios.patch(`http://localhost:8000/roles/${currenID}`, {
      rights: currentRights,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
    setCurrentRights(selectedKeys);
  };
  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
    setCurrentRights(checkedKeys);
  };

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
        console.log(item);
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
              onClick={() => {
                showModal();
                changeCurrentRights(item);
                setCurrenID(item.id);
              }}
            ></Button>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Tree
                checkable
                onSelect={onSelect}
                onCheck={onCheck}
                checkedKeys={currentRights}
                treeData={rightList}
                checkStrictly={true}
              />
            </Modal>
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
      setDataSource(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/rights?_embed=children").then((res) => {
      setRightList(res.data);
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

import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SmileOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Avatar, Dropdown, message, Space } from "antd";
import { useState } from "react";
const { Header } = Layout;

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);

  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }

  return (
    <Header style={{ paddingLeft: "20px", background: "#fff" }}>
      {collapsed ? (
        <MenuUnfoldOutlined onClick={toggleCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={toggleCollapsed} />
      )}
      <span style={{ float: "right" }}>
        <Dropdown
          menu={{
            items,
          }}
        >
          <Space>
            <Avatar
              size="default"
              icon={<UserOutlined />}
              style={{ marginRight: "8px" }}
            ></Avatar>
            欢迎Admin回来
            <DownOutlined />
          </Space>
        </Dropdown>
      </span>
    </Header>
  );
}

export default TopHeader;

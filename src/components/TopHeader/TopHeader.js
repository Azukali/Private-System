import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useState } from "react";
const { Header } = Layout;

function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);

  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }

  return (
    <Header style={{ padding: 0 }}>
      {collapsed ? (
        <MenuUnfoldOutlined onClick={toggleCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={toggleCollapsed} />
      )}
    </Header>
  );
}

export default TopHeader;

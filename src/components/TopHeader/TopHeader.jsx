import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
const { Header, Sider, Content } = Layout;

function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Header
      style={{
        padding: 0,
      }}
    >
      {collapsed ? MenuUnfoldOutlined : MenuFoldOutlined}
    </Header>
  );
}

export default TopHeader;

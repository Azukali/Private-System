import React, { useState, useEffect } from "react";
import { Menu,Layout } from "antd";
import {
  SettingOutlined,
} from "@ant-design/icons";
import "./SideMenu.css";
import "antd/dist/reset.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
const { SubMenu } = Menu;
const { Sider } = Layout;

const menuList = [
  {
    key: "/home",
    title: "首页",
    icon: <SettingOutlined />,
  },
  {
    key: "/user-manage",
    title: "用户管理",
    icon: <SettingOutlined />,
    children: [
      {
        key: "/user-manage/list",
        title: "用户列表",
        icon: <SettingOutlined />,
      },
    ],
  },
  {
    key: "/right-manage",
    title: "权限管理",
    icon: <SettingOutlined />,
    children: [
      {
        key: "/right-manage/role/list",
        title: "角色列表",
        icon: <SettingOutlined />,
      },
      {
        key: "/right-manage/right/list",
        title: "权限列表",
        icon: <SettingOutlined />,
      },
    ],
  },
];

// submenu keys of first level

function SideMenu(props) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/rights?_embed=children").then((res) => {
      console.log(res.data);
      setMenu(res.data);
    });
  }, []);

  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={() => {
            props.history.push(item.key);
          }}
        >
          {item.title}
        </Menu.Item>
      );
    });
  };

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo">News</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["3"]}>
        {renderMenu(menuList)}
      </Menu>
    </Sider>
  );
}

export default withRouter(SideMenu);

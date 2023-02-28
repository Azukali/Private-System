import React, { useState, useEffect } from "react";
import { Menu, Layout } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import "./SideMenu.css";
import "antd/dist/reset.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
const { SubMenu } = Menu;
const { Sider } = Layout;

const iconList = {
  "/home": <SettingOutlined />,
  "/user-manage": <SettingOutlined />,
  "/user-manage/list": <SettingOutlined />,
  "/right-manage": <SettingOutlined />,
  "/right-manage/role/list": <SettingOutlined />,
  "/right-manage/right/list": <SettingOutlined />,
};

function SideMenu(props) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/rights?_embed=children").then((res) => {
      console.log(res.data);
      setMenu(res.data);
    });
  }, []);

  const checkPagePermisson = (item) => {
    return item.pagepermisson;
  };

  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (
        item.children &&
        checkPagePermisson(item) &&
        item.children.length > 1
      ) {
        return (
          <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        checkPagePermisson(item) && (
          <Menu.Item
            key={item.key}
            icon={iconList[item.key]}
            onClick={() => {
              props.history.push(item.key);
            }}
          >
            {item.title}
          </Menu.Item>
        )
      );
    });
  };

  // console.log(props.location.pathname.split("/")[1]);
  const openKeys = ["/" + props.location.pathname.split("/")[1]];
  const selectKeys = [props.location.pathname];

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="logo">News</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
          >
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  );
}

export default withRouter(SideMenu);

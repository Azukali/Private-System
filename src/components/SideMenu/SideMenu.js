import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import "./SideMenu.css";
import "antd/dist/reset.css";
// import NewsSandBox from "../../views/sandbox/NewsSandBox";
import { useHistory, withRouter } from "react-router-dom";

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 1", "user-manage/list"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
].map((item, index) => ({ ...item, key: index.toString() }));

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

function SideMenu() {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const history = useHistory();

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Sider trigger={null} collapsible>
      <div className="logo">News</div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        defaultSelectedKeys={["1"]}
        onOpenChange={onOpenChange}
        onClick={(e) => {
          history.push(`/home/${e.key}`);
        }}
      >
        {items.map((item) => {
          if (!item.children) {
            return (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            );
          }

          return (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((childItem) => (
                <Menu.Item key={childItem.key} icon={childItem.icon}>
                  {childItem.label}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );
}

export default withRouter(SideMenu);

import React from "react";
import TopHeader from "./../../components/TopHeader/TopHeader";
import SideMenu from "./../../components/SideMenu/SideMenu";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import UserList from "./user-manage/UserList";
import RightList from "./right-manage/RightList";
import RoleList from "./right-manage/RoleList";
import NoPermission from "./nopermission/NoPermission.js";
import { Layout } from "antd";
import './NewsSandBox.css'

const { Content } = Layout;

function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout>
        <TopHeader></TopHeader>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/user-manage/list" component={UserList} />
            <Route path="/right-manage/role/list" component={RoleList} />
            <Route path="/right-manage/right/list" component={RightList} />

            <Redirect from="/" to="/home" exact />
            <Route path="*" component={NoPermission} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default NewsSandBox;

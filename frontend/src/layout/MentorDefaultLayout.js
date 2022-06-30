import React from "react";
import { Layout, Menu,Button ,Avatar} from "antd";
import {Link} from "react-router-dom";
import 'antd/dist/antd.min.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  FileProtectOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
const data = JSON.parse(localStorage.getItem("user"));



const { Header, Sider, Content } = Layout;


class MentorDefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>

        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div className="logo"  >
            {this.state.collapsed ? <h1 style={{color:"white",fontSize:"42px",fontWeight:'bold'}}>Be</h1> : <h1 style={{color:"white",fontSize:"42px",fontWeight:'bold'}}>BeExpo</h1>}
          </div>

        <Menu 
        theme="dark" 
        mode="inline" 
        defaultSelectedKeys={[window.location.pathname]}
        >
            <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/mentorabout">
              Profile
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FileProtectOutlined />}>
            <Link to="/createsession">
              Create Session
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CheckCircleOutlined />}>
            <Link to="/bookedsession">
            Booked Session
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />}>
            <Button onClick={()=>{
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  window.location.reload();
                  }
          }>Logout</Button>
            </Menu.Item>
          
          </Menu>
        </Sider>

        <Layout className="site-layout">

        <Header className="site-layout-background" style={{ padding: 0 }}>
            <div div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  paddingRight: "10px"
              }}>
              <div>
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: this.toggle,
                  }
                )}
              </div>

              <div
                style={{ display: this.state.collapsed ? "none" : "inline" }}
              >
                <h5 className="mr-2">
                  <Avatar src="https://joeschmoe.io/api/v1/random" />
                  <b>{data.username}</b>
                </h5>
              </div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 580,
              backgroundColor:"rgb(231,236,240)"
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MentorDefaultLayout;
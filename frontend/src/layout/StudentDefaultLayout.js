import React from "react";
import { Layout, Menu, Avatar,Button } from "antd";

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LogoutOutlined,
    FileProtectOutlined,
    CheckCircleOutlined,
    ProjectOutlined,
    LeftOutlined,
    PicRightOutlined,
    BulbOutlined
  } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const data = JSON.parse(localStorage.getItem("user"));
console.log(data);

class StudentDefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            {this.state.collapsed ? <h1>Be</h1> : <h1>BeExpo</h1>}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
               <Link to="/student">
               Profile
              </Link>
             </Menu.Item>
             <Menu.Item key="2" icon={<FileProtectOutlined />}>
              <Link to="/event">
               Events
               </Link>
             </Menu.Item>
             <Menu.Item key="3" icon={<CheckCircleOutlined />}>
               <Link to="/appliedevent">
               Applied Events
               </Link>
             </Menu.Item>
             <Menu.Item key="4" icon={<LeftOutlined />}>
               <Link to="/job">
               Jobs
               </Link>
             </Menu.Item>
             <Menu.Item key="5" icon={<CheckCircleOutlined />}>
               <Link to="/appliedjob">
               Applied Jobs
               </Link>
             </Menu.Item>
             <Menu.Item key="6" icon={<ProjectOutlined />}>
               <Link to="/projectcard">
               Projects
               </Link>
             </Menu.Item>
             <Menu.Item key="7" icon={<CheckCircleOutlined />}>
               <Link to="/appliedproject">
               Applied Projects
               </Link>
             </Menu.Item>
             <Menu.Item key="8" icon={<PicRightOutlined />}>
               <Link to="/postblog">
                 Post Blog
               </Link>
             </Menu.Item>
             <Menu.Item key="9" icon={<CheckCircleOutlined />}>
               <Link to="/postedblog">
                 Posted Blog
               </Link>
             </Menu.Item>
             <Menu.Item key="10" icon={<BulbOutlined />}>
               <Link to="/mentorcard">
                 Find Mentor
               </Link>
             </Menu.Item>
             <Menu.Item key="11" icon={<LogoutOutlined />}>
                 <Button onClick={()=>{
                      localStorage.removeItem("user");
                      localStorage.removeItem("token");
                      window.location.reload();
                      }
                      }>
                        Logout</Button>
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
              backgroundColor:"rgb(231, 236, 240)"
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default StudentDefaultLayout;


// import React from "react";
// import { Link } from "react-router-dom";
// import 'antd/dist/antd.min.css';
// import { Layout, Menu,Button,Avatar } from "antd";

// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   UserOutlined,
//   LogoutOutlined,
//   FileProtectOutlined,
//   CheckCircleOutlined,
//   ProjectOutlined,
//   LeftOutlined,
//   PicRightOutlined,
//   BulbOutlined
// } from "@ant-design/icons";

// const data = JSON.parse(localStorage.getItem("user"));



// const { Header, Sider ,Content} = Layout;


// class StudentDefaultLayout extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       collapsed: false,
//     };
//   }

//   state = {
//     collapsed: false,
//   };


//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

//   render() {
//     return (
//       <Layout>

//         <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
//         <div className="logo"  >
//             {this.state.collapsed ? <h1 style={{color:"white",fontSize:"42px",fontWeight:'bold'}}>Be</h1> : <h1 style={{color:"white",fontSize:"42px",fontWeight:'bold'}}>BeExpo</h1>}
//           </div>

//         <Menu 
//         theme="dark" 
//         mode="inline" 
//         defaultSelectedKeys={[window.location.pathname]}
//         >
//             <Menu.Item key="1" icon={<UserOutlined />}>
//               <Link to="/student">
//               Profile
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="2" icon={<FileProtectOutlined />}>
//               <Link to="/event">
//               Events
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="3" icon={<CheckCircleOutlined />}>
//               <Link to="/appliedevent">
//               Applied Events
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="4" icon={<LeftOutlined />}>
//               <Link to="/job">
//               Jobs
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="5" icon={<CheckCircleOutlined />}>
//               <Link to="/appliedjob">
//               Applied Jobs
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="6" icon={<ProjectOutlined />}>
//               <Link to="/projectcard">
//               Projects
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="7" icon={<CheckCircleOutlined />}>
//               <Link to="/appliedproject">
//               Applied Projects
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="8" icon={<PicRightOutlined />}>
//               <Link to="/postblog">
//                 Post Blog
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="9" icon={<CheckCircleOutlined />}>
//               <Link to="/postedblog">
//                 Posted Blog
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="10" icon={<BulbOutlined />}>
//               <Link to="/mentorcard">
//                 Find Mentor
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="11" icon={<LogoutOutlined />}>
//                 <Button onClick={()=>{
//                       localStorage.removeItem("user");
//                       localStorage.removeItem("token");
//                       window.location.reload();
//                       }
//                       }>
//                         Logout</Button>
//             </Menu.Item>
          
//           </Menu>
//         </Sider>
//         {/* <Layout className="site-layout">

//         <Header className="site-layout-background" style={{ padding: 0,color:"white" }}>
//           {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//             className: 'trigger',
//             onClick: this.toggle,
//           })}
//           </Header>

//           <Content
//             className="site-layout-background"
//             style={{
//               margin: "24px 16px",
//               padding: 24,
//               minHeight: 580,
//             }}
//           >
//             {this.props.children}
//           </Content> 
//         </Layout> */}
//                 <Layout className="site-layout">
//           <Header className="site-layout-background" style={{ padding: 0 }}>
//             <div >
//               <div style={{
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "10px",
//     paddingRight: "10px"
// }}>
//                 {React.createElement(
//                   this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
//                   {
//                     className: "trigger",
//                     onClick: this.toggle,
//                   }
//                 )}
//               </div>

//               <div
//                 style={{ display: this.state.collapsed ? "none" : "inline" }}
//               >
//                 <h5 className="mr-2">
//                   <Avatar src="https://joeschmoe.io/api/v1/random" />
//                   <b>{data.username}</b>
//                 </h5>
//               </div>
//             </div>
//           </Header>
//           <Content
//             className="site-layout-background"
//             style={{
//               margin: "24px 16px",
//               padding: 24,
//               minHeight: 280,
//             }}
//           >
//             {this.props.children}
//           </Content>
//         </Layout>
//       </Layout>
//     );
//   }
// }

// export default StudentDefaultLayout;
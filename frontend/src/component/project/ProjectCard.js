import React from "react";
import 'antd/dist/antd.min.css';
import { Link } from "react-router-dom"
import StudentDefaultLayout from "../../layout/StudentDefaultLayout";
import './project.css';
import { useEffect, useState } from "react";
import moment from "moment";
import { Row, Col, Card, Button } from 'antd';
const { Meta } = Card;

const ProjectCard = () => {
    const [data, setData] = useState([]);

    const getdata = async () => {
        const res = await fetch("http://localhost:5000/project/postedproject", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization':localStorage.getItem("token")
          }
        });
    
        const data = await res.json();
        console.log(data);
    
        if (res.status === 422 || !data) {  // accessable data
          console.log("error ");
    
        } else {
        setData(data.reverse())
          console.log("get data");
        }
      }

      useEffect(() => {
        getdata();
      }, [])

    return (

        <StudentDefaultLayout>
             
            <Row gutter={[16, 16]}>
               
                {data.map(pro => {
                    return (
                        <Col md={{ span: 10 }} key={pro._id} style={{ marginLeft: "3%", marginRight: "3%", backgroundColor: "-moz-initial" }}>
                            <Card bordered={true} style={{ borderColor: "aqua", boxShadow: "5px 5px 10px #888888" }}>
                                <div className="content">
                                    <div style={{ float: "left", marginRight: "4%" }}>
                                        <img style={{ width: 300, hight: 200, borderColor: "#001529" }} src={pro.image} alt="Poster"/>
                                    </div>
                                    <div >
                                        <Meta  title={pro.title} />
                                        <p style={{ color: "#43b3ae",fontWeight:"bold" }}>{pro.categories}</p>
                                        <p><span style={{ color: "#001529" }}><b>Register Before </b><br /></span>
                                        <p style={{textAlign:"center",color:"navy",fontWeight:"bold"}}>{moment.utc(pro.registerbeforedate).local().format('YYYY/MM/DD')}</p></p>
                                        <p><b>{pro.duration}</b> <p style={{color:"#73a9c2",display:"inline",fontWeight:"bold"}}>Months Project</p></p>

                                    </div>

                                    <Button type="primary"
                                        style={{ backgroundColor: "#001529", color: "aqua" }}>
                                        <Link to={`/project/description/${pro._id}`}>
                                            View
                                        </Link>
                                    </Button>
                                </div>
                            </Card>

                        </Col>

                    );
                })}
                
            </Row>
            
        </StudentDefaultLayout>
    )
}

export default ProjectCard;


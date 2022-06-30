import React from "react";
import 'antd/dist/antd.min.css';
import { Link } from "react-router-dom"
import StudentDefaultLayout from "../../layout/StudentDefaultLayout";
import { useEffect, useState } from "react";
import { Card, Button, Row, Col } from 'antd';
const { Meta } = Card;

const MentorCard = () => {
    const [mentor, setMentor] = useState([]);

    const getAllMentors = () => {
        fetch("http://localhost:5000/mentor/mentorprofile", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':localStorage.getItem("token")

            }
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setMentor(data);
                console.log(mentor)
                console.log(mentor[0].name)
            });
    }

    useEffect(() => {
        getAllMentors();
    }, []);

    return (

        <StudentDefaultLayout>

            <Row gutter={[16]}>

                {mentor.map((ment) => {
                    return (
                        <Col md={{ span: 8 }} key={ment._id} tyle={{ marginLeft: "4%", marginRight: "4%", backgroundColor: "-moz-initial" }}>
                            <Card
                                hoverable
                                style={{ width: 300, borderColor: "aqua", boxShadow: "5px 5px 10px #888888" }}
                                cover={<img alt="example" src={ment.image} />}
                            >
                                <Meta title={ment.linkedIn} description={ment.expertise} />
                                <p
                                    style={{ float: "right", display: "inline", fontWeight: "bold" }}
                                >
                                    <Link to={`/mentorcard/profile/${ment._id}`} style={{ color: "#001529" }}>
                                        MORE
                                    </Link>
                                </p>
                            </Card>
                            <br /><br />
                        </Col>
                    )
                })}

            </Row>

        </StudentDefaultLayout>
    )
}

export default MentorCard;




// <Col md={{ span: 10 }} key={pro._id} style={{ marginLeft: "3%", marginRight: "3%", backgroundColor: "-moz-initial" }}>
//                             <Card bordered={true} style={{ borderColor: "aqua", boxShadow: "5px 5px 10px #888888" }}>
//                                 <div className="content">
//                                     <div style={{ float: "left", marginRight: "4%" }}>
//                                         <img style={{ width: 300, hight: 200, borderColor: "#001529" }} src={pro.image} />
//                                     </div>
//                                     <div>
//                                         <Meta style={{ color: "#001529" }} title={pro.title} />
//                                         <p>{pro.categories}</p>
//                                         <p>{pro.postedBy}</p>
//                                         <p><span style={{ color: "#001529" }}><b>Register Before </b><br /></span>{pro.registerbeforedate}</p>
//                                         <p style={{ color: "#001529" }}><b>{pro.duration}</b> Months Duration</p>

//                                     </div>

//                                     <Button
//                                         style={{ backgroundColor: "#001529", color: "aqua" }}>
//                                         <Link to={`/project/description/${pro._id}`}>
//                                             View
//                                         </Link>
//                                     </Button>
//                                 </div>
//                             </Card>

//                         </Col>
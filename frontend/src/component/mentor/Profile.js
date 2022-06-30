import React, { useState, useEffect } from 'react';
import StudentDefaultLayout from '../../layout/StudentDefaultLayout';
import { useParams, Link } from 'react-router-dom';
import { LinkedinFilled, ShoppingFilled } from '@ant-design/icons';
import { Button,message, Popconfirm } from 'antd';
import moment from "moment";


const Profile = () => {
    const { id } = useParams();
    const [mentor, setMentor] = useState([]);
    const [sessions, setSessions] = useState([]);
    
    
    const fetchData = () => {
        fetch(`http://localhost:5000/mentor/${id}`, {
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
                fetch(`http://localhost:5000/session/${data.user._id}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization':localStorage.getItem("token")
                        }
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((sessionData) => {
                            
                            setSessions(sessionData);
                            console.log(sessionData);
                        });
            setMentor(data);
            console.log(data);
            });
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchAppointmentData=(sessionId)=>{
        fetch("http://localhost:5000/putAppointment", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem("token")

                        },
                        body: JSON.stringify({
                            session:sessionId,
                            mentor:mentor.user
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            if (data) {
                                message.success("Session Booked Sucessfully !..");
                            } else {
                                message.error(data.error);
                            }
                           
                        });    
    }

    return (
        <StudentDefaultLayout>
            <div>
                <div>
                    <img
                        alt="mentor profile"
                        src={mentor.image}
                        style={{ width: 180, height: 140, float: "left" }}
                    />
                    <h2
                        style={{ paddingTop: "5%", textTransform: "uppercase", color: "#001529", paddingLeft: "16%" }}
                    >
                        {mentor.name}
                    </h2>
                    <h3
                        style={{ marginLeft: "3%", textAlign: "left", paddingLeft: "13%" }}
                    >
                        {mentor.position}
                    </h3>
                </div>
                {/* <br /> */}
                <div>
                    <p
                        style={{ color: " #013220 ", fontWeight: "bold", display: "inline", marginRight: "83%" }}
                    >
                        Overview
                    </p>
                    <Button
                        style={{ backgroundColor: "#001529", color: "aqua" }}
                    >
                        <Link to="/getappointment">
                        Booked Session
                        </Link>
                        
                    </Button>
                    <hr style={{ backgroundColor: "grey", height: 2 }} />

                    <div>
                        <div
                            style={{ width: "50%", float: "left", padding: "2%" }}
                        >
                            <p
                                style={{ color: "gray", fontWeight: "bold", textAlign: "justify" }}
                            >
                                {mentor.story}
                            </p><br />
                            <h6
                                style={{ color: " #013220 " }}
                            >
                                Read More
                            </h6>
                            <br />
                            <a href={mentor.linkedIn}>
                                <LinkedinFilled style={{ marginLeft: "11%", fontSize: '200%' }} />
                            </a>
                            <br /><br />
                            <h6
                                style={{ color: " #013220 " }}
                            >
                                Expertise
                            </h6><br />
                              <p style={{color:"#43b3ae",fontWeight:"bold",marginLeft: "10%"}}> {mentor.expertise}</p>  
                           
                            <br />
                            <h6
                                style={{ color: " #013220 " }}
                            >
                                Experience
                            </h6><br />
                                <p style={{color:"#43b3ae",fontWeight:"bold",marginLeft: "10%"}}> <ShoppingFilled />{mentor.experience} at {mentor.workPlace}</p>
                            
                            <br />
                            <h6
                                style={{ color: " #013220 " }}
                            >
                                Languages
                            </h6>
                              <p style={{color:"#43b3ae",fontWeight:"bold",marginLeft: "10%"}}> {mentor.language}</p>  
                            <br />
                        </div>

                        <div
                            style={{ width: "45%",backgroundColor:"rgb(231, 236, 240)" ,height: 350, borderWidth:"thin",borderStyle: "solid", borderColor: "grey", float: "right", padding: "3%", color: "#00152", fontWeight: "bold" }}
                        >
                            <p>Available Session</p>
                            <p>In your local Date and Timezone</p>
                            <hr style={{ backgroundColor: "grey", height: 2 }} />
                            {sessions.map(session=>{
                                return (
                                    <div style={{display:"inline"}}>
                                        <Popconfirm
                                            title="Do you really want to take this session?"
                                            onConfirm={()=>fetchAppointmentData(session._id)}
                                            okText="Yes"
                                            cancelText="No"
                                         
                                        >
                                            <Button style={{backgroundColor:"#43b3ae",width:"100px",height:"50px", margin:"5%",display:"inline"}} >
                                                    <p style={{display:"inline"}}> {moment.utc(session.date).local().format("MMM DD yyyy")}</p>
                                                    
                                                <p>{session.time}</p> 
                                            </Button>

                                        </Popconfirm>
                                        
                                        
                                    </div>
                                )
                            })}
                            
                            {/* <Button
                                style={{ backgroundColor: "#001529", color: "aqua", marginLeft: "37%" }}
                            >
                                Book Session
                            </Button> */}
                        </div>
                        <br></br>
                        <Button
                            style={{ backgroundColor: "#001529", color: "aqua", marginLeft: "94.9%" }}
                        >
                            <Link to="/mentorcard">Back</Link>
                        </Button>
                    </div>
                </div>
            </div>

        </StudentDefaultLayout>

    )
}

export default Profile;
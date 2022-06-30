import React from "react";
import 'antd/dist/antd.min.css';
import MentorDefaultLayout from "../../layout/MentorDefaultLayout";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button, message,Popconfirm } from 'antd';
import moment from "moment";
const { Meta } = Card;



const BookedSession = () => {
  const [data, setData] = useState([]);

  const getAllAppointment = async () => {
    const res = await fetch("http://localhost:5000/getAppointment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("token")
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
    getAllAppointment();
  }, [])

  const cancelAppointment = async (id) => {
    const res2 = await fetch(`http://localhost:5000/putAppointment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("token")
      }
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
      message.error("Error")
    } else {
      console.log("project deleted");
      message.success("Appointment Deleted Successfully!...")

    }

  }

  return (

    <MentorDefaultLayout>

      <Row gutter={[16, 16]}>
        {data.map(appoint => {
          return (
            <Col md={{ span: 10 }} key={appoint._id} style={{ marginLeft: "3%", marginRight: "3%" }}>
              <Card bordered={true} style={{ borderColor: "aqua" }}>
                <div className="content">
                  <div className="card">
                    <Meta style={{backgroundColor:"rgb(231,236,240)",color:"navy",textAlign:"center"}} title={appoint.session.topic} />
                  </div>
                  <p><span style={{color:"#43b3ae",fontWeight:"bold"}}>Session On   </span><span style={{color:"#001529",fontWeight:"bold"}}>{appoint.session.time}</span></p>
                  <p style={{color:"grey",fontWeight:"bold"}}>{appoint.session.sessionDescription} </p>
                  <p><span style={{color:"#43b3ae",fontWeight:"bold"}}>Session At  </span><span style={{color:"#001529",fontWeight:"bold"}}>{moment.utc(appoint.session.date).local().format("MMM DD yyyy")}</span></p>
                  <Button style={{ backgroundColor: "lightblue",marginRight:"6%",fontWeight:"bold" }}><a href={appoint.session.meetingLink}>Join</a></Button>
                  <Popconfirm
                                            title="Do you really want to cancel this session?"
                                            onConfirm={()=>cancelAppointment(appoint._id)}
                                            okText="Yes"
                                            cancelText="No"
                  >
                  <Button style={{ backgroundColor: "red", fontWeight:"bold"}}
                    // onClick={()=>cancelAppointment(appoint._id)}
                    >
                    Cancel</Button>
                    </Popconfirm>
                  {/* <p>{session.duration} </p> */}
                </div>
              </Card>

            </Col>

          );
        })}

      </Row>


    </MentorDefaultLayout>
  )
}



export default BookedSession;
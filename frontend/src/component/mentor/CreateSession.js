import React, { useState } from "react";
import MentorDefaultLayout from "../../layout/MentorDefaultLayout";
import 'antd/dist/antd.min.css';
import { Form, Button, Input, DatePicker,message } from "antd";
import './mentor.css';
const { TextArea } = Input;

const CreateSession = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [meetingLink, setMeetingLink] = useState("");
    const [topic, setTopic] = useState("");
    const [sessionDescription, setSessionDescription] = useState("");
    const validInputs="true"

    const fetchCreateSessionData = () => {
            
        if(!date || !time || !meetingLink || !topic || !sessionDescription){
            message.warning("Please fill the all Fields");
            validInputs = false;
        }

        if (validInputs) {
            fetch("http://localhost:5000/mentor/createsession", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")

                },
                body: JSON.stringify({
                    time: time,
                    date: date,
                    meetingLink: meetingLink,
                    topic: topic,
                    sessionDescription: sessionDescription
                    
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setDate("");
                    setTime("");
                    setMeetingLink("");
                    setTopic("");
                    setSessionDescription("")
                    if (data) {
                        message.success("Session Posted Sucessfully !..");
                    } else {
                        message.error(data.error);
                    }

                    
                    // window.location.reload();
                });
        }
    };
    console.log(
        time,
        date,
        meetingLink,
        topic,
        sessionDescription
    )

    
    const disableDate = (current) => {
        return current && current.valueOf() < Date.now();
    }

    return (
        <MentorDefaultLayout>
            <div className="CreateSession">
                <h1>Set Session</h1>

                <h3 style={{ align: "center" }}>
                    Schedule Of the Mentorship Session</h3>

                <Form method="POST" style={{ padding: 30 }} >
                    <Form.Item
                        label="Date : "
                        style={{ float: "left", marginRight: "30%", marginLeft: "8%", fontWeight: "bold" }}>
                        <DatePicker
                            style={{ width: "130%" }}
                            type="date"
                            name="date"
                            value={date}
                            disabledDate={disableDate}
                            onChange={(e) => setDate(e)}
                            required />
                    </Form.Item>

                    <Form.Item
                        label="Time : "
                        style={{ fontWeight: "bold" }}>
                        <Input
                            style={{ width: "100%" }}
                            type="time"
                            name="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required />

                    </Form.Item>

                    <Form.Item
                        label="Select Main Topic : "
                        style={{ marginLeft: "-4.5%", fontWeight: "bold" }}>
                        <select
                            placeholder="Select Topic"
                            onChange={(e) => setTopic(e.target.value)}
                            style={{
                                padding: "4px 11px",
                                color: "#bfbfbf",
                                background: "transparet",
                                cursor: "pointer",
                                appearance: "none",
                                height: "30px",
                                width: "100%",
                                border: "1px solid #d9d9d9",
                                borderradius: "2px",
                                lineheight: " 1.5715"
                            }}
                            required>
                            <option value=" SoftWare Enginering "> SoftWare Enginering</option>
                            <option value="UI Design "> UI Design</option>
                            <option value="Business Analysis "> Business Analysis</option>
                            <option value=" Web Development "> Web Development</option>
                        </select>
                    </Form.Item>

                    <Form.Item
                        label=" Meeting Link :"
                        style={{ marginLeft: "-0.3%", fontWeight: "bold" }}>
                        <Input
                            type="url"
                            name="meetingLink"
                            placeholder="Enter Meeting Link"
                            value={meetingLink}
                            onChange={(e) => setMeetingLink(e.target.value)}
                            required />
                    </Form.Item>

                    <Form.Item
                        label="Session Message"
                        style={{ fontWeight: "bold", marginLeft: "-3.5%" }}>
                        <TextArea
                            style={{ height: 100, width: "100%" }}
                            placeholder="Enter Your Message"
                            name='sessionDescription'
                            value={sessionDescription}
                            onChange={(e) => setSessionDescription(e.target.value)}
                            required />

                    </Form.Item>
                    <Form.Item>
                        <Button
                            onClick={() => fetchCreateSessionData()}
                            // htmlType="submit"
                            style={{ align: "center", marginLeft: "80%", backgroundColor: "black", color: "aqua" }}>
                            CREATE SESSION
                        </Button>

                    </Form.Item>



                </Form>
            </div>
        </MentorDefaultLayout>
    )
}

export default CreateSession;

// <label htmlFor="date"
// style={{ marginLeft: "12%" }}>
// Date :
// </label>
// <input
// type="date"
// name="date"
// value={date}
// onChange={(e) => setDate(e.target.value)}
// required>
// </input><br /><br />

// <label htmlFor="time"
// style={{ marginLeft: "12%" }} >
// Time :
// </label>
// <input
// type="time"
// name="time"
// value={time}
// onChange={(e) => setTime(e.target.value)}
// required>
// </input><br /><br />

// <label htmlFor="Select Main Topic" >
// Select Main Topic :
// </label>
// <select
// placeholder="Select Topic"
// onChange={(e) => setTopic(e.target.value)}
// required>
// <option value=" SoftWare Enginering"> SoftWare Enginering</option>
// <option value="UI Design"> UI Design</option>
// <option value="Business Analysis"> Business Analysis</option>
// <option value=" Web Development"> Web Development</option>
// <option value=" Web Development"> Web Development</option>
// </select><br /><br />

// <label htmlFor="Meeting Link"
// style={{ marginLeft: "4.3%" }}>
// Meeting Link :
// </label>
// <input
// type="url"
// name="meetingLink"
// placeholder="Enter Meeting Link"
// value={meetingLink}
// onChange={(e) => setMeetingLink(e.target.value)}
// required>
// </input><br /><br />

// <label
// htmlFor="Session Message"
// style={{ marginLeft: "0.7%" }} >
// Session Message :
// </label>
// <textarea
// style={{ height: 100 ,width:"200px"}}
// placeholder="Enter Your Message"
// name='sessionDescription'
// value={sessionDescription}
// onChange={(e) => setSessionDescription(e.target.value)}
// required>
// </textarea><br /><br />
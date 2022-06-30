import React, { useState } from "react";
import 'antd/dist/antd.min.css';
import './mentor.css';
import MentorDefaultLayout from "../../layout/MentorDefaultLayout";
import { Form, Button, Select, Input ,message} from "antd";
const { TextArea } = Input;
const { Option } = Select;

const MentorAbout = () => {

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [expertise, setExpertise] = useState([]);
    const [linkedIn, setLinkedIn] = useState("");
    const [website, setWebsite] = useState("");
    const [workPlace, setworkPlace] = useState("");
    const [story, setStory] = useState("");
    const [image, setImage] = useState("");
    const [language, setLanguage] = useState([]);
    const [experience, setExperience] = useState("");

    const FetchMentorDetails = () => {

                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "BeExpo");
                data.append("cloud_name", "detwomtuw");
                fetch("https://api.cloudinary.com/v1_1/detwomtuw/image/upload", {
                    method: "post",
                    body: data,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data.url);
                        fetch("http://localhost:5000/mentor/newmentor", {
                            method: "PUT",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem("token")

                            },
                            body: JSON.stringify({
                                name: name,
                                position: position,
                                expertise: expertise,
                                linkedIn: linkedIn,
                                website: website,
                                workPlace: workPlace,
                                story: story,
                                image: data.url,
                                language: language,
                                experience: experience
                            }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data);
                                if (data) {
                                    message.success("Mentor Profile Updated Sucessfully !..");
                                } else {
                                    message.error(data.error);
                                }
                                setName("");
                                setPosition("");
                                setExpertise([]);
                                setLinkedIn("");
                                setWebsite("");
                                setworkPlace("");
                                setStory("");
                                setImage("");
                                setLanguage([]);
                                setExperience("");
                                // window.location.reload();
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
        
        // console.log(url);   
    };


    const handleChange = (e) => {
        setExperience(e.target.value);
    };

    const handleimagechange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0])
        }
    }

    return (
        <MentorDefaultLayout>

            <h1> What is your original strory?</h1>
            <Form className="MentorStory" style={{ padding: 15 }} method="POST">

                <Form.Item
                    label="Name"
                    style={{ float: "left", marginRight: "15.5%", marginLeft: "8%", fontWeight: "bold" }}>
                    <Input
                        placeholder="Enter Your Name"
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Item>

                <Form.Item
                    label="Position"
                    style={{ fontWeight: "bold" }}>
                    <Input
                        placeholder="Enter Your Position"
                        value={position}
                        name="position"
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </Form.Item>

                <Form.Item
                    label="Expertise"
                    style={{ width: "29%", float: "left", marginRight: "2%", marginLeft: "5.5%", fontWeight: "bold" }}>

                    <Select
                        placeholder="Select Expertise"
                        onChange={(e) => setExpertise(e)}
                        // value={expertise}
                        mode="multiple"
                        required
                    >
                        <Option value="Design ">Design </Option>
                        <Option value="Marketing ">Marketing</Option>
                        <Option value="Software Development ">Software Development</Option>
                        <Option value="Business Analysis ">Business Analysis</Option>

                    </Select>
                </Form.Item>

                <Form.Item
                    label="LinkedIn"
                    style={{ marginLeft: "49.4%", marginRight: ".1%", fontWeight: "bold" }}
                >
                    <Input
                        placeholder="Enter Your LinkedIn URL"
                        value={linkedIn}
                        name="linkedIn"
                        required
                        onChange={(e) => setLinkedIn(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="WebSite"
                    style={{ marginLeft: "49.4%", marginRight: ".1%", fontWeight: "bold" }}
                >
                    <Input
                        placeholder="Enter Your WebSite URL"
                        value={website}
                        name="website"
                        required
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Company"
                    style={{ float: "left", marginRight: "14%", marginLeft: "5.3%", fontWeight: "bold" }}>
                    <Input
                        placeholder="Your Company/School"
                        value={workPlace}
                        name="workPlace"
                        required
                        style={{ width: "100%" }}
                        onChange={(e) => setworkPlace(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Experience"
                    style={{ fontWeight: "bold", marginLeft: "2%" }}
                >
                    <Select
                        placeholder="Select Level of Experience"
                        // value={experience}
                        onChange={(e) => setExperience(e)}
                        required
                    >
                        <Option value="Intermediate">Intermediate </Option>
                        <Option value="Senior">Senior</Option>
                        <Option value="Manager">Manager</Option>
                        <Option value="Director">Director</Option>
                        <Option value="Lead">Lead</Option>
                        <Option value="Excutive">Excutive</Option>
                        <Option value="Founder">Founder</Option>
                    </Select>

                </Form.Item>

                < Form.Item
                    label="Languages"
                    style={{ float: "left", marginRight: "17%", marginLeft: "4.2%", fontWeight: "bold", width: "29.8%" }}>

                    <Select
                        value={language}
                        placeholder="Select languages"
                        onChange={(e) => setLanguage(e)}
                        mode="multiple"
                    >
                        <Option value="Tamil ">Tamil</Option>
                        <Option value="English ">English</Option>
                        <Option value="Sinhala ">Sinhala</Option>

                    </Select>
                </Form.Item>

                <Form.Item
                    label="Image"
                    style={{ fontWeight: "bold", marginLeft: "2%" }}>
                    <Input
                        type="file"
                        placeholder="choose Photo"
                        // value={image}
                        name="image"
                        required
                        onChange={handleimagechange}
                    />
                </Form.Item>

                <Form.Item
                    label="Story"
                    style={{ marginLeft: "8%", fontWeight: "bold" }}>
                    <TextArea
                        showCount
                        maxLength={300}
                        style={{ height: 110 }}
                        placeholder="Enter Your Story"
                        name='story'
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        required
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        style={{ backgroundColor: " #001529", marginLeft: "90%", color: "aqua" }}
                        onClick={() => FetchMentorDetails()}>
                        Continue
                    </Button>
                </Form.Item>

            </Form>
        </MentorDefaultLayout>
    )
}

export default MentorAbout;



{/* <Form className="MentorStory" style={{ padding: 20 }} method="POST">

                <label
                    htmlFor="Your Name"
                    style={{ float: "left", marginRight: "12%", marginLeft: "7.5%", fontWeight: "bold" }}>
                    Your Name :
                <input
                    placeholder="Enter Your Name"
                    value={name}
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </label>

                <label htmlFor="Your Title"
                    style={{ fontWeight: "bold" }}>Your Title :
                <input
                    placeholder="Enter Your Position"
                    value={position}
                    name="position"
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
                 </label>

                <label htmlFor="What's your Expertise"
                    style={{ float: "left", marginRight: "2%", marginLeft: "-.5%", fontWeight: "bold" }}>
                    What's your Expertise :
                
                <select
                    placeholder="Select Expertise"
                    onChange={(e) => setExpertise(e.target.value)}
                    value={expertise}
                    required>
                    <option value="">...</option>
                    <option value="Design">Design </option>
                    <option value="Margeting">Margeting</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Business Analysis">Business Analysis</option>

                </select>
                </label>

                <label htmlFor="LinkedIn URL"
                    style={{ marginLeft: "49.4%", marginRight: ".1%", fontWeight: "bold" }}
                >LinkedIn URL :
                <input
                    placeholder="Enter Your LinkedIn URL"
                    value={linkedIn}
                    name="linkedIn"
                    required
                    onChange={(e) => setLinkedIn(e.target.value)}
                />
                 </label>

                <label htmlFor="Company/School"
                    style={{ float: "left", marginRight: "11.1%", marginLeft: "3%", fontWeight: "bold" }}>Company/School : 
                <input
                    placeholder="Your Company/School"
                    value={workPlace}
                    name="workPlace"
                    required
                    onChange={(e) => setWorkplace(e.target.value)}
                />
                </label>

                <label htmlFor="Experience" style={{ fontWeight: "bold", marginLeft: "2%" }}>Experience : 
                <select
                    placeholder="Select Level of Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required>
                    <option value="">...</option>
                    <option value="Intermediate">Intermediate </option>
                    <option value="Senior">Senior</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                    <option value="Lead">Lead</option>
                    <option value="Excutive">Excutive</option>
                    <option value="Founder">Founder</option>
                </select>
                </label>

                < label htmlFor="Languages"
                    style={{ marginRight: "0.2%", marginLeft: "7.5%", fontWeight: "bold" }}>Languages : 

                <select
                    value={language}
                    placeholder="Select languages"
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="">.....</option>
                    <option value="tamil">Tamil</option>
                    <option value="eng">Eng</option>
                    <option value="sinhala">Sinhala</option>

                </select>
                </label>
              
                <label htmlFor="Your Story"
                    style={{ marginLeft: "8%", fontWeight: "bold" }}>Your Story : 
                <textarea
                    showCount
                    maxLength={100}
                    style={{ height: 110 }}
                    placeholder="Enter Your Story"
                    name='story'
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    required
                />
                </label>

                <Button
                    // type="submit" 
                    style={{ backgroundColor: " #001529", marginLeft: "90%", color: "aqua" }}
                    onClick={() => FetchMentorDetails()}>
                    Continue</Button>
            </Form> */}

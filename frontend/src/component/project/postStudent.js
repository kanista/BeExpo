import React, { useState } from "react";
import CompanyDefaultLayout from "../../layout/CompanyDefaultLayout";
import 'antd/dist/antd.min.css';
import { Form, Button, Input, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

const PostProject = () => {
    const [stud, setTitle] = useState("");
    const [categories, setCategories] = useState("");
    const [scenarioduration, setScenarioduration] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [scenario, setScenario] = useState("");
    const [technologies, setTechnologies] = useState([]);
    const [registerbeforedate, setRegisterbeforedate] = useState("");
    const [qualification, setQualification] = useState("");
    const [image, setImage] = useState("");
    // const [url,setUrl]=useState("");

    const FetchPostProjectData = () => {
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
                fetch("http://localhost:5000/project/newproject", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify({
                        title: title,
                        categories: categories,
                        scenarioduration: scenarioduration,
                        scenario: scenario,
                        registerbeforedate: registerbeforedate,
                        technologies: technologies,
                        image: data.url,
                        duration: duration,
                        qualification: qualification,
                        description: description
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        // window.location.reload();
                    });
                // setUrl(data.url);

            })
            .catch((err) => {
                console.log(err);
            });



    };


    const handleimagechange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0])
        }

    }
    return (
        <CompanyDefaultLayout>
            <div>
                <h1>About Project Information</h1>
                <Form className="PostProject" style={{ padding: 15 }} method="POST">

                    <Form.Item
                        label="Title : "
                        style={{ float: "left", marginRight: "15%", marginLeft: "8%", fontWeight: "bold", width: "35%" }}
                    >
                        <Input
                            placeholder="Enter Title"
                            name='title'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Categories : "
                        style={{ fontWeight: "bold" }}
                    >
                        <Select
                            value={categories}
                            placeholder="Choose Project Categories"
                            onChange={(e) => setCategories(e)}

                        // style={{ ,""
                        //     padding:"4px 11px",
                        //     color: "#bfbfbf",
                        //     background: "transparet",
                        //     cursor: "pointer",
                        //     appearance: "none",
                        //     height: "30px",
                        //     width: "100%",
                        //     border: "1px solid #d9d9d9",
                        //     borderradius: "2px",
                        //     // width: "125%"
                        // }}
                        >
                            <Option value="">...</Option>
                            <Option value="Web Development">Web Development </Option>
                            <Option value="Mobile Development">Mobile Development</Option>
                            <Option value="UX/UI Design">UX/UI Design</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Duration : "
                        style={{ width: "38%", float: "left", marginRight: "1%", marginLeft: "4.9%", fontWeight: "bold" }}>
                        <Input
                            type="number"
                            name="duration"
                            placeholder="Enter Duaration (months)"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Qualification : "
                        style={{ marginLeft: "56.4%", marginRight: ".1%", fontWeight: "bold" }}
                    >
                        <Input
                            type="text"
                            name="qualification"
                            placeholder="Enter Qualification"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                        />
                    </Form.Item>


                    <Form.Item
                        label="Scenario Duration (minutes) : "
                        style={{ width: "52%", float: "left", marginRight: "13.5%", marginLeft: "-9.2%", fontWeight: "bold" }}
                    >
                        <Input
                            type="number"
                            name="scenarioduration"
                            placeholder="Duration for Scenario"
                            value={scenarioduration}
                            onChange={(e) => setScenarioduration(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Technologies : "
                        style={{ fontWeight: "bold", marginLeft: "2%", width: "40%" }}
                    >
                        <Select
                            mode="multiple"
                            value={technologies}
                            placeholder="Choose Event Technologies"
                            onChange={(e) => setTechnologies(e)}
                        // style={{
                        //     padding:"4px 11px",
                        //     color: "#bfbfbf",
                        //     background: "transparet",
                        //     cursor: "pointer",
                        //     appearance: "none",
                        //     height: "30px",
                        //     width: "112%",
                        //     border: "1px solid #d9d9d9",
                        //     borderradius: "2px",
                        //     // width: "125%"
                        // }}
                        >
                            {/* <Option value="">...</Option> */}
                            <Option value="MERN">MERN</Option>
                            <Option value="MEAN">MEAN</Option>
                            <Option value="ANGULAR">ANGULAR</Option>
                            <Option value="REACT">REACT</Option>
                            <Option value="LARAVAL">LARAVAL</Option>
                            <Option value="MY SQL">MY SQL</Option>
                            <Option value="PHP">PHP</Option>
                            <Option value="MONGO">MONGO</Option>
                            <Option value=".NET">.NET</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Register Before Date : "
                        style={{ width: "46.5%", float: "left", marginRight: "19.1%", marginLeft: "-3.9%", fontWeight: "bold" }}
                    // style={{float: "left", width:"46.5%", marginRight: "15%", marginLeft: "-3.9%", fontWeight: "bold" }}
                    >
                        <Input
                            type="date"
                            name="registerbeforedate"
                            value={registerbeforedate}
                            onChange={(e) => setRegisterbeforedate(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        style={{ fontWeight: "bold" }}>
                        <input
                            type="file"
                            placeholder="choose Photo"
                            // value={image}
                            name="image"
                            required

                            onChange={handleimagechange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Description : "
                        style={{ fontWeight: "bold", marginLeft: "2.7%" }}
                    >
                        <TextArea
                            type="text"
                            name="description"
                            placeholder="Enter Descrption"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Scenario : "
                        style={{ marginLeft: "8%", fontWeight: "bold", marginLeft: "4.7%" }}>
                        <TextArea
                            type="text"
                            name="scenario"
                            style={{ height: 100 }}
                            placeholder="Enter Seneorio"
                            value={scenario}
                            onChange={(e) => setScenario(e.target.value)}
                        ></TextArea>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            onClick={() => FetchPostProjectData()}
                            style={{ align: "center", marginLeft: "93%", backgroundColor: "#001529", color: "aqua" }}>
                            POST
                        </Button>

                    </Form.Item>
                </Form>
            </div>
        </CompanyDefaultLayout>
    )
}


export default PostProject;


// <select
//                         multiple={false}
//                         value={technologies}
//                         placeholder="Choose Event Technologies"
//                         onChange={(e) => setTechnologies(e.target.value)}
//                         style={{
//                             padding:"4px 11px",
//                             color: "#bfbfbf",
//                             background: "transparet",
//                             cursor: "pointer",
//                             appearance: "none",
//                             height: "30px",
//                             width: "112%",
//                             border: "1px solid #d9d9d9",
//                             borderradius: "2px",
//                             // width: "125%"
//                         }}
//                     >
//                         <option value="">...</option>
//                         <option value="MERN">MERN</option>
//                         <option value="MEAN">MEAN</option>
//                         <option value="ANGULAR">ANGULAR</option>
//                         <option value="REACT">REACT</option>
//                         <option value="LARAVAL">LARAVAL</option>
//                         <option value="MY SQL">MY SQL</option>
//                         <option value="PHP">PHP</option>
//                         <option value="MONGO">MONGO</option>
//                         <option value=".NET">.NET</option>
//                     </select>
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CompanyDefaultLayout from "../../layout/CompanyDefaultLayout";
import 'antd/dist/antd.min.css';
import { Form, Button, Input, Select, message, DatePicker } from 'antd';
import moment from "moment";
const { TextArea } = Input;
const { Option } = Select;

const Edit = ({ match }) => {
    const { id } = useParams();
    const [project, setProject] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        fetch(`http://localhost:5000/project/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("token")
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                let fieldData = data;
                delete fieldData['_id'];
                delete fieldData['createdAt'];
                delete fieldData['updatedAt'];
                delete fieldData['__v'];
                fieldData.registerbeforedate = moment(fieldData.registerbeforedate)
                // fieldData.registerbeforedate=moment.utc(fieldData.registerbeforedate).local().format("MM/DD/YYYY")
                console.log(fieldData)
                const finalValue = Object.keys(fieldData).map(key => ({ name: key, value: fieldData[key] }));
                setProject(finalValue);
            });
    }

    const fetchUpdate = (newvalues) => {
        fetch(`http://localhost:5000/project/${id}`, {
            method: "PUT",
            body: JSON.stringify(
                newvalues
            ),
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("token")

            },
        })
            .then((res) => {
                res.json()
                    .then((json) =>
                        console.log(json));
                message.success("Project Edited Sucessfully !..");
                console.log(project);
            })
    };

    const disableDate = (current) => {
        return current && current.valueOf() < Date.now();
    }


    return (
        <CompanyDefaultLayout>
            <h1>Upadate Project Information</h1>

            <Form className='PostProject'
                style={{ padding: 15 }}
                fields={project}
                onFinish={fetchUpdate}
            >
                <Form.Item
                    name='title'
                    label="Title : "
                    style={{ float: "left", marginRight: "15%", marginLeft: "8%", fontWeight: "bold", width: "35%" }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Category :"
                    style={{ fontWeight: "bold" }}
                    name="categories"
                >
                    <Select>
                        <Option value="Web Development">Web Development </Option>
                        <Option value="Mobile Development">Mobile Development</Option>
                        <Option value="UX/UI Design">UX/UI Design</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="duration"
                    label="Duration :"
                    style={{ width: "38%", float: "left", marginRight: "1%", marginLeft: "4.9%", fontWeight: "bold" }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Qualification :"
                    name="qualification"
                    style={{ marginLeft: "56.4%", marginRight: ".1%", fontWeight: "bold" }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="scenarioduration"
                    label="Scenario Duration (minutes) : "
                    style={{ width: "52%", float: "left", marginRight: "13.5%", marginLeft: "-9.2%", fontWeight: "bold" }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Technologies :"
                    style={{ fontWeight: "bold", marginLeft: "2%", width: "43.5%" }}
                    name="technologies"
                >
                    <Select
                        mode="multiple"
                    >
                        <Option value="MERN  ">MERN</Option>
                        <Option value="MEAN  ">MEAN</Option>
                        <Option value="ANGULAR  ">ANGULAR</Option>
                        <Option value="REACT  ">REACT</Option>
                        <Option value="LARAVEL  ">LARAVEL</Option>
                        <Option value="MY SQL  ">MY SQL</Option>
                        <Option value="PHP  ">PHP</Option>
                        <Option value="MONGO  ">MONGO</Option>
                        <Option value=".NET  ">.NET</Option>
                        <Option value="Node.js  ">Node.js</Option>
                        <Option value="Express  ">EXPRESS</Option>
                        <Option value="Java  ">JAVA</Option>
                        <Option value="MS SQL  ">MS SQL</Option>
                        <Option value="Flutter  ">FLUTTER</Option>
                        <Option value="JavaScript  ">JavaScript</Option>
                        <Option value="Vue.js  ">Vue.js</Option>
                        <Option value="RUBY  ">RUBY</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Register Before Date : "
                    name="registerbeforedate"
                    style={{ fontWeight: "bold", marginLeft: "-3.9%" }}
                >
                    <DatePicker
                        format="MM/DD/YYYY"
                        name="registerbeforedate"
                        // value={project.registerbeforedate}
                        style={{ width: "100%" }}
                        disabledDate={disableDate}
                    // onChange={(e) => setRegisterbeforedate(e)}
                    />
                </Form.Item>

                <Form.Item
                    label="Description :"
                    name="description"
                    style={{ fontWeight: "bold", marginLeft: "2.7%" }}
                >
                    <TextArea />
                </Form.Item>

                <Form.Item
                    label="Scenario : "
                    name="scenario"
                    style={{ marginLeft: "8%", fontWeight: "bold", marginLeft: "4.7%" }}
                >
                    <TextArea />
                </Form.Item>

                <Form.Item>
                    <Button
                        htmlType="submit"
                        style={{ float: "left", align: "center", marginLeft: "78.7%", marginRight: "3%", backgroundColor: "#001529", color: "aqua" }}
                    >
                        UPDATE
                    </Button>
                    <Button
                        style={{ align: "center", backgroundColor: "#001529", color: "aqua" }}
                    >
                        <Link to="/postedproject">
                            CANCEL
                        </Link>
                    </Button>
                </Form.Item>

            </Form>
        </CompanyDefaultLayout>
    )
}

export default Edit;




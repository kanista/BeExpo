import React, { useState } from "react";
import CompanyDefaultLayout from "../../layout/CompanyDefaultLayout";
import 'antd/dist/antd.min.css';
import { Form, Button, Input, Select, message, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;



const PostProject = () => {
  
    const [image, setImage] = useState("");
 
    const [form] = Form.useForm();

    const FetchPostProjectData = (values) => {
        // const values = form.getFieldsValue();
        const validInputs="true"
        if (!values.title || !values.categories || !values.scenarioduration || !values.duration || !values.description || !values.scenario || !values.technologies || !values.registerbeforedate || !values.qualification || !image) {
            message.warning("Please fill the all Fields");
            validInputs = false;
        }

        if (validInputs) {
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
                            'Authorization': localStorage.getItem("token")

                        },
                        body: JSON.stringify({
                            ...values,
                            image: data.url
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => {

                            console.log(data);
                            if (data) {
                                form.resetFields();
                                setImage(null);
                                message.success("Project Posted Sucessfully !..");
                            } else {
                                message.error(data.error);
                            }
                           
                        });
                })
                .catch((err) => {
                    console.log(err);
                });

        }

    };

    const handleimagechange = (e) => {

        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0])

        }
    }

    const disableDate = (current) => {
        return current && current.valueOf() < Date.now();
    }


    return (
        <CompanyDefaultLayout>
            <div style={{ padding: 15 }} >
                <h1>About Project Information</h1>

                <Form className='PostProject'
                    form={form}
                    style={{ padding: 15 }}
                    onFinish={FetchPostProjectData}
                >
                    <Form.Item
                        name='title'
                        label="Title : "
                        style={{ float: "left", marginRight: "16%", marginLeft: "8%", fontWeight: "bold", width: "35%" }}
                    >
                        <Input 
                        placeholder="Enter Title"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Category :"
                        style={{ fontWeight: "bold" }}
                        name="categories"
                    >
                        <Select placeholder="Choose Project Category">
                            <Option value="Web and mobile Development ">Web and mobile Development </Option>
                            <Option value="Web Development ">Web Development </Option>
                            <Option value="Mobile Development ">Mobile Development</Option>
                            <Option value="UX/UI Design ">UX/UI Design</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="duration"
                        label="Duration :"
                        style={{ width: "38%", float: "left", marginRight: "1%", marginLeft: "4.9%", fontWeight: "bold" }}
                    >
                        <Input 
                        type="number"
                        placeholder="Enter Duaration (months)"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Qualification :"
                        name="qualification"
                        style={{ marginLeft: "56.4%", marginRight: ".1%", fontWeight: "bold" }}
                    >
                        <Input 
                        placeholder="Enter Qualification"
                        />
                    </Form.Item>

                    <Form.Item
                        name="scenarioduration"
                        label="Scenario Duration (minutes) : "
                        style={{ width: "52%", float: "left", marginRight: "13.5%", marginLeft: "-9.2%", fontWeight: "bold" }}
                    >
                        <Input type="number" 
                        placeholder="Duration for Scenario"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Technologies :"
                        style={{ fontWeight: "bold", marginLeft: "2%", width: "43.5%" }}
                        name="technologies"
                    >
                        <Select
                            mode="multiple"
                            placeholder="Choose Event Technologies"
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
                        style={{ float:"left", fontWeight: "bold", marginLeft: "-3.9%" ,marginRight:"30%"}}
                    >
                        <DatePicker
                            format='YYYY/MM/DD'
                            name="registerbeforedate"
                            style={{width:"175.3%"}}
                            disabledDate={disableDate}
                            // onChange={(e) => setRegisterbeforedate(e)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Poster/Image "
                        style={{ fontWeight: "bold",marginLeft:"61%"}}>

                        <label htmlFor={'imageUplodEle'}>
                            {image ? image.name : 'No file Chosen'}
                            <UploadOutlined style={{color:"blue"}}/>
                        </label>

                        <input
                            hidden
                            id='imageUplodEle'
                            type="file"
                            name="image"
                            onChange={handleimagechange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Description :"
                        name="description"
                        style={{ fontWeight: "bold", marginLeft: "2.7%" }}
                    >
                        <TextArea 
                        placeholder="Enter Descrption"
                        showCount maxLength={300}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Scenario : "
                        name="scenario"
                        style={{ marginLeft: "8%", fontWeight: "bold", marginLeft: "4.7%" }}
                    >
                        <TextArea 
                        placeholder="Enter Seneorio"
                        showCount maxLength={700}
                        style={{height:100}}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            style={{margingTop:"2%",marginLeft: "92%", backgroundColor: "#001529", color: "aqua" }}
                            >
                            POST
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </CompanyDefaultLayout>
    )
}

export default PostProject;


{/* <Form className="PostProject"
                fields={project}
                onFinish={FetchPostProjectData}>

                    <Form.Item
                        label="Title :"
                        style={{ float: "left", marginRight: "16%", marginLeft: "8%", fontWeight: "bold", width: "35%" }}
                    >
                        <Input
                            // placeholder="Enter Title"
                            // name='title'
                            // type="text"
                            // value={title}
                            // onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Category :"
                        style={{ fontWeight: "bold" }}
                    >
                        <Select
                            // value={categories}
                            // placeholder="Choose Project Category"
                            // onChange={(e) => setCategories(e)}
                        >
                            {/* <Option value="">...</Option> */}
{/* <Option value="Web Development ">Web Development </Option>
                            <Option value="Web and Mobile Development ">Web and Mobile Development </Option>
                            <Option value="Mobile Development ">Mobile Development</Option>
                            <Option value="UX/UI Design ">UX/UI Design</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Duration (Months) :"
                        style={{ width: "45.3%", float: "left", marginRight: "1%", marginLeft: "-2.3%", fontWeight: "bold" }}
                    >
                        <Input
                            // type="number"
                            // name="duration"
                            // placeholder="Enter Duaration (months)"
                            // value={duration}
                            // onChange={(e) => setDuration(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Qualification :"
                        style={{ marginLeft: "56.4%", marginRight: ".1%", fontWeight: "bold", width: "43.5%" }}
                    >
                        <Input
                            // type="text"
                            // name="qualification"
                            // placeholder="Enter Qualification"
                            // value={qualification}
                            // onChange={(e) => setQualification(e.target.value)}
                        />
                    </Form.Item>


                    <Form.Item
                        label="Scenario Duration (Minutes) :"
                        style={{ width: "52%", float: "left", marginRight: "13.5%", marginLeft: "-9.2%", fontWeight: "bold" }}
                    >
                        <Input
                            // type="number"
                            // name="scenarioduration"
                            // placeholder="Duration for Scenario"
                            // value={scenarioduration}
                            // onChange={(e) => setScenarioduration(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Technologies :"
                        style={{ fontWeight: "bold", marginLeft: "2%", width: "43.6%" }}
                    >
                        <Select
                            mode="multiple"
                            value={technologies}
                            placeholder="Choose Event Technologies"
                            onChange={(e) => setTechnologies(e)}
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
                        label="Register Before Date :"
                        style={{ width: "46.5%", float: "left", marginRight: "18.7%", marginLeft: "-3.9%", fontWeight: "bold" }}
                    >
                        <Input
                            type="date"
                            name="registerbeforedate"
                            value={registerbeforedate}
                            // min={new Date()}
                            min={disableDate}
                            onChange={(e) => setRegisterbeforedate(e.target.value)}
                        />
                    </Form.Item> */}

{/* <Form.Item
                        label="Register Before Date :"
                        style={{ width: "46.5%", float: "left", marginRight: "18.7%", marginLeft: "-3.9%", fontWeight: "bold" }}
                    >
                        <DatePicker 
                            // value={registerbeforedate}
                            name="registerbeforedate" 
                            onChange={(e) => setRegisterbeforedate(e.target.value)}
                        /> 
                       
                    </Form.Item> */}

{/* <Form.Item
                        label="Image"
                        style={{ fontWeight: "bold" }}>
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
                        label="Description :"
                        style={{ fontWeight: "bold", marginLeft: "2.8%" }}
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
                        label="Selection Scenario :"
                        style={{ marginLeft: "-2.1%", fontWeight: "bold" }}>
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
                            // onClick={() => FetchPostProjectData()}
                            style={{ align: "center", marginLeft: "93%", backgroundColor: "#001529", color: "aqua" }}>
                            POST
                        </Button>
                    </Form.Item> */}

{/* </Form>  */ }
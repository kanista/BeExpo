import React, { useState, useEffect } from "react";
import StudentDefaultLayout from "../../layout/StudentDefaultLayout";
import './project.css';
import { Form, Button, Input, message } from 'antd';
import {  useParams ,useNavigate} from 'react-router-dom';


const ApplyProject = () => {
   const { id } = useParams();
   const navigate=useNavigate();

   const [project, setProject] = useState([]);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [contactno, setContactno] = useState("");
   const [cv, setCv] = useState("");
   const [linkedin, setLinkedIn] = useState("");
   const [question, setQuestion] = useState("");

   
   const fetchData = () => {
      fetch(`http://localhost:5000/project/${id}`, {
         method: "GET",
         headers: {
         "Content-Type": "application/json",
         'Authorization':localStorage.getItem("token")

      }
   })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            setProject(data);
            //  setQuestion(data.scenario);
            //  console.log(question);
         });
   }

   useEffect(() => {
      fetchData()
   }, [])


   const FetchApplyProjectData = () => {
      let validInputs = true;
      let letters = /^[A-Za-z]+$/;
      

      const validateEmail = (email) => {
         const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return regex.test(email);
      }

      const urlPatternValidation = (linkedin) => {
         const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
         return regex.test(linkedin);
      }

      const phoneNumber = (contactno) => {
         const regex = new RegExp(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/);
         return regex.test(contactno);
      }
      //  || !question

      if (!name || !email || !contactno || !cv || !linkedin) {
         message.warning("Please fill the all Fields");
         validInputs = false;
      } else if (!name.match(letters)) {
         message.warning("Wrong Name Format Name only have string!");
         validInputs = false;
      } else if (!validateEmail(email)) {
         message.warning("wrong Email Format");
         validInputs = false;
      } else if (!contactno.length > 10 || !phoneNumber(contactno)) {
            message.warning("Invalid Phone Number Format");
            validInputs = false;  
      }
      else if (!urlPatternValidation(linkedin)) {
         message.warning("wrong URL Format");
         validInputs = false;
      }

      if (validInputs) {
         const data = new FormData();
         data.append("file", cv);
         data.append("upload_preset", "BeExpo");
         data.append("cloud_name", "detwomtuw");
         fetch("https://api.cloudinary.com/v1_1/detwomtuw/image/upload", {
            method: "POST",
            body: data,
         })
            .then((res) => res.json())
            .then((data) => {
               console.log(data.url);
               fetch("http://localhost:5000/project/newapply", {
                  method: "POST",
                  headers: {
                  "Content-Type": "application/json",
                  'Authorization':localStorage.getItem("token")
                  },
                  body: JSON.stringify({
                     name: name,
                     email: email,
                     contactno: contactno,
                     linkedin: linkedin,
                     cv: data.url,
                     question: project.scenario,
                     projectId:project._id
                  }),
               })
                  .then((res) => res.json())
                  .then((data) => {
                     console.log(data);
                     navigate(`/project/description/${id}/applyproject/${id}/question?reference=${data._id}`);
                  });
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };
   console.log(
      name,
      email,
      contactno,
      linkedin,
      cv
   )

   const handleFileChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
         setCv(e.target.files[0])
      }
   }

   return (
      <StudentDefaultLayout>
         <div className="ApplyProject">

            <h1> Apply for Project</h1>

            <Form style={{ padding: 15, marginLeft: "20%" }}>

               <Form.Item
                  label="Name :"
                  style={{ marginLeft: "5.8%", color: "#001529", fontWeight: "bold", width: "50%" }}
               >
                  <Input
                     placeholder="Enter Name"
                     name="name"
                     value={name}
                     type="text"
                     onChange={(e) => setName(e.target.value)}
                  // required
                  />
               </Form.Item>

               <Form.Item
                  label="Email :"
                  style={{ marginLeft: "6.5%", color: "#001529", fontWeight: "bold", width: "49.3%" }}
               >
                  <Input
                     type="email"
                     placeholder="Enter Email"
                     name="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  // required
                  />
               </Form.Item>

               <Form.Item
                  label=" Contact No :"
                  style={{ marginLeft: "1.2%", color: "#001529", fontWeight: "bold", width: "54.5%" }} >
                  <Input
                     type="number"
                     placeholder="Enter Contact No"
                     name="contactno"
                     value={contactno}
                     onChange={(e) => setContactno(e.target.value)}
                  // required
                  />
               </Form.Item>

               <Form.Item
                  label="LinkedIn "
                  style={{ marginLeft: "3.9%", color: "#001529", fontWeight: "bold", width: "51.6%" }}>

                  <Input
                     type="url"
                     placeholder="Enter LinkedIn"
                     name="linkedin"
                     value={linkedin}
                     onChange={(e) => setLinkedIn(e.target.value)}
                  // required
                  />
               </Form.Item>

               <Form.Item
                  label="CV"
                  style={{ marginLeft: "9%", color: "#001529", fontWeight: "bold", width: "46.7%" }}>
                  <Input
                     type="file"
                     placeholder="choose ur CV"
                     // style={{width:"245px",display:"inline"}}
                     // value={cv}
                     onChange={handleFileChange}
                  // required
                  />
               </Form.Item>

               <Form.Item>
                  <Button
                     
                     onClick={() => FetchApplyProjectData()}
                     style={{ align: "center", marginLeft: "18%", backgroundColor: "#001529", color: "aqua" }}
                  >
                        Answer For Selection Question
                  </Button>
               </Form.Item>


            </Form>
         </div>
      </StudentDefaultLayout>

   )
}

export default ApplyProject;
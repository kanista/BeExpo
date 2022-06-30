import React, { useState, useEffect } from 'react';
import CompanyDefaultLayout from "../../layout/CompanyDefaultLayout";
import { useParams, Link } from 'react-router-dom';
import moment from "moment";
import { Button } from 'antd';
import 'antd/dist/antd.min.css';
import './view.css'

export default function ViewProject() {

  const { id } = useParams();
  const [project, setProject] = useState([]);

  const fetchData = () => {
    fetch(`http://localhost:5000/project/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("token")
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProject(data);
      });
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(`{project.title}`);
  return (
    <CompanyDefaultLayout>
      <div className="viewproject" >
        <h2 style={{ color: "#001529", textAlign: "center" }}>{project.title}</h2>
        <div>
          <img src={project.image}
            style={{ border: " aqua", boxShadow: "4px 4px 8px #888888", width: "950px", height: "450px", marginLeft: "10%" }} />
        </div>

        <br />
        <h6> {project.description}</h6>
        <br /><br />

        <p className='para'
          style={{ marginLeft: "36.8%" }}
        >Category :
        </p>
        <h6>{project.categories}</h6><br /><br />

        <p className='para'
          style={{ marginLeft: "36.8%" }}
        >Duration :
        </p>
        <h6>{project.duration} months</h6><br /><br />

        <p className='para'
          style={{ marginLeft: "34.5%" }}
        >Technologies :
        </p>
        <h6>{project.technologies}</h6><br /><br />

        <p className='para'
          style={{ marginLeft: "30.4%", color: "#001529" }}
        >Register Before Date :
        </p>
        <h6><>{moment(project.registerbeforedate).format("MMM DD yyyy")}</></h6><br /><br />

        <p className='para'
          style={{ marginLeft: "34.5%", color: "#001529" }}
        >Qualification :
        </p>
        <h6>{project.qualification} </h6><br /><br />

        <p className='para'
          style={{ marginLeft: "31.5%", color: "#001529" }}
        >Scenario Duration :
        </p>
        <h6>{project.scenarioduration} minutes</h6> <br /><br />

        {/* <p 
          style={{ marginLeft: "0.9%",color:"#001529" ,marginLeft:"45%"}}
          >Selection Scenario :
        </p><br/> */}
        <h6>{project.scenario}</h6><br /><br />

        <Button
          style={{ align: "center", marginLeft: "93%", backgroundColor: "#001529", color: "aqua" }}
        >
          <Link to="/postedproject">
            BACK
          </Link>
        </Button>

      </div>
    </CompanyDefaultLayout>

  )
}

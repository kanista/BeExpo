import React, { useState, useEffect } from 'react';
import StudentDefaultLayout from "../../layout/StudentDefaultLayout";
import { useParams, Link } from 'react-router-dom';
import moment from "moment";
import { Button } from 'antd';
import 'antd/dist/antd.min.css';
import './view.css'

export default function ViewAppliedProject() {

  const { id } = useParams();
  const [appliedProjectData, setAppliedProjectData] = useState(null);

  const fetchData = () => {
    fetch(`http://localhost:5000/project/appliedproject/${id}`, {
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
        setAppliedProjectData(data);
        console.log(data);
      });
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <StudentDefaultLayout>
      <div className="viewproject" >
        <h2 style={{ color: "#001529", textAlign: "center" }}>Applied Project Information</h2>

        <lable htmlFor="title"
          style={{ marginLeft: "10%" }}
          className="lables">Title :
        </lable>
        <h6>{appliedProjectData && appliedProjectData.applyFor.title}</h6>
        <br /><br />

        <lable htmlFor="categories"
          style={{ marginLeft: "6.3%" }}
          className="lables">Categorty :
        </lable>
        <h6>{appliedProjectData && appliedProjectData.applyFor.categories}</h6>
        <br /><br />

        <lable htmlFor="scenarioduration"
          style={{ marginLeft: "1%" }}
          className="lables">Scenario Duration :
        </lable>
        <h6>{appliedProjectData && appliedProjectData.applyFor.scenarioduration} minutes</h6>
        <br /><br />

        <lable htmlFor="duration"
          style={{ marginLeft: "6.9%" }}
          className="lables">Duration :
        </lable>
        <h6>{appliedProjectData && appliedProjectData.applyFor.duration} months</h6>
        <br /><br />

        <lable htmlFor="technologies"
          style={{ marginLeft: "4.2%" }}
          className="lables">Technologies :
        </lable>
        <h6>{appliedProjectData && appliedProjectData.applyFor.technologies}</h6>
        <br /><br />

        <lable htmlFor="qualification"
          style={{ marginLeft: "5.7%" }}
          className="lables" >AppliedOn :
        </lable>
        <h6 style={{ textAlign: "justify" }}>{moment(appliedProjectData && appliedProjectData.appliedOn).format("MMM DD yyyy")}</h6>
        <br /><br />

        <lable htmlFor="description"
          style={{ marginLeft: "5.2%" }}
          className="lables">Description :
        </lable>
        <h6 style={{ textAlign: "justify" }}> {appliedProjectData && appliedProjectData.applyFor.description}</h6>
        <br /><br />

        <lable htmlFor="scenario"
          style={{ marginLeft: "0.9%" }}
          className="lables">Selection Scenario :
        </lable>
        <h6>{appliedProjectData && appliedProjectData.applyFor.scenario}</h6>
        <br /><br />

        <lable htmlFor="answer"
          style={{ marginLeft: "0.3%" }}
          className="lables">Answer of Scenario  :
        </lable>
        <h6>{appliedProjectData && appliedProjectData.answer}</h6>
        <br /><br />

        <Button
          style={{ align: "center", marginLeft: "93%", backgroundColor: "#001529", color: "aqua" }}
        >
          <Link to="/appliedproject">
            BACK
          </Link>
        </Button>

      </div>
    </StudentDefaultLayout>

  )
}

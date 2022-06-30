import React, { useState, useEffect } from "react";
import "./project.css"
import { Button, Form } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { useParams } from 'react-router-dom';
import StudentDefaultLayout from "../../layout/StudentDefaultLayout";
import Countdown from 'react-countdown';
import { useNavigate, useSearchParams } from "react-router-dom"

const Question = (match) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [project, setProject] = useState({})

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

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      FetchApplyProjectData();
      // alert("time up")
      return null;
    } else {
      // Render a countdown
      return (
        <Button
          style={{ backgroundColor: "#001529", color: "aqua", marginLeft: "70%" }}
        >
          <span>Time left : {hours} hours {minutes} Minutes {seconds} Seconds</span>
        </Button>
      )
    }
  };

  const FetchApplyProjectData = (values) => {

    fetch(`http://localhost:5000/project/appliedproject/${searchParams.get('reference')}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify({
        answer: values.answer
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate(`/project/description/${id}/applyproject/${id}/question/${id}/preview?reference=${data._id}`);
      });
  }


  return (
    <StudentDefaultLayout >
      <div>
        {project.scenario && <Countdown
          date={Date.now() + project.scenarioduration * 60 * 1000}
          renderer={renderer}

        />}
        <h1> Answer for Selection Scenario</h1>
        <Form style={{ padding: 30 }} onFinish={FetchApplyProjectData} >
          <Form.Item label="Scenario" style={{ fontWeight: "bold" }} >
            <TextArea
              disabled
              style={{ height: 120, width: "80%", fontWeight: "bold", color: "gray", textAlign: "justify" }}
              value={project.scenario}
            />
          </Form.Item>

          <Form.Item label="Answer" style={{ fontWeight: "bold", marginLeft: 9 }} name="answer" >
            <TextArea
              showCount maxLength={500}
              style={{ height: 200, width: "80%", textAlign: "justify" }}
              placeholder="Type your Answer"
              required
            >
            </TextArea>
          </Form.Item>

          <Form.Item>
            <Button
              // onClick={() => FetchApplyProjectData()}
              htmlType="submit"
              style={{ marginLeft: "75%", backgroundColor: "#001529", color: "aqua" }}
            >
              Submit
            </Button>
          </Form.Item>

        </Form>

      </div>

    </StudentDefaultLayout>
  )
}

export default Question;

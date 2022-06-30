import React, { useState, useEffect } from "react";
import "./project.css"
import { Button, Form } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { useParams, Link , useSearchParams} from 'react-router-dom';
import StudentDefaultLayout from "../../layout/StudentDefaultLayout";

const Preview = (match) => {
  const { id } = useParams();
  const [appliedProjectData, setappliedProjectData] = useState({})
  const [searchParams] = useSearchParams();

  const fetchData = () => {
    fetch(`http://localhost:5000/project/appliedproject/${searchParams.get('reference')}`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization':localStorage.getItem("token")
    }
  })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setappliedProjectData(data);
      });
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <StudentDefaultLayout >
      <div>
        <h1> Answer of Selection Scenario</h1>
        <Form style={{ padding: 30 }} >
          <Form.Item label="Scenario" style={{ fontWeight: "bold" }} >
            <TextArea
              disabled
              style={{ height: 120, width: "80%" ,textAlign:"justify",color:"gray",fontWeight:"bold" }}
              value={appliedProjectData.question}
            />
          </Form.Item>

          <Form.Item label="Answer" style={{ fontWeight: "bold", marginLeft: 9 }} >
            <TextArea
              value={appliedProjectData.answer}
              disabled
              style={{ height: 200, width: "80%",textAlign:"justify",color:"gray",fontWeight:"bold"  }}
            >
            </TextArea>
          </Form.Item>

          <Form.Item>
            <Button
              style={{ marginLeft: "75%", backgroundColor: "#001529", color: "aqua" }}
            >
              <Link to="/projectcard">Back </Link>
            </Button>
          </Form.Item>

        </Form>

      </div>

    </StudentDefaultLayout>
  )
}

export default Preview;


import React, { useEffect, useState } from "react";
import StudentDefaultLayout from "../../Layout/StudentDefaultLayout";
import BlogCard from "./BlogCard";
import styles from "./BlogHomePage.module.css";
import { message } from "antd";
import axios from "axios";
import {Link} from "react-router-dom"


const BlogHomePage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // const postDetails=()=>{
  //   const data=new FormData()
  //   data.append("file",photo)
  //   data.append("upload_preset","Blog-clone")
  //   data.append("cloud_name",saru99)
  //   fetch("https://api.cloudinary.com/v1_1/saru99/photo/upload",{
  //     method:"post",
  //     body:data
  // })
  //   .then(res=>res.json())
  //   .then(data=>{
  //     console.log(data)
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })
  // }

  useEffect(() => {
    axios.get("http://localhost:8080/api/blog/allblogs")
      .then((data) => {
        console.log(data.data)
        setBlogs(data.data);

      }).catch((e) => {
        console.log(e);
      });
  }, []);


  return (
    <div>
      <StudentDefaultLayout>
        <input
          type="text"
          name="search"
          placeholder="Search.."
          className={styles.search}
        />
        <button>
            <Link to="/blog/createblog">
                Create Blog
            </Link>
        </button>
        <div className={styles.container}>
          <div className={styles.left}>
            {blogs.map((blog) => <BlogCard blog={blog} />)}
          </div>
        </div>
      </StudentDefaultLayout>
    </div>
  );
};

export default BlogHomePage;
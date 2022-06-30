import React from 'react'
import StudentDefaultLayout from "../../Layout/StudentDefaultLayout";
import axios from "axios";
import styles from "./BlogHomePage.module.css";

export default function CreateBlog() {
    const FetchPostBlogData = () => {
        axios.post("http://localhost:8080/api/blog/createblog", { title, category, message, photo })
          .then((data) => {
            if (data.status === 200) {
              return axios.get("http://localhost:8080/api/blog/allblogs")
                .then((data) => {
                  setBlogs(data.data);
    
                })
    
            }
          }).catch((e) => {
            console.log(e);
          });
      };


  return (
    <div>
        <StudentDefaultLayout>
        <div className={styles.right}>
            <h1 className={styles.head}>Write Your Blog Here</h1>
            <lable hemlFor="title">Title  </lable>
            <input
              className={styles.hi}
              type="text"
              id="fname"
              name="title"
              placeholder="title of the blog"
            onChange={(e) => setTitle(e.target.value)} 
            />

           
            <lable hemlFor="category">Category  </lable>
            <select className={styles.hi} onChange={(e) => setCategory(e.target.value)}>

              <option value="australia">Experince</option>

              <option value="software">Software</option>
              <option value="Web Development">Web Development </option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Frontend Development">
                Frontend Development{" "}
              </option>
              <option value="Backend  Development">Backend Development</option>
              <option value="UX/UI Design ">UX/UI Design</option>
              <option value="Data Science">Data Science</option>
              <option value="Full Stack Development">
                Full Stack Development
              </option>
            </select>
            <lable hemlFor="message">Message  </lable>
            <textarea className={styles.hi + " " + styles.hii} onChange={(e) => setMessage(e.target.value)}>
              Write...
            </textarea>
            <lable hemlFor="image">Image  </lable>
            <input
              type="file"
              id="myFile"
              name="filename"
              onChange={(e) => setPhoto(e.target.files[0])}
              className={styles.hi}
            ></input>
            <br />
            <button
              onClick={() => FetchPostBlogData()}>

              post
            </button>
          </div>
        </StudentDefaultLayout>
    </div>
  )
}

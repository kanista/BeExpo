import React from "react";
import routes from "./routes"

import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom"


const App = () => {
  const getRoutes=()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const token = localStorage.getItem("token");
    if(!token){
      return routes.auth.map(route=><Route key={route.path} path={route.path} element={route.component}/>);
      }      
    switch(user.role){
      case "student":
       return routes.student.map(route=><Route key={route.path} path={route.path} element={route.component}/>);
       case "company":
        return routes.company.map(route=><Route key={route.path} path={route.path} element={route.component}/>);
        case "mentor":
       return routes.mentor.map(route=><Route key={route.path} path={route.path} element={route.component}/>);
       default :
        return null;

    }
    
    
  }
  const getHomePage=()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if(!token){
      return "/login"
      } 
    switch(user.role){
      case "student":
       return '/student';
       case "company":
        return '/company';
        case "mentor":
       return '/mentor';
       default :
        return "/login";

    }
  }
  return (

    <Router>
     <Routes>
   
    
      {getRoutes()}
      <Route
        path="*"
        element={<Navigate to={getHomePage()}  />}
      />

      </Routes>

    </Router>

  );
}

export default App;

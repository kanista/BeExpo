import Description from "./component/project/Description";
import ApplyProject from "./component/project/ApplyProject";
import AppliedProject from "./component/project/AppliedProject";
import ViewAppliedProject from "./component/project/ViewAppliedProject";
import PostProject from "./component/project/PostProject";
import PostedPro from "./component/project/PostedPro";
import ProjectCard from "./component/project/ProjectCard";
import Question from "./component/project/Question";
import Edit from "./component/project/Edit";
import ViewProject from "./component/project/ViewProject";
import Preview from "./component/project/Preview";

import ProfileStudent from "./component/common/ProfileStudent";
import ProfileMentor from "./component/common/ProfileMentor";
import ProfileCompany from "./component/common/ProfileCompany";
import CreateSession from "./component/mentor/CreateSession";
import MentorCard from "./component/mentor/MentorCard";

import MentorAbout from "./component/mentor/MentorAbout";
import Profile from "./component/mentor/Profile";
import BookedSession from "./component/mentor/BookedSession";
import Appointments from "./component/mentor/Appointments";

import Login from "./component/Login";
import Register from"./component/UserRegister";

        

const authRoutes = [
    {
        path: "/login",
        component: <Login />
    },
    {
        path: "/register",
        component: <Register />
    }
]

const StudentRoutes = [
    {
        path: "/project/description/:id" ,
        component: <Description />,
       
    },
    
    {
        path: "/student",
        component: <ProfileStudent />,
       
    },
    {
        path: "/project/description/:id/applyproject",
        component: <ApplyProject  />,
       
    },
    {
        path: "/appliedproject",
        component: <AppliedProject />,
       
    },
    {
        path: "/project/appliedproject/:id/view",
        component: <ViewAppliedProject />,
       
    },
    {
        path: "/projectcard" ,
        component: <ProjectCard />,
       
    },
    {
        path: "/project/description/:id/applyproject/:id/question",
        component: <Question />,
       
    },
    {
        path: "/project/description/:id/applyproject/:id/question/:id/preview",
        component: <Preview  />,
       
    },
    {
        path: "/mentorcard",
        component: <MentorCard />,
       
    },
     
    {
        path: "/mentorcard/profile/:id",
        component: <Profile />,
       
    },
    {
        path: "/getappointment",
        component: <Appointments  />,
       
    }
]
const MentorRoutes=[
    {
        path: "/aboutmentor",
        component: <MentorAbout  />
       
    },
    {
        path: "/createsession",
        component: <CreateSession  />
       
    },
    {
        path: "/bookedsession",
        component: <BookedSession  />
       
    },
    {
        path: "/mentor" ,
        component: <ProfileMentor />
       
    },
    {
        path: "/bookedsession" ,
        component: <BookedSession />
       
    }
]

const CompanyRoutes=[
    {
        path: "/postproject",
        component: <PostProject  />
       
    },
    {
        path: "/PostedProject",
        component: <PostedPro  />
    },
    {
        path: "/postedproject/edit/:id",
        component: <Edit  />

    },
    {
        path: "/postedproject/view/:id" ,
        component: <ViewProject  />
    },
    {
        path: "/company" ,
        component: <ProfileCompany  />
    }
]


export default{
    auth: authRoutes,
    mentor:MentorRoutes,
    student:StudentRoutes,
    company:CompanyRoutes
} ;
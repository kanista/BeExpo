require("dotenv/config");
const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require("./db.js");
const bcrypt = require("bcryptjs");
const cors = require('cors');
const {auth}=require('./Auth')
const mongoose=require("mongoose")


const Project = require('./models/projectModel');
const ApplyProject = require('./models/ApplyProject');
const Mentor = require('./models/Mentor');
const Session = require('./models/Session');
const Student = require('./models/Student');
const Company=require('./models/Company');
const Appointment = require('./models/Appointment');
const UserModel=require("./models/UserModel");

const jwt=require("jsonwebtoken");

const app = express();
app.use(cors());
connectDB();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.route("/login").post(async (req, res) => {
    try{
    const { email, password } = req.body;


    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json( "The selected email is invalid.")
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (user && isPasswordCorrect) {
      const token = jwt.sign(
        {
            id:user._id,role:user.role,email:user.email,username:user.username,mobile:user.mobile
        },
        process.env.JWT_SECRET_KEY,
        {
          algorithm: "HS256",
        //   expiresIn: "15m",
        }
      );
      
        let userDetails;
        if(user.role==="student"){
            userDetails=await Student.findOne({user:user._id})
        }
        if(user.role==="mentor"){
            userDetails=await Mentor.findOne({user:user._id})
        }
        if(user.role==="company"){
            userDetails=await Company.findOne({user:user._id})
        }
        let userResponse={id:user._id,role:user.role,email:user.email,username:user.username,mobile:user.mobile}
        if(userDetails){
            userResponse={...userResponse,...userDetails._doc}
        }
      return  res.status(200).json({token: token,user:userResponse})
        } else {
        return  res.status(400).json("Your password is incorrect!") ;
        }
  }catch (error) {
    return res.status(500).json("Server Error!") ;
  }

});

app.route("/register").post(async (req, res) => {
    try{
        const {role,username,mobile,password,email} = req.body;
    
        const user = await UserModel.find( {
            $or: [
              { username: username },
              { email: email }
            ]}
          );
    console.log(user);
        if (user.length>0) {
          return res.status(400).json( "Email and Username should be quiue");
          }
          const newUser = new UserModel({
            role:role,username:username,mobile:mobile,password:password,email:email
        });
        await newUser.save();
          return  res.status(200).json("User successfully register")
      }catch (error) {
        return res.status(500).json(error) ;
        return res.status(500).json("Server Error!") ;
      }
});

app.use(auth);

//@path /project/newproject
//@desc adding new project
//@method post
//@access public

app.route("/project/newproject").post(async (req, res) => {
    let newProject = await new Project({...req.body,postedBy:req.user.id});
    // console.log(newProject.postedprojectdate);
    newProject.save((err, project) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(project);

    });
});

//@path /project/postedproject
//@desc get all postedproject
//@method get
//@access public

app.route('/project/postedproject').get((req, res) => {
    if(req.user.role==='company'){
   return Project.find({postedBy:req.user.id}, (err, project) => {
        if (err) {
            res.send(err);
        }
        res.json(project);
    });
}else
{
   return Project.find({}, (err, project) => {
        if (err) {
            res.send(err);
        }
        res.json(project);
    });
}
});

//@path /project/appliedproject
//@desc get all appliedproject
//@method get
//@access public

app.route('/project/appliedproject').get(async (req, res) => {
    try{
        const data = await ApplyProject.find({appliedBy:req.user.id}).populate('applyFor');
       return res.json(data);
    }catch(e){
        return res.status(500).json("Server Error!")
    }
    
    // ApplyProject.find({},(err,applied)=>{
    //     if(err){
    //         res.send(err);
    //     }
    //     console.log(applied);
    //     res.json(applied);
    // });
});


//@path /project/:projectId
//@desc get postedproject by Id
//@method get
//@access public

app.route('/project/:projectId').get((req, res) => {
    Project.findById(req.params.projectId, (err, project) => {
        console.log(project.scenario)
        if (err) {
            res.send(err);
        }
        res.json(project);
        console.log(project.title);
    });
});

//@path /project/:projectId
//@desc edit postedproject by Id
//@method put
//@access public

app.route('/project/:projectId').put((req, res) => {
    Project.findOneAndUpdate(
        { _id: req.params.projectId }, req.body,
        { new: true, useFindAndModify: false },
        (err, project) => {
            if (err) {
                res.send(err);
                console.log("updated");
            }
            res.json(project);

        });
});

//@path /project/:projectId
//@desc delete postedproject by Id
//@method delete
//@access public

app.route('/project/:projectId').delete((req, res) => {
    Project.remove(
        { _id: req.params.projectId }, (err, message) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "project deleted" });
        });
});


// student side API 

//@path /project/newapply
//@desc appling new project
//@method post
//@access public

app.route("/project/newapply").post(async (req, res) => {
    let newApply = await new ApplyProject({...req.body,appliedBy:req.user.id,applyFor:mongoose.Types.ObjectId(req.body.projectId)});
    console.log(newApply.name);
    newApply.save((err, apply) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(apply);

    });
});


//@path /project/appliedproject/:projectId
//@desc get appliedproject by Id
//@method get
//@access public

app.route('/project/appliedproject/:appliedId').get((req, res) => {
    ApplyProject.findById(req.params.appliedId).populate("applyFor").exec((err, appliedPro) => {
        console.log(appliedPro.scenario)
        if (err) {
            res.send(err);
        }
        res.json(appliedPro);
        console.log(appliedPro.question);
    });
});


//@path /project/appliedproject/:projectId
//@desc updata appliedproject by Id
//@method put
//@access public

app.route('/project/appliedproject/:appliedId').put((req, res) => {
    ApplyProject.findByIdAndUpdate({_id:req.params.appliedId},{$set:{answer:req.body.answer}},{new:true}, (err, appliedPro) => {
        if (err) {
            res.send(err);
        }
        res.json(appliedPro);
        console.log(appliedPro.question);
    });
});



// for Session

// Mentor Side API

// @path /mentor/createsession
// @desc creating new session
// @method post
// @access public

app.route("/mentor/createsession").post((req, res) => {
    let newSession = new Session({...req.body,postedBy:mongoose.Types.ObjectId(req.user.id)});
    newSession.save((err, session) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(session);
        console.log(session);

    });
});

//@path /mentor/createdSession
//@desc get all createdSession
//@method get
//@access public

// app.route('/mentor/createdsession').get((req, res) => {
//     Session.find({}, (err, session) => {
//         if (err) {
//             res.send(err);
//             console.log(err);
//         }
//         res.json(session);
//         console.log(session);
//     });
// });

//@path /mentor/createdSession
//@desc get all createdSession
//@method get
//@access public

app.route('/session/:mentorId').get((req, res) => {
    Session.find({postedBy:mongoose.Types.ObjectId(req.params.mentorId)}, (err, session) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(session);
        console.log(session);
    });
});



//  appointment

app.route('/getAppointment').get(async (req, res) => {
    // const data = await Appointment.find().
    // res.json(data);
    if(req.user.role==='mentor'){
        return Appointment.find({mentor:mongoose.Types.ObjectId(req.user.id)}).populate('student').populate('mentor').populate('session').exec((err, appoint) => {
             if (err) {
                 res.send(err);
             }
             res.json(appoint);
         });
     }else if(req.user.role==='student')
     {
        return Appointment.find({student:mongoose.Types.ObjectId(req.user.id)}).populate('student').populate('mentor').populate('session').exec( (err, appoint) => {
             if (err) {
                 res.send(err);
             }
             res.json(appoint);
         });
     }
});

// post session
app.route("/mentor/createsession").post((req, res) => {
    let newSession = new Session(req.body);
    newSession.save((err, session) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(session);
        console.log(session);

    });
});

app.route('/putAppointment').post(async (req, res) => {
    // const data = await Appointment.find().populate('student').populate('mentor').populate('session')
    let newAppointment = new Appointment({...req.body,student:mongoose.Types.ObjectId(req.user.id)});
    newAppointment.save((err, appoint) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(appoint);
        console.log(appoint);

    });
});

// delete Appointment

app.route('/putAppointment/:appointId').delete((req, res) => {
    Appointment.remove(
        { _id: req.params.appointId }, (err, message) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Appointment deleted" });
        });
});


// for mentor

// @path /mentor/newmentor
// @desc adding new mentor
// @method post
// @access public

app.route("/mentor/newmentor").put(async(req, res) => {
   try{
    const isExists =await  Mentor.findOne({user:mongoose.Types.ObjectId(req.user.id)});
   let newMentor;
        if(!isExists){
             newMentor = new Mentor({...req.body,user:mongoose.Types.ObjectId(req.user.id)}); 
           await newMentor.save()
        }else{
            console.log(req.body);
             newMentor = await Mentor.findOneAndUpdate({user:mongoose.Types.ObjectId(req.user.id)}, req.body)    

        }
        await UserModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.user.id)},{references:mongoose.Types.ObjectId(newMentor._id),modelType:req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1)})
    return res.status(200).json(newMentor._doc);
    }catch(e){
        return res.status(500).json(e) ;
    }
       
});



//@path /mentor/mentorprofile
//@desc get all mentor details
//@method get
//@access public

app.route('/mentor/mentorprofile').get((req, res) => {
    Mentor.find({}, (err, mentor) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(mentor);
        console.log(mentor);
    });
});

//@path /mentor/:mentorId
//@desc get mentor by Id
//@method get
//@access public

app.route('/mentor/:mentorId').get((req, res) => {
    Mentor.findById(req.params.mentorId).populate("user").exec((err, mentor) => {
        if (err) {
            res.send(err);
        }
        res.json(mentor);
        console.log(mentor.position);
    });
});


// student

//@path /newstudent
//@desc post new student details
//@method post
//@access public

app.route("/newstudent").post(async (req, res) => {
    let newStudent = await new Student(req.body);
    // console.log(newProject.postedprojectdate);
    newStudent.save((err, student) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(student);

    });
});

//@path /getstudent
//@desc get all  student details
//@method get
//@access public

app.route("/getstudents").get(async (req, res) => {
    Student.find({}, (err, student) => {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.json(student);
        console.log(student);
    });
});

app.listen(PORT, console.log(`server starting in mode on port ${PORT}`));


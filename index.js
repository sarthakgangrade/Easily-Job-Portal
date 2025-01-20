// Please don't change the pre-written code
// Import the necessary modules here
import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import userController from "./src/controller/userController.js"
import JobController from "./src/controller/JobController.js"
import applicantController from "./src/controller/ApplicantController.js"
import cookieParser from "cookie-parser";
import { auth } from "./src/middleware/auth.js";
import {UploadFile} from "./src/middleware/fileUploadMiddleware.js"
import {setLastvisit} from "./src/middleware/Lastvisit.js"
import { registerValidation } from "./src/middleware/validations.js"

const app = express();

// Implement the necessary Express Session here
app.use(
  session({
    secret: "abra ka dabra",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 day expiration
  })
);

const UsersController=new userController();
const jobController=new JobController();
const ApplicantController=new applicantController();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(setLastvisit);
//app.use(express.urlencoded({ extended: false }));
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));



//usercontroller
app.get('/', UsersController.getWelcome);
app.get("/login", UsersController.getLogin);
app.get("/logout", UsersController.userLogout);

app.post("/register",registerValidation, UsersController.register);
app.post("/login",UsersController.login)

//jobController
app.get("/AllJob", jobController.AllJob);
app.get("/PostNewJob",auth, jobController.getNewJob);
app.get("/JobDetails/:id",jobController.getJobDetails);
app.get("/UpdateJob/:id",jobController.UpdateJob);
app.get("/DeleteJob/:id",jobController.DeleteJob);


app.post("/PostNewJob",auth, jobController.PostNewJob)
app.post("/UpdateJob/:id",jobController.PostUpdateJob);
app.post("/Search",jobController.searchJob);

//Applicant routes

app.get("/applicants/:id",jobController.GetApplicants);
app.post(
  "/submitApplication",
  UploadFile.single("resume"),
  ApplicantController.addingApplicants
);


export default app;

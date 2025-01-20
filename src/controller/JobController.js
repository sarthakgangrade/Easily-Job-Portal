import{JobListAll,PostJob,getJobById,DeleteJobId,searchResult,permissionToUpdate} from "../models/Job.model.js"

export default class JobController{
    AllJob(req,res){
        const jobs=JobListAll();
        const page = +req.query.page || 1; // Current page number, default is 1
        const ITEMS_PER_PAGE = 1;
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = page * ITEMS_PER_PAGE;

        const paginatedJobs = jobs.slice(startIndex, endIndex);
        const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
        return res.render("AllJob",{
            jobs:paginatedJobs,
            userEmail:req.session.userEmail,
            username:req.session.userName,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < jobs.length,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: totalPages,
        });
    }


    getNewJob(req,res){
        return res.render("PostNewJob",{
            userEmail:req.session.userEmail,
            username:req.session.userName
        });
    }

    
    
    PostNewJob(req,res){
        //const { username, email, password } = req.body;
        PostJob(req.body,req.session.userName); 
        return res.redirect("/AllJob");
    }
            
    getJobDetails(req,res){
        const jobId = req.params.id;
        const job = getJobById(jobId);
        if (!job) {
            return res.status(404).send("Job not found");
        }

        return res.render("JobDetails", {
            job: job,
            userEmail: req.session.userEmail,
            username: req.session.userName,
            errors:[]
        });
    }

    UpdateJob(req,res){
        const jobId=req.params.id;
        const recruiterName=req.session.userName;
        const Allowed=permissionToUpdate(recruiterName);
        const job = getJobById(jobId);
        const errors=[];
        //const Allowed=permissionToUpdate(recruiterName);
        if(Allowed){
            return res.render("UpdateJob",{
            job:job,
            userEmail:req.session.userEmail,
            username:req.session.userName
        });}
        else{
            errors.push("You are not allowed to update only recruiter who created the job can")
            return res.render("JobDetails", {
                job: job,
                userEmail: req.session.userEmail,
                username: req.session.userName,
                errors:errors
            });
        }
    }

    PostUpdateJob(req,res){
        const jobId = req.params.id;
        const { jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofposition } = req.body;
        const job = getJobById(jobId);
        job.jobcategory = jobcategory;
        job.jobdesignation = jobdesignation;
        job.joblocation = joblocation;
        job.companyname = companyname;
        job.salary = salary;
        job.applyby = applyby;
        job.skillsrequired = skillsrequired;
        job.numberofposition = numberofposition;
        return res.redirect(`/JobDetails/${jobId}`);
    }

    DeleteJob(req,res){
        const jobId = req.params.id;
        const deleted=DeleteJobId(jobId)
        return res.redirect("/AllJob")    
    }


    GetApplicants=(req,res)=>{
        const jobId = req.params.id;
    
        // Retrieve the job by ID from your data source (e.g., database)
        const job = getJobById(jobId);
    
        // Render the view with the applicants data
        return res.render("appilicantList", {
            job: job,
            applicants: job.applicants,
            userEmail: req.session.userEmail,
            username: req.session.userName
        });
    };

    searchJob = (req, res, next) => {
        const { name } = req.body;
        const jobs = searchResult(name);
        return res.render("AllJob",{
            jobs:jobs,
            userEmail:req.session.userEmail,
            username:req.session.userName
        });
      };
}

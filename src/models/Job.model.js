import { applicants } from "./Applicant.model.js";

class JobModel{
    constructor(
        id,
        jobcategory,
        jobdesignation,
        joblocation, 
        companyname, 
        salary, 
        applyby, 
        skillsrequired, 
        numberofopenings, 
        jobposted,
        CreatedBy, 
        applicants
    ) 
    {
        this.id = id;
        this.jobcategory = jobcategory;
        this.jobdesignation = jobdesignation;
        this.joblocation = joblocation;
        this.companyname = companyname;
        this.salary = salary;
        this.applyby = applyby;
        this.skillsrequired = skillsrequired;
        this.numberofopenings = numberofopenings;
        this.jobposted = new Date();
        this.CreatedBy=CreatedBy
        this.applicants = applicants;
    }
}
export const jobsListed = [
    {
        id: '1',
        jobcategory: 'Tech',
        jobdesignation: 'HR',
        joblocation: 'skjnakn',
        companyname: 'slkankd',
        salary: '1',
        numberofposition: '2',
        skillsrequired: [ 'React', 'NodeJs', 'Angular' ],
        applyby: '2024-04-28',
        jobposted: '2024-04-18T10:04:55.206Z',
        applicants: applicants
      },
      {
        id: '2',
        jobcategory: 'Tech',
        jobdesignation: 'HR',
        joblocation: 'skjnakn',
        companyname: 'slkankd',
        salary: '1',
        numberofposition: '2',
        skillsrequired: [ 'React', 'NodeJs', 'Angular' ],
        applyby: '2024-04-28',
        jobposted: '2024-04-18T10:04:55.206Z',
        applicants: applicants
      }
];

export const JobListAll = () => {
    return jobsListed;
}



export const PostJob = (job,name) => {
    // Write your code here
    const jobId = jobsListed + 1;
    const postingDate=new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    jobsListed.push({ id: jobId, ...job ,jobposted : postingDate,CreatedBy:name,applicants:applicants});
    console.log(jobsListed);
};

export const getJobById = (jobId) => {
    return jobsListed.find(job => job.id === jobId);
};


export const DeleteJobId=(jobId)=> {
    const index = jobsListed.findIndex(job => job.id === jobId);

    jobsListed.splice(index, 1);
    return true;
}


export const searchResult = (name) => {
    const data = jobsListed.filter((job) => 
    job.companyname.toLowerCase.includes(name)||
    job.jobcategory.includes(name)||
    job.jobdesignation.includes(name)||
    job.joblocation.includes(name)||
    job.salary.includes(name)||
    job.skillsrequired.includes(name)
);
    return data;
}

export const permissionToUpdate = (name) => {
    const job = jobsListed.find(job => job.CreatedBy === name);
    return !!job;
};
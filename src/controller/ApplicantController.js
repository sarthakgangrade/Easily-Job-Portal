import { addingApplicant } from "../models/Applicant.model.js";
import { sendEmail } from  "../middleware/nodemailer.js"

export default class applicantController {
  addingApplicants = (req, res) => {
    const { name, email, contact } = req.body;
    const { filename: resumePath  } = req.file;
    console.log(resumePath);
    // console.log(applicantDetails);
    const applicants= addingApplicant(name, email, contact, resumePath);
    console.log(applicants);
    
    
      // Send the email using the transporter from nodemailerConfig.js
      sendEmail(email,name);
      console.log("Confirmation email sent successfully");
    res.redirect("/alljob");
  };

  

}
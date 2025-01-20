import{registerUser,authenticateUser,findname} from "../models/user.model.js"
export default class UserController{
  getWelcome(req,res)
  {
    const {userName}= req.session;
    res.render("landingpage",{username:userName,errors: []});
  }
  
  register(req,res){
    const { username, email, password } = req.body;
    registerUser(req.body);
    res.render('user-login', { errors: [] });
  }
  
  
  getLogin(req,res){
    return res.render("user-login", { errors: [] });
  }

  login(req,res){
    const { email, password } = req.body;
    const Authorized = authenticateUser(req.body);
    const user=findname(email);
    const errors = [];
    if(!Authorized){
      errors.push('check your credentials or register');
      return res.status(401).render('user-login', { errors, success: false });
      
    }
    else{
      req.session.userEmail = user.email;
      req.session.userName = user.name;
      console.log(req.session.userName);
      return res.redirect("/AllJob");
    }
    
  }

  userLogout = (req, res) => {
    req.session.destroy((err) => {
      if (err) res.status(401).send(err);
      else res.redirect("/");
    });
  };

  
  
}

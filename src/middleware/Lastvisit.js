// Please don't change the pre-written code
// Import the necessary modules here

export const setLastvisit = (req, res, next) => {
    // Write your code here to set the randomNumber as a cookie with a 1-day expiration.
    if(req.cookies.lastVisit)
    {
        res.locals.lastVisit=new Date(req.cookies.lastVisit).toLocaleString();
    }
    
    
    // Call the next middleware or route handler
    res.cookie("lastVisit", new Date().toISOString(), {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    next();
  };
  
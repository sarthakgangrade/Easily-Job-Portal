// validations.js

export const registerValidation = (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = [];

    // Check if name, email, and password are provided
    if (!name || !email || !password) {
        errors.push("Name, email, and password are required.");
    }

    // Add more validations as needed

    // If there are errors, pass them to the next middleware
    if (errors.length > 0) {
        return res.status(400).render("landingpage", { username:"",errors: errors });
    }

    // If no errors, proceed to the next middleware
    next();
};





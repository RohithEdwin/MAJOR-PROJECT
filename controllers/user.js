const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req, res) => {
    try {
        let {username,email, password} = req.body;
        const newUser = new User({email, username});
        const regUser = await User.register(newUser,password);
        console.log(regUser);
        req.login(regUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to GLobe Wander");
            res.redirect("/listings");
        });
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    } 
};

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req,res) => {
    req.flash("success","Welcome to GlobeWander! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout(err => {
       if(err) {
        return next(err);
       }
       req.flash("success","you are logged out!");
       res.redirect("/listings");
    })
};
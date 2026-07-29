const express = require("express");
const path = require("path");
const app = express();
const engine= require('ejs-mate');
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const listingroute=require('./routes/listings');
const session= require('express-session');
const flash = require("connect-flash");

const passport=require('passport');
const LocalStrategy=require('passport-local');
const User= require('./models/userSchema');

// Middleware
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("views", path.join(__dirname, "views"));
app.engine("ejs",engine);
app.set("view engine", "ejs");

// Express Session
app.use(
    session({
        secret: "yourSecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        }
    })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(User.authenticate())
); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get("/", (req, res) => {
    res.render("landingpage");
});
app.use('/listings',listingroute);

app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.post("/signup", async (req, res) => {
    const { username, email, password} = req.body;
    const user = new User({
        username,
        email,
    });
    const registeredUser = await User.register(
        user,
        password
    );
    req.flash("success", "Welcome to Homely!");
    res.redirect("/listings");
});

app.get('/login',(req,res)=>{
    res.render('login')
});

app.post("/login",passport.authenticate("local", {failureRedirect: "/login",failureFlash: true}),(req, res) => {
        req.flash("success","Welcome back!");
        res.redirect("/listings");
    }
);
app.get("/logout", (req, res, next) => {
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash("success","Logged out successfully."
        );
        res.redirect("/");
    });

});

// Errr Route
app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).render("error", {statusCode,message});
});


module.exports = app;
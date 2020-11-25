const mongoose =require("mongoose");
const expressSession=require("express-session");
const cookieParser = require("cookie-parser")
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/data", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on("error", console.error.bind(console,"connnection error"));
mdb.once("open", (callback) => {

});

let memberSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    question1: String,
    question2: String,
    question3: String

});

let Member = mongoose.model("Member_Collection", memberSchema);

const checkAuth=(req,res,next)=> {
    if(req.session.user && req.session.user.isAuthenticated){
        next();
    } else{
        res.redirect("/");
    }
}

exports.index = (req,res) => {
    Member.find((err, members) => {
        if(err) return console.error(err);
        res.render("login", {
        title: "Log In",
        members
        });
    });
    
}

exports.login = (req,res) => {
    if(req.body.username === "test" && req.body.password === "1234"){
        req.session.user = {
            isAuthenticated: true
            
        };
        res.redirect("/profile");
    } else{
        res.redirect("/");
    }

}

exports.profile = (req,res) => {
    res.render("profile", {
        title: "Your Profile"
    })
}

exports.logout = (req,res) =>{
    req.session.destroy(err => {
        if(err){
            console.log(err)
        } else{
            res.redirect("/");
        }
    })
}

exports.create = (req,res) => {
    res.render("create", {
        title: "New Member Form"
    });
}

exports.createMember = (req,res) => {
    let member = new Member({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3
    });

    member.save((err, member) => {
        if(err) return console.error(err);
        console.log("account succesfully created");
    });

    res.redirect("/");
}
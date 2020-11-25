const express = require("express");
const cookieParser = require("cookie-parser")
const pug = require("pug");
const path = require("path")
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const expressSession = require("express-session");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "/public")));

const urlEncodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(expressSession({
    secret: "any secret",
    saveUninitialized: true,
    resave: true
}));

app.use(cookieParser(""));


app.get("/", routes.index);
app.post("/login", urlEncodedParser, routes.login)
app.get("/create", routes.create);
app.post("/create", urlEncodedParser, routes.createMember);
app.get("/profile", routes.profile);
app.get("/logout", routes.logout);

app.listen(3000);
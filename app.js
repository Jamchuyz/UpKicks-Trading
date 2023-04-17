import "dotenv/config";

import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import session from "express-session";

import db from "./models/db.js";

import homepage_routes from "./routes/homepage-routes.js";
import login_routes from "./routes/login-routes.js";
import register_routes from "./routes/register-routes.js";
import search_routes from "./routes/search-routes.js";
import profile_routes from "./routes/profile-routes.js";
import addpost_routes from "./routes/addpost-routes.js";
import results_routes from "./routes/results-routes.js";
import update_routes from "./routes/update-routes.js";

const app = express();
const port = process.env.PORT;

app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs");

app.use(express.static(path.resolve('./public')));
app.use(express.json());
app.use(session({secret: 'userSession', resave: false, saveUninitialized: false}));

//final routing
app.use('/', homepage_routes);
app.use('/login', login_routes);
app.use('/create-account', register_routes);
app.use('/user', search_routes);
app.use('/user/my-profile', profile_routes);
app.use('/user/render-results', results_routes);
app.use('/user/my-profile/add-post', addpost_routes);
app.use('/user/my-profile/update-account', update_routes);

db.connect();

app.get('/about-us-online', function(req, res){
    res.render('about-us-online', {
        title: "Upkicks - about us"
    });
});

app.get('/checkout', function(req, res){
    res.render('checkout', {
        title: "Upkicks - checkout"
    });
});


app.listen(port, function(){
    console.log(`Server is listening at http://localhost:${port}`);
});
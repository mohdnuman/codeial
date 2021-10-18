const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const session=require("express-session");
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore=require('connect-mongo')(session);
const expressLayouts=require('express-ejs-layouts');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');


app.use(sassMiddleware({
    src:'./static/scss',
    dest:'./static/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));
app.use(express.static('static'));
app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'blah',
    saveUninitialized:false,
    resave:false,
    Cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        mongooseConnection: db,
        autoRemove:'disabled'
    },function(err){
        console.log(err || 'connect-mongo setup ok');
    }
    )
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/uploads',express.static(__dirname+'/uploads'));
app.use('/',require('./routes/index.js'));




app.listen(port,function(err){
    if(err){
        console.log(`error occured: ${err}`);
        return;
    }
    console.log(`express server is up and running on port: ${port}`);
})

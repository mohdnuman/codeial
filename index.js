const express=require('express');
const port=8000;
const app=express();
const cookieParser=require('cookie-parser');


app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(cookieParser());

const db=require('./config/mongoose');

app.use('/',require('./routes/index.js'));

app.listen(port,function(err){
    if(err){
        console.log(`error occured: ${err}`);
        return;
    }
    console.log(`express server is up and running on port: ${port}`);
})
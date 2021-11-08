const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');

fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});



const development={
    name:'development',
    static_path:'./static',
    session_cookie_key:'blah',
    db:'codeial_db',
    smtp:{
        service:"gmail",
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:"mohammadnuman123@gmail.com",
            pass:"hexagon6"
        }
    },
    google_client_id: "842567579196-vnpl9b7mmdtqirej7jjas4gnia0h795n.apps.googleusercontent.com",
    google_client_Secret:"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",
    google_callback_url:"http://localhost:8000/user/auth/google/callback",
    jwt_secret:'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production={
    name:'production',
    static_path:process.env.CODEIAL_STATIC_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:"gmail",
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.CODEIAL_SMTP_USER,
            pass:process.env.CODEIAL_SMTP_PASS
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

module.exports=eval(process.env.CODEIAL_ENVIRONMENT)==undefined? development : eval(process.env.CODEIAL_ENVIRONMENT);
let express = require('express');
let bodyParser = require('body-parser');
let connection = require('./db');
var nodemailer = require("nodemailer");

let app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

const baseUrl = "http://localhost:8080";
const port =  process.env.PORT || 8080;

app.get("/", (req, res) => {

    let q = "SELECT COUNT(*) AS total FROM users";

    connection.query(q, (err, results) => {
        if (err) throw err;

        var total = results[0].total;
        res.render("home", {data: total});
    })

});

app.post("/register", (req, res) => {

    let person = {
        email: req.body.email
    };

    connection.query("INSERT INTO users SET ?", person, (err, results) => {
        
        let erro, status;

        if (err)
            res.redirect(`/?erro=true&code=${err.errno}`);
        else
        {
            
            let transporter = nodemailer.createTransport({ 
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                logger: true,
                debug: true, 
                secureConnection: false,

                auth: { 
                    user: process.env.EMAIL_ADRESS, 
                    pass: process.env.EMAIL_PASSWORD 
                }, 

                tls : {
                    rejectUnauthorized: true
                }
            });

                const mailOptions = {
                    from: process.env.EMAIL_ADRESS, // sender address
                    to: req.body.email, // receiver (use array of string for a list)
                    subject: 'Welcome', // Subject line
                    html: `<p>Hello</p>
                    <p>Welcome to our cult, I mean, group !!! We're thrilled to have you on board.</p>
                    <p>Best regards</p>
                    <p>From our lovely secret leader</p>`

                };

            transporter.sendMail(mailOptions, (err, info) => {
                if(err)
                  throw err
             });

            res.redirect(`/?erro=false`);
        }
    })
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
 
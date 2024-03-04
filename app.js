let express = require('express');
let bodyParser = require('body-parser');
let connection = require('./db');

let app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

const baseUrl = "http://localhost:8080";
const port = process.env.PORT || 8070;

app.get(`${baseUrl}/`, (req, res) => {

    let q = "SELECT COUNT(*) AS total FROM users";

    connection.query(q, (err, results) => {
        if (err) throw err;

        var total = results[0].total;
        res.render("home", {data: total});
    })

});

app.post(`${baseUrl}/register`, (req, res) => {

    let person = {
        email: req.body.email
    };

    connection.query("INSERT INTO users SET ?", person, (err, results) => {
        
        let erro, status;

        if (err)
            res.redirect(`${baseUrl}/?erro=true&code=${err.errno}`);
        else
            res.redirect(`${baseUrl}/?erro=false`);
    })
});

app.listen(8080, () => {
    console.log("Server running on 8080!");
});
 
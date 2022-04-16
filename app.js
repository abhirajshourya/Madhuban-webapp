var express = require('express')
const path = require('path')
var bodyParser = require('body-parser')

//MongoDB
const mongoose = require('mongoose');
const { type } = require('express/lib/response');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    address: String,
    message: String
});

const contact = mongoose.model('contact', contactSchema);


// Express specific
var app = express()

app.use('/static', express.static('static'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//Template engine with PUG
app.set('view engine', 'pug');

//Set the views directory
app.set('views', path.join(__dirname, 'views'));

//Pug endpoints
app.get("/", (req, res) => {
    res.status(200);
    res.render("index.pug")
});
app.get("/about", (req, res) => {
    res.status(200);
    res.render("about.pug")
});
app.get("/contact", (req, res) => {
    res.status(200);
    res.render("contact.pug")
});

//recieving post req
app.post("/contact", (req, res) => {
    res.status(200);
    console.log(req.body);
    // let postreq = new contact(req.body)
    // postreq.save()
    // res.render("contact-success.pug")
    res.send("Success")
});
const port = 80;
app.listen(port, () => {
    console.log(`Served on : 127.0.0.1:${port}`);
});
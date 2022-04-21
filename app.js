const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const port = 80;

//MongoDB
const mongoose = require('mongoose');
const { type } = require('express/lib/response');


async function mongoconnect() {
    console.log("MongoDB Connecting...");
    await mongoose.connect('mongodb+srv://madhuban:wlpctycUvtOaRlfI@cluster0.akfbv.mongodb.net/MadhubanApp?retryWrites=true&w=majority');
    
}
mongoconnect().then(() => { console.log("Connected..!!"); }).catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    address: String,
    message: String
});

const contact = mongoose.model('contact', contactSchema);


// Express specific
const app = express()

app.use('/static', express.static('static'));

app.use(bodyParser.urlencoded({ extended: false }))
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
    let postreq = new contact(req.body)
    postreq.save()
    res.render("contact-success.pug")
});

//local host
app.listen(port, () => {
    console.log(`Served on : 127.0.0.1:${port}`);
});
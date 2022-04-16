const express = require('express')
const path = require('path')


const app = express()

// Express specific
app.use('/static', express.static('static'));


//Template engine with PUG
app.set('view engine', 'pug');

//Set the views directory
app.set('views', path.join(__dirname, 'views'));

//Pug endpoints
app.get("/", (req,res)=>{
    const params = {
    }
    res.status(200);
    res.render(
        "index.pug", params
    )
});
app.get("/about", (req,res)=>{
    const params = {
    }
    res.status(200);
    res.render(
        "about.pug", params
    )
});
app.get("/contact", (req,res)=>{
    const params = {
    }
    res.status(200);
    res.render(
        "contact.pug", params
    )
});
app.post("/contact", (req,res)=>{
    const params = {

    }
    res.status(200);
    res.render(
        "contact-success.pug", params
    )
});
const port = 80;
const hostname = "127.0.0.1"
app.listen(port,()=>{
    console.log(`Served on : ${hostname}:${port}`);
});
const express = require("express");
var app = express();

const port = process.env.PORT || 3000;

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get("/", function(req, resp){
    
    resp.sendFile("index.html");
    
})


app.get("/awesome", function(req, resp){
    
    resp.send("YOU ARE AWESOME");
    
})


app.get("/blahblahblah", function(req, resp){
    
    resp.send("nonsense");
    
})

var names = [];

app.get("/name/:the_name", function(req, resp){
    
    var the_name = req.params.the_name;
    names.push(the_name);
    resp.send(names);
})


app.listen(port, function(err){
    
   if(err){
       console.log("something is wrong: "+err);
       return false;
   } 
    
    console.log("PORT IS READY FOR H@X");
    
    
});

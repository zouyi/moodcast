const express = require("express");
var app = express();
var fs = require("fs");

var bodyParser = require("body-parser");

//make a new server

//configure body-parser for express
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


var path = require('path');
app.use('/', express.static(__dirname + '/'));

app.use('/imgs', express.static(__dirname + '/imgs'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));


const port = process.env.PORT || 3000;

var date = new Date();


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

app.post('/sendForm', function(req, res) {
    var name = req.body.uname;
    var emotion = req.body.emotion;
    var content = req.body.ucontent;

    var curDay = date.getDay();
    var curDate = date.getDate();
    var curMonth = date.getMonth();
    var curYear = date.getFullYear();
  
  var userObj = {
     "name": name,
    "mood": emotion,
    "content": content,
    "day": curDay,
    "date": curDate,
    "month": curMonth,
    "year": curYear
    
  };
  
  var obj = {
    moodlist: []
  };
  
  //obj.moodlist.push(userObj);
  
  
  fs.readFile('moodlist.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    obj.moodlist.push(userObj); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile('moodlist.json', json, 'utf8'); // write it back 
}});
  
  
  

  
          res.send('<h1>Name:'+name+'</h1><br>'+
                   '<h1>Emotion:'+emotion+'</h1><br>'+
                   '<h1>Content:'+content+'</h1><br>'
            
                );

    
  /*
    if(username == "Scooby" && pass == "Do"){
        res.send('<h1>Success</h1>');
      res.send(fname);
    }else{
        res.send('<h1>Login Incorrect</h1>');       
    } */
});




app.get("/", function(req, resp){
    
     resp.sendFile(path.join(__dirname + '/index.html'));

    
})


app.get("/dailyStats", function(req, resp){

       
  fs.readFile('moodlist.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    json = JSON.stringify(obj);
      resp.send(json);
}});
  

    
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

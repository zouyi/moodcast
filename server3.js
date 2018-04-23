var express = require('express'); var app = express() 
var bodyParser = require("body-parser");

//make a new server
app.use(express.static(__dirname)); //set the root folder  
//configure body-parser for express
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/login', function(req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var addr = req.body.addr;
    var city = req.body.city;
    var prov = req.body.prov;
    var pcode = req.body.pcode;
    var email = req.body.email;
    var pnum = req.body.pnum;
    var web = req.body.web;
  
          res.send('<h1>firstName:'+fname+'</h1><br>'+
                   '<h1>lastName:'+lname+'</h1><br>'+
                   '<h1>address:'+addr+'</h1><br>'+
                   '<h1>city:'+city+'</h1><br>'+
                   '<h1>province:'+prov+'</h1><br>'+
                   '<h1>postal:'+pcode+'</h1><br>'+
                   '<h1>email:'+email+'</h1><br>'+
                   '<h1>phone number:'+pnum+'</h1><br>'+
                   '<h1>website:'+web+'</h1>'
                );

    
  /*
    if(username == "Scooby" && pass == "Do"){
        res.send('<h1>Success</h1>');
      res.send(fname);
    }else{
        res.send('<h1>Login Incorrect</h1>');       
    } */
});

//listen for requests on port 3000 
var server = app.listen(3000, () =>{ 
	console.log('server is listening on port',server.address().port); 
}); 
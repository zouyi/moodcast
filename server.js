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
  
     res.sendFile(path.join(__dirname + '/index.html'));

  /*
          res.send('<h1>Name:'+name+'</h1><br>'+
                   '<h1>Emotion:'+emotion+'</h1><br>'+
                   '<h1>Content:'+content+'</h1><br>'
            
                );*/

    
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


app.get("/dailyMood", function(req, resp){

       
  fs.readFile('moodlist.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    //json = JSON.stringify(obj);
    var curDay = date.getDay();
    var curDate = date.getDate();
    var curMonth = date.getMonth();
    var curYear = date.getFullYear();
  
            console.log(curDay);

      console.log(typeof(curDay));
    var jDay;
    var jDate;
    var jMonth;
    var jYear;

    var moodArr = [0,0,0,0,0,0];
    var moodCount = 0;
     
     var objlength = obj.moodlist.length;
      
      for(var i=0;i<objlength;i++){
        
          jDay = obj.moodlist[i].day;
                    //console.log("json day is"+ typeof(jDay));

          jDate = obj.moodlist[i].date;
          jMonth = obj.moodlist[i].month;
          jYear = obj.moodlist[i].year;
          jMood = obj.moodlist[i].mood;
          
          if(curDay == jDay && curDate == jDate && curMonth == jMonth && curYear == jYear){
            console.log(curDate+" "+jDay);

            if(jMood == 1){
              
             moodArr[0]++;
              moodCount++;
              
            } else if(jMood==2){
              moodArr[1]++;
              moodCount++;

              
            }else if(jMood==3){
              
              moodArr[2]++;
              moodCount++;

              
            }else if(jMood==4){
              
             moodArr[3]++;
               moodCount++;
              
            }else if(jMood==5){
              
              moodArr[4]++;
               moodCount++;
              
            }else if(jMood==6){
              
              moodArr[5]++;
               moodCount++;
            }
          }
        }
      
      console.log(moodCount);
      console.log(moodArr);
      
      
      var maxIndex = indexOfMax(moodArr);
      var maxIndex2 = secondMax(moodArr);
      resp.render(__dirname + "/index.html", {firstmood:maxIndex, secondmood: maxIndex2, moodcount:moodCount});
      
      
      
      
      
      
      //resp.send(json);
}});
  

    
})


/*

app.get("/dailyMood", function(req, resp){
  
  //you should only get mood for the currentDay  
  

  
          
  fs.readFile('moodlist.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
     
}});
  
    var curDay = date.getDay();
    var curDate = date.getDate();
    var curMonth = date.getMonth();
    var curYear = date.getFullYear();
  
    var jDay;
    var jDate;
    var jMonth;
    var jYear;

    var moodArr = [0,0,0,0,0,0];
    var moodCount = 0;
     
     var objlength = obj.moodlist.length;
      
      for(var i=0;i<objlength;i++){
        
          jDay = obj.moodlist[i].day;
          jDate = obj.moodlist[i].date;
          jMonth = obj.moodlist[i].month;
          jYear = obj.moodlist[i].year;
          jMood = obj.moodlist[i].mood;
          
          if(curDay == jDay && curDate == jDate
            && curMonth == jMonth && curYear == jYear){
            
            if(jMood == 1){
              
             moodArr[1]++;
              moodCount++;
              
            } else if(jMood==2){
              moodArr[2]++;
              moodCount++;

              
            }else if(jMood==3){
              
              moodArr[3]++;
              moodCount++;

              
            }else if(jMood==4){
              
             moodArr[4]++;
               moodCount++;
              
            }else if(jMood==5){
              
              moodArr[5]++;
               moodCount++;
              
            }else if(jMood==6){
              
              moodArr[6]++;
               moodCount++;
            }
          }
        }
      
      console.log(moodCount);
      console.log(moodArr);
      
      
      var maxIndex = indexOfMax(moodArr);
      var maxIndex2 = secondMax(moodArr);
      resp.render(__dirname + "/index.html", {firstmood:maxIndex, secondmood: maxIndex2, moodcount:moodCount});
      
      //json = JSON.stringify(obj);
      //resp.send(json);
})
  

    
*/




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

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}


var secondMax = function (arr){ 
    var max = Math.max.apply(null, arr); // get the max of the array
    arr.splice(arr.indexOf(max), 1); // remove max from the array
    return Math.max.apply(null, arr); // get the 2nd max
};



var d = new Date();
var weekDay = document.getElementById("weekday");
var curMonth = document.getElementById("month");
var curDate = document.getElementById("date");
var weekdays=["Sun","Mon","Tue","Wed","Thur",
                "Fri","Sat"];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

var moodArr = ['happy', 'sad', 'scared', 'disgust', 'angry', 'exhausted'];

//Display session

var mainstat = document.getElementById("mainstat");
var secondstat = document.getElementById("secondstat");

var leftButton = document.getElementById("leftArrow");
var rightButton = document.getElementById("rightArrow");

weekDay.innerHTML = weekdays[d.getDay()];
curMonth.innerHTML = months[d.getMonth()];
curDate.innerHTML = d.getDate();

var dayButt = document.getElementById("dayButton");
var statsButton = document.getElementById("statsButton");
var weekButt = document.getElementById("weekButton");
var indiButt = document.getElementById("indiButton");
var dayline = document.getElementById("dayline");
var weekline = document.getElementById("weekline");
var indiline = document.getElementById("indiline");

var submitButton = document.getElementById("submit");

window.onload = function(){
  dayCast();
  
}


statsButton.addEventListener("click", function(){

  //alert("clicked");
    $.ajax({url:"http://localhost:3000/dailyStats", success: function(result){
    
        console.log(typeof(result));
      var userObj = JSON.parse(result);
    
      var objlength = Object.keys(userObj.moodlist).length;
    var selection = 0;

      var happyCount = 0;
      var sadCount = 0;
      var scaredCount = 0;
      var disgustCount = 0;
      var angryCount = 0;
      var exhaustCount = 0;
  
     for(i=0;i<objlength;i++){        
        selection = userObj.moodlist[i].mood;
        
        if(selection ==1 ){
          happyCount++;
        } else if(selection ==2){
          
          sadCount++;
        }else if(selection ==3){
          
          scaredCount++;


        }else if(selection ==4){
        
          disgustCount++;

        }else if(selection ==5){
          angryCount++;

        }else if(selection ==6){
            exhaustCount++;

          }
        
      }
              
  new Chart(document.getElementById("newChart"), {
    type: 'bar',
    data: {
      labels: ["Happy",
        "Sad",
        "Scared",
        "Disgust", 
        "Angry", 
        "Exhausted"],
      datasets: [{
        label:["Emotion"],
        backgroundColor: ["#E74C3C", "#52BE80","#F4D03F","#1F618D","#8A2BE2","#00FFFF"],
        data: [happyCount, 
               sadCount, 
               scaredCount, 
               disgustCount, 
               angryCount, 
               exhaustCount]
      }]
    },
    options: {
       legend: {
        display: false
    },
      title: {
        display: true,
        text: 'Mood for the day'
      }
    }
    });  
    }});
  
 
});

dayButt.addEventListener("click", function(){
  dayCast();
})

indiButt.addEventListener("click", function(){
  
    $.ajax({url:"http://localhost:3000/dailyStats", success: function(result){
    
        //console.log(typeof(result));
      var userObj = JSON.parse(result);
             // alert(userObj.length);
              
      var objlength = Object.keys(userObj.moodlist).length;
      var statusLine;
      var selection = 0;
      
      for(i=0;i<objlength;i++){
        statusLine+=('<div>'+userObj.moodlist[i].name+' is feeling');  
        
        selection = userObj.moodlist[i].mood;
        
        if(selection ==1 ){
          
          statusLine= statusLine+' happy ';
        } else if(selection ==2){
          
         statusLine= statusLine+' sad ';

        }else if(selection ==3){
          
          statusLine= statusLine+' scared ';


      }else if(selection ==4){
        
         statusLine= statusLine+' disgust ';

        
        
      }else if(selection ==5){
           statusLine= statusLine+' angry ';

        
        
      }else if(selection ==6){
           statusLine= statusLine+' exhausted ';

      }
          statusLine= statusLine+' about ';
          statusLine= statusLine+userObj.moodlist[i].content;
      }
              
              
         $("#display").html(statusLine);

                //newBar(result);
  
      }});
      
});

function dayCast(){
  //find dates that matches current day
   $.ajax({url:"http://localhost:3000/dailyMood", success: function(result){
        //console.log(result);
        var moodObj = JSON.parse(result);
        //console.log(moodObj);

        var firstmood = moodObj.firstmood;
        var secondmood = moodObj.secondmood;
        var moodcount1 = moodObj.moodcount1;
        var moodcount2 = moodObj.moodcount2;
        var totalmood = moodObj.totalmood;
     
        console.log(firstmood);
        console.log(secondmood);
        
          //console.log("mc1 is "+moodcount1);
          //console.log("total mood is "+totalmood);

        percent1 = (moodcount1/totalmood).toFixed(2)*100;
         percent2 = (moodcount2/totalmood).toFixed(2)*100;
     
     mainstat.innerHTML = percent1 + " % " + moodArr[firstmood-1];
     secondstat.innerHTML = percent2 + " % " + moodArr[secondmood-1];
     //console.log(percent1);
        //console.log(percent2);
  
        }
    })
}

function newBar(result) {
  
   
}

indiButt.addEventListener("mouseover", function(){
    
    
})




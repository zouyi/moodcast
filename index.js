var d = new Date();
var weekDay = document.getElementById("weekday");
var curMonth = document.getElementById("month");
var curDate = document.getElementById("date");
var weekdays=["Sun","Mon","Tue","Wed","Thur",
                "Fri","Sat"];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

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

statsButton.addEventListener("click", function(){

  //alert("clicked");
    $.ajax({url:"http://localhost:3000/dailyStats", success: function(result){
    
        //console.log(typeof(result));
      var userObj = JSON.parse(result);
              //console.log(userObj.length);
          //$("#display").html(result);
          //newBar(result);
      
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
      title: {
        display: true,
        text: 'Bar Diagram'
      }
    }
    });  
    }});
  
 
});
  

      


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

function newBar(result) {
  
   
}





indiButt.addEventListener("mouseover", function(){
    
    
})




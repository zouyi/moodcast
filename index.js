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

//weekDay.innerHTML = weekdays[d.getDay()];
//curMonth.innerHTML = months[d.getMonth()];
//curDate.innerHTML = d.getDate();

var dayButt = document.getElementById("dayButton");
var totalButton = document.getElementById("total");
var weekButt = document.getElementById("weekButton");

var $indiButton = $(document.getElementById("indi"));

var dayline = document.getElementById("dayline");
var weekline = document.getElementById("weekline");
var indiline = document.getElementById("indiline");

var submitButton = document.getElementById("submit");

window.onload = function(){
  
  displayStatus();
  displayBars();
  
}

totalButton.addEventListener("click", function(){

  //alert("clicked");
   
});




$indiButton.click(function(){
   
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

function displayStatus(){
     $.ajax({url:"http://localhost:3000/indiStats", success: function(result){
    	console.log(result);
      	var userObj = JSON.parse(result);
             // alert(userObj.length);
              
      	var objlength = Object.keys(userObj.moodlist).length;
      	var statusLine = "";
      	var selection = 0;
      
					for(i=0;i<objlength;i++){
						statusLine+=('<div>'+userObj.moodlist[i].name+' feels');  

						selection = userObj.moodlist[i].mood;

						if(selection ==1 ){

							statusLine= statusLine+' <span id="happy">happy</span> ';
						} else if(selection ==2){

						 statusLine= statusLine+' <span id="sad">sad</span> ';

						}else if(selection ==3){

							statusLine= statusLine+' <span id="scared">scared</span> ';


					}else if(selection ==4){

						 statusLine= statusLine+' <span id="disgusted">disgusted</span> ';
					}else if(selection ==5){
							 statusLine= statusLine+' <span id="angry">angry</span> ';

					}else if(selection ==6){
							 statusLine= statusLine+' <span id="exhausted">exhausted</span> ';

					} else if(selection ==7){
							 statusLine= statusLine+' <span id="inlove">in love</span> ';

					}
							statusLine= statusLine+' about ';
							statusLine= statusLine+userObj.moodlist[i].userinput;
					}
              
              
         $("#display").html(statusLine);
         

                //alert(statusLine);
                //newBar(result);
  
      }});
}

function displayBars(){
   $.ajax({url:"http://localhost:3000/getBars", success: function(result){
    
    //console.log(typeof(result));
    var moodObj = JSON.parse(result);
    console.log(moodObj.moodArr[6]);
    
    //var objlength = Object.keys(moodObj.moodlist).length;
    //var selection = 0;
      /*
      var happyCount = 0;
      var sadCount = 0;
      var scaredCount = 0;
      var disgustCount = 0;
      var angryCount = 0;
      var exhaustCount = 0;
      var loveCount = 0;
  
     for(i=0;i<objlength;i++){        
        selection = moodObj.moodlist[i].mood;
        
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

        } else if(selection == 7){
           loveCount++; 
        }
        
      }*/
              
  new Chart(document.getElementById("myChart"), {
    type: 'bar',
    data: {
      labels: ["Happy",
        "Sad",
        "Scared",
        "Disgust", 
        "Angry", 
        "Exhausted",
        "Love",
        ],
      datasets: [{
        label:["Emotion"],
         backgroundColor: [
                //happy
                'rgba(231, 208, 35, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                //scared
                'rgba(153, 102, 255, 0.5)',               
                 //disgust
                'rgba(75, 192, 192, 0.5)',
                 //angry
                'rgba(255, 99, 132, 0.5)',
                //exhaust
                'rgba(255, 159, 64, 0.5)',
                 //love
                'rgba(253, 165, 196, 0.5)'
            ],
            borderColor: [
                'rgba(231, 208, 35, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(253, 165, 196, 1)'
            ],
            borderWidth:1,
        data: [moodObj.moodArr[0], 
               moodObj.moodArr[1], 
               moodObj.moodArr[2], 
               moodObj.moodArr[3], 
               moodObj.moodArr[4], 
               moodObj.moodArr[5],
               moodObj.moodArr[6]]
      }]
    },
    options: {
       legend: {
        display: false,
           scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    },
      title: {
        display: true,
        text: '#of People By Moods'
      }
    }
    });  
    }});
  
 
}



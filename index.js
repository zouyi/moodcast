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
var weekButt = document.getElementById("weekButton");
var indiButt = document.getElementById("indiButton");
var dayline = document.getElementById("dayline");
var weekline = document.getElementById("weekline");
var indiline = document.getElementById("indiline");

dayButt.addEventListener("mouseover", function(){
    
    dayline.style.animation = "underline 0.5s";
    
})

weekButt.addEventListener("mouseover", function(){
    
    weekline.style.animation = "underline2 2s";
    
})

indiButt.addEventListener("mouseover", function(){
    
    indiline.style.animation = "underline3 2s";
    
})




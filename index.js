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


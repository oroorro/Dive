
const calendarData = document.getElementById("calendar-data");


//default case where calendar shows current month's data 
//get current month and year 
const date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

//getting current month's starting day , return value start from Sunday with zero index
let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
lastDateOfMonth = new Date(currYear, currMonth, 0).getDate(),
test = new Date(currYear, currMonth + 1, 0).getDate(); //this is current month's date since it is also zero indexed based



//firstDay will always be in the very first array 




console.log(firstDayOfMonth, lastDateOfMonth, test);
//event cases from prev month button and next month button 


//testing how display will work with data from DB 

const day1 = document.getElementById("day1");

const dayObj = document.createElement("div");

const highestLvl = document.createElement("text");
highestLvl.innerText = "9"
const highestLvlDuration = document.createElement("text");
highestLvlDuration.innerText = "19m:42s"
const totalDuration = document.createElement("text");
totalDuration.innerText = "178m:29s";

dayObj.append(highestLvl, highestLvlDuration, totalDuration);
day1.append(dayObj);

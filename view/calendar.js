

const calendarData = document.getElementById("calendar-data");


//default case where calendar shows current month's data 
//get current month and year 
const date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

//getting current month's starting day , return value start from Sunday with zero index
let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
//getting last date of current month 
lastDateOfMonth = new Date(currYear, currMonth, 0).getDate(),

test = new Date(currYear, currMonth + 1, 0).getDate(); //this is current month's date since it is also zero indexed based



//firstDay will always be in the very first array 




console.log(firstDayOfMonth, lastDateOfMonth, test);
//event cases from prev month button and next month button 

//on the full size screen, make list of days on top of calendar
const dayList = document.getElementById("dayList");
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

for (let index = 0; index < days.length; index++) {

    const li = document.createElement("li");
    const day = document.createElement("div");
    day.innerText = days[index]; 
    day.style.width = "100px"
    day.style.height = "20px"
    day.style.backgroundColor ="purple";
    day.style.textAlign = "center";
    day.style.marginTop = "-17px"

    li.appendChild(day);
    dayList.appendChild(li);
}



//testing how display will work with data from DB 
const ul = document.getElementById("list");

//      ---------------  dayObj
//      |   ---------------day--
//      |   |  -----------dayMax----------------
//      |   |  | highestLvl  highestLvlDuration |
//          |   --------------------------------- 
//          |             totalDuration                
//           ---------------
let cnt = 1;
for (let index = 0; index < 42; index++) {
    const li = document.createElement("li");
    li.setAttribute("class", "list");

    const dayObj = document.createElement("div");
    dayObj.setAttribute("id", "dayObj");

    const dayMax = document.createElement("div");
    const day = document.createElement("div");
    day.innerText = "" + cnt++; 
    day.style.width = "100px"
    day.style.height = "20px"
    day.style.backgroundColor ="brown";
    day.style.textAlign = "center";
    day.style.marginTop = "-17px"
    
    const highestLvl = document.createElement("text");
    highestLvl.innerText = "9"
    const highestLvlDuration = document.createElement("div");
    highestLvlDuration.innerText = "19m:42s"
    
    dayMax.append(highestLvl, highestLvlDuration);
    dayMax.style.display="flex";
    dayMax.style.justifyContent = "space-around"
    
    const totalDuration = document.createElement("text");
    totalDuration.innerText = "178m:29s";
    totalDuration.style.textAlign = "center";
    
    dayObj.append(day, dayMax, totalDuration);
    dayObj.style.display = "flex";
    dayObj.style.flexDirection="column";


    li.append(dayObj);
    ul.append(li);
}






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
    day.style.width = "120px"
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

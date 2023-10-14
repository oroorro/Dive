
const target = document.getElementById('target');
const canvas2d = document.getElementById("canvas2d");
const ctx = canvas2d.getContext('2d');
const playVidButton = document.getElementById("playVidButton");
const pauseVidButton = document.getElementById("pauseVidButton");

const colorList = ["#81dbc5", "#76b6db", "#7691e3", "#7d76e3"]
let flag = false;
let dim = 1;
let reachedTopFlag = false;

var state = {

  //stores {level: number, duration: Time}
  passedList:[],
  //level 0 to 999
  currentLevel: 0,

  // Minute: seconds format
  currentDuration: 0,

  pausedFlag: false,

  resumeFlag: false,

  quitFlag: false,

  accumTime: null,

  newLevelFlag: false,

  //starts new level and store previous level, time information to a passedList List.
  startNewLevel: function(){

    //getting new time for the new level 
    const startTime = new Date();

    //save previous level into passedLevel List 
    const passedLevel = {level: currentLevel, duration: accumTime - startTime};
    this.passedList.push(passedLevel);

    //set current level by getting current level + 1
    this.currentLevel++;

    //start new time interval 
    this.accumTime = new Date();
    
    //let the screen to have the new level 



  },

  pauseCurrentLevel: function(){

  },

  quitLevel: function(){

  },

}


let userState = {level:null, duration: null, }

const stream = canvas2d.captureStream();
target.srcObject = stream;

/*
does not work since the video is paused when we start the website
if(target.paused){
  console.log("paused")
}
*/

target.addEventListener("leavepictureinpicture", (event) => {
  //target.play(); Does not work 
  //making custom event works 
  setTimeout(()=>{
    let customEvent = new Event("click");
    playVidButton.dispatchEvent(customEvent);
  },1);
 
  canvas2d.style.display="block";
});


function playVid() { 
  target.play(); 
} 

function pauseVid() { 
  target.pause(); 
  state.pausedFlag = true;

  /*
  setTimeout(()=>{
    let customEvent = new Event("click");
    playVidButton.dispatchEvent(customEvent);
  }, 3000);
  */
} 


const btn = document.getElementById('pip');
if( target.requestPictureInPicture ) {
  btn.onclick = e => target.requestPictureInPicture();
  state.pausedFlag = false;
}
else {
  btn.disabled = true;
}

/*
const actionHandlers = new Map([
    ['seekto', ()=>{}],
  ])

  for (const [action, handler] of actionHandlers){
    try{
        navigator.mediaSession.setActionHandler(action, handler);
    }catch(error){
        console.log(`${error}`);
    }
  }
*/

navigator.mediaSession.setActionHandler('previoustrack', function() {
    console.log('> User clicked "Previous Track" icon.');
    on();

});

navigator.mediaSession.setActionHandler('nexttrack', function() {
    console.log('> User clicked "Next Track" icon.');
    state.newLevelFlag = true;
});



navigator.mediaSession.setActionHandler("pause",()=>{
  console.log("pause");
  const customEvent = new Event("click");
  pauseVidButton.dispatchEvent(customEvent);

  const dataURL = canvas2d.toDataURL("image/png");
  var a = document.createElement('a');
  // Set the link to the image so that when clicked, the image begins downloading
  a.href = dataURL

  //post to server with file information 
  fetch('/home/download', {
    method: 'POST',
    body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch(error => {
        console.log(error)
    })
  //wait to post call to return 

  //use that information to update the interface 

  console.log(dataURL);
  // Specify the image filename
  //a.download = 'canvas-download.jpeg';
  // Click on the link to set off download
  //a.click();

})


navigator.mediaSession.setActionHandler("play",()=>{
  console.log("play");
})




try {
  navigator.mediaSession.setActionHandler("nexttrack", () => {
    log('> User clicked "Next Slide" icon.');
    slideNumber++;
    updateSlide();
  });
} catch (error) {
  log('Warning! The "nextslide" media session action is not supported.');
}

var y =  canvas2d.height,
last = performance.now();

function on(){
    //flag = flag == true ? false : true;
    flag = true;
    y =  canvas2d.height;
    last = performance.now();
    dim = 1;
}








var paint = {

    //default background color 
    backgroundColor: "white",

    //tracks current color index in colorList 
    colorIndex: 0,

    //will have object of color={colorName: "white", CoordY: 0 to canvas.height};
    colorsToPaint : [],    

    //stores functions of paintNextLevel in order of getting called
    colorQueue: [],

    paintNextLevel : (colorsToPaint) => {

      backgroundColor = this.backgroundColor;

      colorsToPaint.forEach(color=>{
        ctx.fillStyle = color.colorName; 
        ctx.fillRect(0, color.coordY, canvas2d.width, canvas2d.height);
        //if current painting color has reached at the top of canvas, video; make it as the background;
        ctx.fillStyle = "white";
        ctx.fillText(color.colorName, canvas2d.width/4, (y + canvas2d.height) / 2);


        if(color.coordY <= 0 ) paint.backgroundColor = color.colorName;
      })
      //and remove it from colorsToPaint List 
      colorsToPaint.filter(color =>{
        return color.coordY > 0;
      })
    },

    /**
     * paints background with given color 
     * @param {*String} color color to paint the backgound 
     */
    paintStaticBackground: function(color){
      ctx.fillStyle = color; 
      ctx.fillRect(0, 0, canvas2d.width, canvas2d.height);
      //now paintStaticBackground will draw get state.currentLevel()
    },

    anim:  function (timestamp){
      //setting default background 
      this.paintStaticBackground(this.backgroundColor);

      if(flag){
        //this.colorQueue.push(paintNextLevel);
        let color = {"colorName": colorList[this.colorIndex++], "coordY": canvas2d.height};
        this.colorsToPaint.push(color);
        flag = false;
      }

      if(state.newLevelFlag){

        state.newLevelFlag = false;

        //draw next level's color and text with new time 
      }


      if(this.colorsToPaint.length > 0){
        //reduce y coords seeminglessy to all color varaibles' y coord 
        this.colorsToPaint.forEach(color=> {

          //stop raising color bar if user clicked on pause button
          if(!state.pausedFlag){
            color.coordY -= dim;
          }
          
        })
        //call paint function to draw rect 
        this.paintNextLevel(this.colorsToPaint);
      }



      if(!state.pausedFlag){
        y -= dim;
        dim += 0.0001;
      }
      
      
      //ctx.fillStyle = "white";
      //ctx.fillText( new Date().toTimeString().split(' ')[0], canvas2d.width / 2, canvas2d.height / 2 );


      requestAnimationFrame( this.anim.bind(this) );
  },
}
ctx.font = "50px Arial";
//ctx.textAlign = "center";
//ctx.textBaseline = "middle";
paint.anim();

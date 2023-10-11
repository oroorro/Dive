
console.log("yello");
const target = document.getElementById('target');
const canvas2d = document.getElementById("canvas2d");
const ctx = canvas2d.getContext('2d');
const playVidButton = document.getElementById("playVidButton");


const colorList = ["#81dbc5", "#76b6db", "#7691e3", "#7d76e3"]
let flag = false;
let dim = 1;
let reachedTopFlag = false;



let userState = {level:null, duration: null, }

const stream = canvas2d.captureStream();
target.srcObject = stream;


if(target.paused){
  console.log("paused")
}

target.addEventListener("leavepictureinpicture", (event) => {
  //target.play();
  console.log("left");
  //canvas2d.style.display = "block";
  let customEvent = new Event("click");
  playVidButton.dispatchEvent(customEvent);
  canvas2d.style.display="block";
});


function playVid() { 
  target.play(); 
} 

function pauseVid() { 
  target.pause(); 
} 


const btn = document.getElementById('pip');
if( target.requestPictureInPicture ) {
  btn.onclick = e => target.requestPictureInPicture();
}
else {
  btn.disabled = true;
}

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


navigator.mediaSession.setActionHandler('previoustrack', function() {
    console.log('> User clicked "Previous Track" icon.');
    on();
});

navigator.mediaSession.setActionHandler('nexttrack', function() {
    console.log('> User clicked "Next Track" icon.');
});

navigator.mediaSession.setActionHandler("seekforward",()=>{
  console.log("seekforward");
})


navigator.mediaSession.setActionHandler("pause",()=>{
  console.log("pause");
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


var state = {

  passedList:[],
  //level 0 to 999
  currentLevel: 0,

  // Minute: seconds format
  currentDuration: 0,

  pausedFlag: false,

  resumeFlag: false,

  quitFlag: false,

  startNewLevel: function(){

    //set current level by getting current level + 1

    //start new time interval 




  }

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
        ctx.fillText(color.colorName, canvas2d.width/3, (y + canvas2d.height) / 2);


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

      if(this.colorsToPaint.length > 0){
        //reduce y coords seeminglessy to all color varaibles' y coord 
        this.colorsToPaint.forEach(color=> {
          color.coordY -= dim;
        })
        //call paint function to draw rect 
        this.paintNextLevel(this.colorsToPaint);
      }

      y -= dim;
      dim += 0.0001;
      
      //ctx.fillStyle = "white";
      //ctx.fillText( new Date().toTimeString().split(' ')[0], canvas2d.width / 2, canvas2d.height / 2 );


      requestAnimationFrame( this.anim.bind(this) );
  },
}
ctx.font = "50px Arial";
//ctx.textAlign = "center";
//ctx.textBaseline = "middle";
paint.anim();

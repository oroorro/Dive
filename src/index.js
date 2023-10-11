
console.log("yello");
const target = document.getElementById('target');
const canvas2d = document.getElementById("canvas2d");
const ctx = canvas2d.getContext('2d');
const colorList = ["#81dbc5", "#76b6db", "#7691e3", "#7d76e3"]
let flag = false;
let dim = 1;
let reachedTopFlag = false;



let userState = {level:null, duration: null, }

const stream = canvas2d.captureStream();
target.srcObject = stream;



const btn = document.getElementById('pip');
if( target.requestPictureInPicture ) {
  btn.onclick = e => target.requestPictureInPicture();
}
else {
  btn.disabled = true;
}

const actionHandlers = new Map([
    ['seekto', ()=>{}],
    ['pause', ()=>{console.log("paused")}]
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
    flag = flag == true ? false : true;
    y =  canvas2d.height;
    last = performance.now();
    dim = 1;
}


function paintNextLevel(){

}


var paint = {

    backgroundColor: "white",

    paintStaticBackground: function(color){
      ctx.fillStyle = color; 
      ctx.fillRect(0, 0, canvas2d.width, canvas2d.height);
    },
    anim:  function (timestamp){
      //setting default background 

      //ctx.fillStyle = "white"; 
      //ctx.fillRect(0, 0, canvas2d.width, canvas2d.height);
      this.paintStaticBackground(this.backgroundColor)

      if(!flag){
          //ctx.rect(0, y, canvas2d.width, canvas2d.height);
          ctx.fillStyle = colorList[0];
          if(y <= 0){
            this.backgroundColor = colorList[0];
          }
          ctx.fillRect(0, y, canvas2d.width, canvas2d.height);
        
      }else{
          ctx.fillStyle = colorList[1];
          if(y <= 0){
            this.backgroundColor = colorList[1];
          }
          ctx.fillRect(0, y, canvas2d.width, canvas2d.height);
          
        
        //console.log((timestamp - last)/10, y);
      }
      ctx.fill();
      console.log("dim: ", dim, "y: ", y);
    

      /*
      y -= (timestamp - last) / 10;
      last = timestamp;
      */
      y -= dim;
      dim += 0.0001;
      
      ctx.fillStyle = "white";
      ctx.fillText( new Date().toTimeString().split(' ')[0], canvas2d.width / 2, canvas2d.height / 2 );

      requestAnimationFrame( this.anim.bind(this) );
  },
}
ctx.font = "50px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
paint.anim();

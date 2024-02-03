let gunTop = 45;
let gunLeft = 45;
let maxTop  = 57;
let minTop = 20 ;
let maxLeft = 59;
let minLeft = 30;
let bulletDirection = "none";





document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp") {
        if(gunTop>minTop){
            gunTop--;
        document.querySelector(".gun").style.top = gunTop+"%"
        bulletDirection = "upwards";
        } 
    }
    if (event.key == "ArrowDown") {
        if(gunTop<maxTop){
            gunTop++;
            document.querySelector(".gun").style.top = gunTop+"%"
            bulletDirection = "downwards";

        }
     
    }
    if (event.key == "ArrowLeft") {
        if(gunLeft>minLeft)
        gunLeft--;
        document.querySelector(".gun").style.left = gunLeft+"%"
        bulletDirection = "leftwards";

    }
    if (event.key == "ArrowRight") {
        if(gunLeft<maxLeft){
            gunLeft++;
        document.querySelector(".gun").style.left = gunLeft+"%"
        bulletDirection = "rightwards";

        }
    }
  });


  document.addEventListener("keydown",  function(event){
    if(event.key == " "){
        
        var bullet = document.createElement("div");
        bullet.classList.add("bullet");
        document.body.appendChild(bullet);

        var bulletTop = gunTop+2;
        var bulletLeft = gunLeft+1;
        
        bullet.style.top = bulletTop+"%";
        bullet.style.left = bulletLeft+"%";
        
        moveBullet(bulletTop,bulletLeft,bullet)
    }
  })
  

//   making function to move bullet 


function moveBullet(top, left,b){
    switch (bulletDirection) {
        case "upwards":
            // setTimeout(()=>{
            //     top-=1;
            //     b.style.top = top+"%";
            // }, 1000);
            var interval = setInterval(()=>{
                        top-=1;
                        b.style.top = top+"%";
                        if(top <=0){
                            // close interval
                            clearInterval(interval);
                            b.remove();

                        }}, 50);
            
            break;
        case "downwards":
            var interval = setInterval(()=>{
                top+=1;
                b.style.top = top+"%";
                if(top >=97){
                    // close interval
                    clearInterval(interval);
                    b.remove();

                }}, 50);
            break;
        case "leftwards":
            var interval = setInterval(()=>{
                left-=1;
                b.style.left = left+"%";
                if(left <=0){
                    // close interval
                    clearInterval(interval);
                    b.remove();


                }}, 50);
            break;
        case "rightwards":
            var interval = setInterval(()=>{
                left +=1;
                b.style.left = left+"%";
                if(left >=98){
                    // close interval
                    clearInterval(interval);
                    b.remove();

                }}, 50);
            break;
    
        default:
            break;
    }
    // b.remove();

}

function enemySpawn(){
    
    var enemy = document.createElement("div");
    enemy.classList.add("enemy");
    document.body.appendChild(enemy);
    
    var leftPosition = Math.random() * 90 ;   /// 0 - 90 - { mintop-5  , maxtop+5 } 
    var topPosition = Math.random() * 90 ;    /// 0 - 90 - { MinLeft-5 , Maxleft+5 }

    enemy.style.top = topPosition + "%";
    enemy.style.left = leftPosition + "%";

    // red screen se hatana ka code likhna h
  
}

// code to generate enemy with time after a fixed interval


var enemyInterval = setInterval(enemySpawn,1000);


// collision 
// diagonal bug
// screen bug




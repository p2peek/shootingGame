let gunTop = 45;
let gunLeft = 45;
let maxTop  = 65;
let minTop = 20 ;
let maxLeft = 66;
let minLeft = 30;
let aimTop = gunTop + 2.8;
let aimLeft = gunLeft + 1.5;
let bulletDirection = "upwards";
let enemies = [];
let aimRotate = 0;
let score =0;


// to move gun

document.addEventListener("keydown", function (event) {
     if (event.key == "ArrowUp") {
        if(gunTop>minTop){
            gunTop--;
            aimTop--;
        document.querySelector(".gun").style.top = gunTop+"%" 
        document.querySelector(".aim").style.top = aimTop+"%"        

        } 
        bulletDirection = "upwards";
    }
    else if (event.key == "ArrowDown") {
        if(gunTop<maxTop){
            gunTop++;
            aimTop++;
            document.querySelector(".gun").style.top = gunTop+"%"
            document.querySelector(".aim").style.top = aimTop+"%"

        }
        bulletDirection = "downwards";
     
    }
    else if (event.key == "ArrowLeft") {
        if(gunLeft>minLeft)
        {
            gunLeft--;
            aimLeft--;
            document.querySelector(".gun").style.left = gunLeft+"%"
            document.querySelector(".aim").style.left = aimLeft+"%"

        }
        bulletDirection = "leftwards";
    }
    
    else if (event.key == "ArrowRight") {
        if(gunLeft<maxLeft){
            gunLeft++;
            aimLeft++;
            document.querySelector(".gun").style.left = gunLeft+"%"
            document.querySelector(".aim").style.left = aimLeft+"%"

        }
        bulletDirection = "rightwards";
    }
  });


// to release bullet

document.addEventListener("keydown",  function(event){
    if(event.key == " "){
        
        var bullet = document.createElement("div");
        bullet.classList.add("bullet");
        document.body.appendChild(bullet);

        var bulletTop = gunTop+2;
        var bulletLeft = gunLeft+1.32;
        
        bullet.style.top = bulletTop+"%";
        bullet.style.left = bulletLeft+"%";
        
        // moveBullet(bulletTop,bulletLeft,bullet)
        moveBulletDiagonal(bullet,bulletTop);
    }
})

// to rotate the aim

document.addEventListener("keydown",(event)=>{
    if(event.key == "a"){
        aimRotate-=15
        document.querySelector(".aim").style.transform = `rotate(${aimRotate}deg)`
    }
    if(event.key == "d"){
        aimRotate+=15
        document.querySelector(".aim").style.transform = `rotate(${aimRotate}deg)`
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

                        var collision = enemyDestroy(b);
                        
                        if(top <=0 ){
                            // close interval
                            clearInterval(interval);
                            b.remove();

                        }}, 50);
            
            break;
        case "downwards":
            var interval = setInterval(()=>{
                top+=1;
                b.style.top = top+"%";
                var collision = enemyDestroy(b);
                if(top >=97 ){
                    // close interval
                    clearInterval(interval);
                    b.remove();

                }}, 50);
            break;
        case "leftwards":
            var interval = setInterval(()=>{
                left-=1;
                b.style.left = left+"%";
                var collision = enemyDestroy(b);

                if(left <=0 ){
                    // close interval
                    clearInterval(interval);
                    b.remove();


                }}, 50);
            break;
        case "rightwards":
            var interval = setInterval(()=>{
                left +=1;
                b.style.left = left+"%";
                var collision = enemyDestroy(b);

                if(left >=98 ){
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

function moveBulletDiagonal(b,top){
    var endDiv = document.querySelector(".end").getBoundingClientRect();
    var startDiv = document.querySelector(".start").getBoundingClientRect();

    var y2 = endDiv.top;
    var x2 = endDiv.left;
    var y1 = startDiv.top;
    var x1 = startDiv.left;
    var x = x2;
    var rotate = aimRotate;
    var speedOfBullet = 6; 

    
    
    if(aimRotate<0){
        rotate = aimRotate%360;
        rotate=360-Math.abs(rotate);
    }

    if( (  (rotate%360) > 0 && (rotate%360) < 30  ) || ((rotate%360) > 330 && (rotate%360) < 360  ) || (  (rotate%360) > 145 && (rotate%360) <  200 )){
        speedOfBullet = 2;
    }

    
    if((rotate%360) < 360 && (rotate%360) > 180){
        
        var interval = setInterval(()=>{
            
            x+=speedOfBullet;
            var y  = ((y2-y1)/(x2-x1) * (x-x1)) + y1;
            b.style.top = y+"px";
            b.style.left = x+"px";

            enemyDestroy(b);

            if(x>1519 || y>755.2 || y <0){
                    clearInterval(interval);
                    b.remove();
            }
        },50)
        


    }
    else if( (rotate%360) > 0 && (rotate%360) <180){
        
        var interval = setInterval(()=>{
            x-=speedOfBullet;
            var y  = ((y2-y1)/(x2-x1) * (x-x1)) + y1;
            b.style.top = y+"px";
            b.style.left = x+"px";
            
            enemyDestroy(b);

            if(x<0 || y>755.2 || y <0){
                clearInterval(interval);
                b.remove();
            }
        },50)
    }
    else if((rotate%360) === 0){
        // move downwards

        var interval = setInterval(()=>{
            
            top++;
            b.style.top = top+"%";
    
            enemyDestroy(b);

            if(top>=97){
                clearInterval(interval);
                b.remove();
            }
        },50)
    }
    else if((rotate%180) === 0){
        // move downwards

        var interval = setInterval(()=>{
            
            top--;
            b.style.top = top+"%";
    
            enemyDestroy(b);

    
            if(top<=0){
                clearInterval(interval);
                b.remove();
            }
        },50)
    }

}

function enemySpawn(){
    
    var enemy = document.createElement("div");
    enemies.push(enemy);

    enemy.classList.add("enemy");
    document.body.appendChild(enemy);
    
    var leftPosition = Math.random() * 90 ;   /// 0 - 90 - { mintop-5  , maxtop+5 } 
    var topPosition = Math.random() * 90 ;    /// 0 - 90 - { MinLeft-5 , Maxleft+5 }

    if(topPosition>=(minTop-3) && (topPosition<=maxTop+3)){
        while(true){
            if(leftPosition <=(maxLeft+3) && leftPosition >= (minLeft-3)){
                 leftPosition = Math.random() *90
            }else{
                break;
            }
        }
    }
    enemy.style.top = topPosition + "%";
    enemy.style.left = leftPosition + "%";

    // red screen se hatana ka code likhna h
  
}

// code to generate enemy with time after a fixed interval


var enemyInterval = setInterval(enemySpawn,1000);



function checkCollision(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
             rect1.left > rect2.right ||
             rect1.bottom < rect2.top ||
             rect1.top > rect2.bottom);
  }

function enemyDestroy(bull){
    var flag = false
    for( i = 0;i<enemies.length;i++){
        var ene = enemies[i];
        if(checkCollision(bull,ene)){
            enemies[i].remove();
            // bull.remove();
            if(flag===false){
                score++;
                console.log("Score", score);
                document.querySelector(".score").innerHTML= "SCORE : "+score;

            }
            flag = true;
            break;
        }
        
    }

}

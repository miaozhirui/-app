var canvas = document.querySelector('#canvas');

if (canvas.getContext) {

    ctx = canvas.getContext('2d');

    // ctx.fillStyle = "rgb(200,0,0)";
    // ctx.fillRect(10, 10, 55, 50);

    // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    // ctx.fillRect(30, 30, 55, 50);
    //   ctx.fillRect(25,25,100,100);
    // ctx.clearRect(45,45,60,60);
    // ctx.strokeRect(50,50,50,50);
    // console.dir(ctx);
    // ctx.fillStyle="red";
    // ctx.fillRect(25,25,100,100);
    // ctx.clearStyle="green";
    // ctx.clearRect(45,45,60,60);
    // ctx.strokeStyle = "rgb(200,0,0)";
    // ctx.strokeRect(50,50,50,50)
    // 
    // ctx.beginPath();
    // ctx.moveTo(75,50);
    // ctx.lineTo(100,75);
    // ctx.lineTo(100,100);
    // ctx.fill();
    // ctx.beginPath();

    // ctx.moveTo(50,100);
    // ctx.lineTo(100,100);
    // ctx.lineTo(100,600);
    // ctx.lineTo(50,600);
    // ctx.fill();

    // ctx.beginPath();
    // ctx.arc(75,75,50,0,Math.PI*2,true); // 绘制
    // ctx.moveTo(110,75);
    // ctx.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
    // ctx.moveTo(65,65);
    // ctx.arc(60,65,5,0,Math.PI*2,true);  // 左眼
    // ctx.moveTo(95,65);
    // ctx.arc(90,65,5,0,Math.PI*2,true);  // 右眼
    // ctx.stroke();
    // var lineCap = ['butt','round','square'];
    // ctx.strokeStyle = '#09f';
    // ctx.beginPath();
    // ctx.moveTo(10, 10);
    // ctx.lineTo(140, 10);
    // ctx.moveTo(10, 140);
    // ctx.lineTo(140, 140);
    // ctx.stroke();
    // ctx.strokeStyle = 'black';
    
    // for (var i = 0; i < lineCap.length; i++) {
    //     ctx.lineWidth = 15;
    //     ctx.lineCap = lineCap[i];
    //     ctx.beginPath();
    //     ctx.moveTo(25 + i * 50, 10);
    //     ctx.lineTo(25 + i * 50, 140);
    //     ctx.stroke();
    // }
    
    // ctx.font = "48px serif";
    // ctx.fillText('缪志锐', 10,50);
    // ctx.strokeText('缪志瑞',10,50);
    
    // var image = new Image;
    // image.src = "http://www.baidu.com/img/bd_logo1.png";
    // image.style.width=50;
    // image.style.height = 50;
    // console.dir(image);
    // image.onload = function(){
    //      ctx.drawImage(image,0,0,100,100);
    //       ctx.beginPath();
    //       ctx.moveTo(30,96);
    //       ctx.lineTo(70,66);
    //       ctx.lineTo(103,76);
    //       ctx.lineTo(170,15);
    //       ctx.stroke();
    // }


  ctx.fillRect(0,0,150,150);
  ctx.translate(75,75);

  // Create a circular clipping path
  ctx.beginPath();
  ctx.arc(0,0,60,0,Math.PI*2,true);
  ctx.clip();

  // draw background
  var lingrad = ctx.createLinearGradient(0,-75,0,75);
  lingrad.addColorStop(0, '#232256');
  lingrad.addColorStop(1, '#143778');
  
  ctx.fillStyle = lingrad;
  ctx.fillRect(-75,-75,150,150);

  // draw stars
  for (var j=1;j<50;j++){
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.translate(75-Math.floor(Math.random()*150),
                  75-Math.floor(Math.random()*150));
    drawStar(ctx,Math.floor(Math.random()*4)+2);
    ctx.restore();
  }
  
}
function drawStar(ctx,r){
  ctx.save();
  ctx.beginPath()
  ctx.moveTo(r,0);
  for (var i=0;i<9;i++){
    ctx.rotate(Math.PI/5);
    if(i%2 == 0) {
      ctx.lineTo((r/0.525731)*0.200811,0);
    } else {
      ctx.lineTo(r,0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();






















}
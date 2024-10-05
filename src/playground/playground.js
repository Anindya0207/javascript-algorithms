
  
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const animate = () =>  {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
        renderClock(ctx);
        renderHands(ctx);
    }
    const renderClock = (ctx) => {
        ctx.beginPath();
        ctx.fillStyle ='yellow';
        ctx.strokeStyle ='green';
        ctx.lineWidth = 4;
        ctx.arc(400, 400, 300, 0, 2 * Math.PI);
        ctx.closePath()
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle ='red';
        ctx.beginPath();
        ctx.arc(400, 400, 3, 0, 2 * Math.PI);
        ctx.closePath()
        ctx.fill();
    }
    const renderHands = (ctx) => {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderClock(ctx);
        ctx.beginPath();
        
        angleSec = xSec * Math.PI / 180;
        angleMin = xMin * Math.PI / 180;
        let x1 = 400, y1 = 400;
        let x2 = x1 + 280 * Math.cos(angleSec);
        let y2 = y1 + 280 * Math.sin(angleSec);
        let x3 = x1 + 180 * Math.cos(angleMin);
        let y3 = y1 + 180 * Math.sin(angleMin);
        let x4 = x1 + 100 * Math.cos(angleMin);
        let y4 = y1 + 100 * Math.sin(angleMin);
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'black';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'blue';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x3, y3);
        ctx.stroke();
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'green';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x4, y4);
        ctx.stroke();
        xSec += 6; 
        xMin += 0.1;
        xHr += 6 / 3600;
        setTimeout(() => {
            requestAnimationFrame(() => renderHands(ctx));
        }, 1000 );
    }
    var xSec = -90;
    var xMin = -90;
    var xHr = -90;
    animate()
})
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let {sin, cos, PI} = Math;
let doublePendulum;
let tracer;
let fps;
let then;

function animate() {
    window.requestAnimationFrame(animate);
    
    let now = Date.now();
    let fpsInterval = 1000/fps;
    if(now-then>fpsInterval) {
        then = now-((now-then)%fpsInterval);
        ctx.fillStyle = "black";
        ctx.fillRect(-canvas.width/2, canvas.height/2, canvas.width, -canvas.height);
        doublePendulum.calculate(tracer);
    }
}

function init() {
    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight;

    ctx.transform(1, 0, 0, -1, canvas.width/ 2, canvas.height / 2);

    let ang = Math.random()*1+1;
    doublePendulum = new DoublePendulum(0, canvas.height/4, 1, canvas.height/3, ang, 0.5, canvas.height/3, ang+0.02, "blue", ctx);

    fps = 120;
    then = Date.now();

    tracer = [];
}

window.onload = window.onresize = () => {
    init();
}

init();
animate();



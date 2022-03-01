class DoublePendulum{
    constructor(fx, fy, m1, l1, a1, m2, l2, a2, color, ctx) {
        this.fx = fx;
        this.fy = fy;
        this.m1 = m1;
        this.l1 = l1;
        this.l2 = l2;
        this.m2 = m2;
        this.a1 = a1;
        this.a2 = a2;
        this.color = color;

        this.x1 = fx + l1*sin(a1);
        this.y1 = fy - l2*cos(a1);
        this.x2 = this.x1+l2*sin(a2);
        this.y2 = this.y1-l2*cos(a2);

        this.a1_v = 0;
        this.a2_v = 0;
        this.g = 0.1;

        this.ctx = ctx;
    }

    calculate(tracer) {
        let {fx, fy, m1, a1, m2, a2, a1_v, a2_v, g, l1, l2} = this;

        let num1 = -g*(2*m1+m2)*sin(a1);
        let num2 = m2*g*sin(a1-2*a2);
        let num3 = 2*sin(a1-a2)*m2;
        let num4 = a2_v*a2_v*l2 + a1_v*a1_v*l1*cos(a1-a2);
        let den = l1*(2*m1+m2-m2*cos(2*a1-2*a2));

        let a1_a = (num1-num2-num3*num4)/den;

        num1 = 2*sin(a1-a2);
        num2 = a1_v*a1_v*l1*(m1+m2);
        num3 = g*(m1+m2)*cos(a1);
        num4 = a2_v*a2_v*l2*m2*cos(a1-a2);
        den = l2*(2*m1+m2-m2*cos(2*a1-2*a2));

        let a2_a = num1*(num2+num3+num4)/den;

        this.a1_v += a1_a;
        this.a2_v += a2_a;
        this.a1 += this.a1_v;
        this.a2 += this.a2_v;

        this.x1 = fx + l1*sin(this.a1);
        this.y1 = fy - l2*cos(this.a1);
        this.x2 = this.x1+l2*sin(this.a2);
        this.y2 = this.y1-l2*cos(this.a2);

        if(tracer.length<50) tracer.push({x:this.x2, y:this.y2});
        else tracer.shift();

        this.draw();
    }

    draw() {
        let {fx, fy, x1, y1, x2, y2} = this;
        let {ctx} = this;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x1, y1, 5, 0, 2*PI, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x2, y2, 5, 0, 2*PI, false);
        ctx.fillStyle = "white";
        ctx.fill();

        if(tracer.length>1) {
            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.moveTo(tracer[0].x, tracer[0].y);
            for(let i=1; i<tracer.length; i++) {
                ctx.lineTo(tracer[i].x, tracer[i].y);
            }
            ctx.stroke();
        }
    }

}
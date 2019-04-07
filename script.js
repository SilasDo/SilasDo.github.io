let balls = new Array();
let farben = ['#4717F6', '#A239CA', '#DC7633', '#186A3B', '#0101DF', '#DF013A', '#D7DF01', '#FAFAFA', '#2EFE2E']
function setup() {
    var cnv = createCanvas(windowWidth,windowHeight);
    cnv.style('display', 'block');

    for (let i = 0; i < 10; i++) {
        balls.push(new mas(i * 50 + 50, 100, 1, random(-1, 1), random(-1, 1)));
    }
    //balls[0].pos.y=100;
    //balls.push(new mas(500, 1, 0, 0));
}

function draw() {

    background(22);
    for (let i = 0; i < balls.length; i++) {
        //speed
        for (let k = 0; k < 3; k++) {
            balls[i].move();
            //collisions
            for (let j = i + 1; j < balls.length; j++) {
                let dis = balls[i].pos.dist(balls[j].pos);


                if (dis <= balls[i].d) {


                    if (samecolor() && i == 0) {
                        balls[0].c = Math.round(random(0, farben.length - 1));
                    }


                    //elastic collision
                    let m1 = balls[i].m; let m2 = balls[j].m;
                    let v1 = balls[i].v; let v2 = balls[j].v;
                    let x1 = balls[i].pos; let x2 = balls[j].pos;

                    //v1'
                    let m = 2 * m2 / (m1 + m2);
                    let vsub = p5.Vector.sub(v1, v2);
                    let xsub = p5.Vector.sub(x1, x2);
                    let pnkt = p5.Vector.dot(vsub, xsub);
                    let mgsq = dis * dis;
                    let s1 = (pnkt / mgsq) * m;
                    xsub.mult(s1);
                    balls[i].v = p5.Vector.sub(v1, xsub);
                    //v2'
                    m = 2 * m1 / (m1 + m2);
                    vsub = p5.Vector.sub(v2, v1);
                    xsub = p5.Vector.sub(x2, x1);
                    pnkt = p5.Vector.dot(xsub, vsub);
                    mgsq = dis * dis;
                    s1 = (pnkt / mgsq) * m;
                    xsub.mult(s1);
                    balls[j].v = p5.Vector.sub(v2, xsub);
                    balls[j].c = balls[i].c;
                }
            }
        }

        balls.forEach(element => {
            element.draw();
        });

    }

    //noLoop();
}

function samecolor() {
    for (let i = 1; i < balls.length; i++) {
        if (balls[0].c != balls[i].c) {
            return false;
        }
    }
    return true;
}

class mas {
    constructor(x, y, m, vx, vy) {
        this.m = m;
        this.d = 20
        this.pos = createVector(x, y);
        this.v = createVector(vx, vy);
        this.c = Math.round(random(0, farben.length - 1));
    }
    move() {
        this.pos.x += this.v.x;
        this.pos.y += this.v.y;
        if (this.pos.x + this.d / 2 >= width || this.pos.x - this.d / 2 <= 0) { this.v.x *= -1; }
        if (this.pos.y + this.d / 2 >= height || this.pos.y - this.d / 2 <= 0) { this.v.y *= -1; }

    }
    draw() {
        fill(farben[this.c]);
        ellipse(this.pos.x, this.pos.y, this.d, this.d);
    }
}
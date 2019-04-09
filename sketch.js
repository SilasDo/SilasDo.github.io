let balls = new Array();
let farben = ['#4717F6', '#A239CA', '#DC7633', '#186A3B', '#0101DF', '#DF013A', '#D7DF01', '#FAFAFA', '#2EFE2E']
speed = 5;
function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');


    // fckwrt();
    //balls.push(new mas(0 + width / 25, height / 2 - width / 100, 1, 1, 1))
    for (let i = 0; i < 14; i++) {
        balls.push(new mas(i * width/25 + width/25,height/2 -width/100, 1,random(-1,1), random(-1,1)))
    }
}

function draw() {
    //noLoop();
    background(15);

    for (let k = 0; k < speed; k++) {


        for (let i = 0; i < balls.length; i++) {

            balls[i].move();


            //collisions
            for (let j = i + 1; j < balls.length; j++) {
                let dis = balls[i].pos.dist(balls[j].pos);


                if (dis <= balls[i].d) {

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
                    if (samecolor() && i == 0) {
                        balls[0].c = Math.round(random(0, farben.length - 1));
                    }
                }
            }
        }

    }
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
    }
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
        this.d = width / 50;
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
        //fill('#A239CA');
        ellipse(this.pos.x, this.pos.y, this.d, this.d);
    }
}
function fckwrt() {
    //F
    balls.push(new mas(50, 300, 1, random(-1, 1), random(-1, 1)));
    balls.push(new mas(50, 270, 1, random(-1, 1), random(-1, 1)));
    balls.push(new mas(50, 240, 1, random(-1, 1), random(-1, 1)));
    balls.push(new mas(50, 210, 1, random(-1, 1), random(-1, 1)));
    balls.push(new mas(50, 180, 1, random(-1, 1), random(-1, 1)));

    balls.push(new mas(80, 180, 1, random(-1, 1), random(-1, 1)));
    balls.push(new mas(110, 180, 1, random(-1, 1), random(-1, 1)));
    balls.push(new mas(140, 180, 1, random(-1, 1), random(-1, 1)));
    balls.push(new mas(80, 240, 1, random(-1, 1), random(-1, 1)));
    balls.push(new mas(110, 240, 1, random(-1, 1), random(-1, 1)));
    balls.push(new mas(140, 240, 1, random(-1, 1), random(-1, 1)));
}
function abs_constrain(val, min, max){
    if (min < max){
        return constrain(val, min, max);
    } else{
        return constrain(val, max, min);
    }
}

// header_t //
function make_header(){
    let h = {
        parent: null,
        children: null,
        draw: draw_header,
        overlap: overlap_header,
        update: update_header,
        resize: resize_header,
    };

    return h;
}

function draw_header(){
    for (let i = 0; i < this.children.length; i++){
        this.children[i].draw();
    }
}

function overlap_header(){
    return;
}

function update_header(){
    return;
}

function resize_header(rx, ry){
    return;
}

// group_t //
function make_group(gparent, gname, grole, gimg, gisperson){

    let gx_origin;
    let gy_origin;

    if (gparent == null){
        gx_origin = 0;
        gy_origin = 0;
    } else {
        gx_origin = gparent.x_target;
        gy_origin = gparent.y_target;
    }

    let imgW = 100;
    let imgH = 300;

    let coheads = [
        "JESSICA LAI", "OLIVIA LUK", "SHANNON LEE", 
        "CAMILLE CHANDLER", "ALANA WU", 
        "SOWANG KUNDELING", "ELLA SANAFILLIPO"
    ];

    let heads = [
        "HEYSU OH", "SABRINA XU", "CHRISTY ZO",
        "VIVIAN LEE", "CODY RONG",
        "MORGAN BOYD",
        "SABINA SPEKTOR",
        "OSCAR MONARREZ",
        "PEIRAN GE"
    ]

    if (grole == "PRODUCERS"){
        grole = "PRODUCER";
    } else if (coheads.includes(gname.toUpperCase())){
        grole = grole.replace('', 'CO-')
        grole += " HEAD";
    } else if (heads.includes(gname.toUpperCase())){
        grole += " HEAD";
    } else if (gname.toUpperCase() == "ANITA CHENG"){
        grole += ", TREASURER";
    }

    let g = {
        x_target: random(imgW/2, windowWidth - imgW/2), 
        y_target: random(imgH/2, windowHeight - imgH/2), 
        x_origin: gx_origin, y_origin: gy_origin,
        x_actual: gx_origin, y_actual: gy_origin, // initially at origin
        text_x: random(0, imgW), text_y: random(0, imgW),
        speed: 15,
        img: gimg,
        name: gname,
        role: grole,
        alpha: 0,
        text_alpha: 0,
        parent: gparent, //group_t
        children: [], //group_t[]
        active: false,
        draw: draw_group,
        move: move_group,
        resize: resize_group,
        overlap: overlap_group,
        isperson: gisperson, // for recursion
        wait: 0,
        rpx: null,
        rpy: null,
    };

    return g;
}

function draw_group(){
    push();

    translate(this.x_actual, this.y_actual);
    tint(255, this.alpha);
    image(this.img, 0, 0);

    noStroke();;
    fill(0, this.alpha);
    textFont(isenheim);
    textSize(22);
    fill(0, this.text_alpha);
    text(this.name.toUpperCase(), this.text_x, this.text_y);
    text(this.role.toUpperCase(), this.text_x, this.text_y + 28);

    pop();

    // for (let i = 0; i < this.children.length; i++){
    //     this.children[i].draw();
    // }
}

function move_group(rpx, rpy){
    let dx = (this.x_target - this.x_origin)/ this.speed;
    let dy = (this.y_target - this.y_origin)/ this.speed;

    if (this.parent.active) dir = 1;
    else dir = -1;

    let rpc = 5000; // repulsion force

    if (rpx == null && this.wait > 20){ //groups are in normal positions
        this.wait++;

        this.x_actual += (dir * dx);
        this.y_actual += (dir * dy);
        this.alpha += (dir * 255/this.speed);

        this.x_actual = abs_constrain(this.x_actual, this.x_origin, this.x_target);
        this.y_actual = abs_constrain(this.y_actual, this.y_origin, this.y_target);

    } else if (rpx == null && this.wait <= 20){ //groups are moving back to normal positions
        this.wait++;

        let dp = dist(this.x_actual, this.y_actual, this.rpx, this.rpy);

        if (dp != 0){
            let f = rpc / dp;
            let dirx = (this.x_actual - this.rpx) / dp;
            let diry = (this.y_actual - this.rpy) / dp;
            this.x_actual -= dirx*f;
            this.y_actual -= diry*f;

            this.x_actual = abs_constrain(this.x_actual, this.x_target, this.x_target + (rpc/600)*dirx*f);
            this.y_actual = abs_constrain(this.y_actual, this.y_target, this.y_target + (rpc/600)*diry*f);
        }
    }else if (rpx != null){ // groups are in / moving to repelled positions
        this.wait = 0;
        
        this.rpx = rpx;
        this.rpy = rpy;

        let dp = dist(this.x_actual, this.y_actual, rpx, rpy);

        if (dp != 0){
            let f = rpc / dp;
            let dirx = (this.x_actual - rpx) / dp;
            let diry = (this.y_actual - rpy) / dp;
            this.x_actual += dirx*f;
            this.y_actual += diry*f;

            this.x_actual = abs_constrain(this.x_actual, this.x_target, this.x_target + (rpc/600)*dirx*f);
            this.y_actual = abs_constrain(this.y_actual, this.y_target, this.y_target + (rpc/600)*diry*f);
        }
    }

    this.alpha = constrain(this.alpha, 0, 255);

    for (let i = 0; i < this.children.length; i++){
        this.children[i].move();
    }
}

function resize_group(sx, sy){
    this.img.resize(this.img.width * sx, this.img.height * sy);
}

function overlap_group(){

    let centeredX = width / 2 - mouseX;
    let centeredY = height / 2 - mouseY;
    
    let lineX_lower = this.x_actual - this.img.width/2 - width/2;
    let lineX_upper = this.x_actual + this.img.width/2 - width/2;
    let lineY_lower = this.y_actual - this.img.height/2 - height/2;
    let lineY_upper = this.y_actual + this.img.height/2 - height/2;
    if (
        lineX_lower < centeredX &&
        centeredX < lineX_upper &&
        lineY_lower < centeredY &&
        centeredY < lineY_upper
      ) {
        return true;
      }
    
      return false;
}
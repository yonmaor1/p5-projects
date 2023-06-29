// let cnv;
// let viewport = document.getElementById('viewport');
// let VIEWWIDTH = viewport.clientWidth;
// let VIEWHEIGHT = viewport.clientHeight;

let bgImg;
let STATE; // state_t
let MASTER;
let wait_time = 0;
let CURSOR;
let IMAGES = [];
let ppl_assets;

function make_state(group){
  let s = {
    active_group: group,
    last_group: null
  };

  return s;
}

// group + person API //

// group_t make_group(parent, name)

// void g.draw()

// void g.update()

// bool g.overlap()

// person_t make_person(img, parent, name)

// void g.draw()

// void g.update()

// void g.resize()

// bool g.overlap()

function make_group_tree(){  
  let generic_img = loadImage("assets/generic.png");
  let cin_img = loadImage("assets/cinematography.png");
  let creative_img = loadImage("assets/creative.png");
  let web_img = loadImage("assets/web.png");
  let motion_img = loadImage("assets/motion.png");
  let print_img = loadImage("assets/print.png");
  let photo_img = loadImage("assets/photo.png");
  let dance_img = loadImage("assets/dance.png");
  let design_img = loadImage("assets/design.png");
  let model_img = loadImage("assets/model.png");
  let pr_img = loadImage("assets/pr.png");
  let producers_img = loadImage("assets/producers.png");
  let production_img = loadImage("assets/production.png");
  // print(production_img.width);


  MASTER = make_group(null, 'People', '', generic_img, false);
  MASTER.active = true;
    let CINEMATOGRAPHY = make_group(MASTER, 'Cinematography', '', cin_img, false);
    let CREATIVE = make_group(MASTER, 'Creative', '', creative_img, false);
      let WEB = make_group(CREATIVE, 'Web', '', web_img, false);
      let MOTION = make_group(CREATIVE, 'Motion', '', motion_img, false);
      let PRINT = make_group(CREATIVE, 'Print', '', print_img, false);
      let PHOTO = make_group(CREATIVE, 'Photo', '', photo_img, false);
    let DANCE = make_group(MASTER, 'Dance', '', dance_img, false);
    let DESIGN = make_group(MASTER, 'Design', '', design_img, false);
    let MODEL = make_group(MASTER, 'Model', '', model_img, false);
    let PR = make_group(MASTER, 'PR', '', pr_img, false);
    let PRODUCERS = make_group(MASTER, 'Producers', '', producers_img, false);
    let PRODUCTION = make_group(MASTER, 'Production', '', production_img, false);

  let groups = [CINEMATOGRAPHY, CREATIVE, DANCE, DESIGN, MODEL, PR, PRODUCERS, PRODUCTION];
  let groups_dict = {};
  for (let i = 0; i < groups.length; i++){
    groups_dict[groups[i].name] = groups[i];
  }

  MASTER.children = groups;
  print(ppl_assets);
  // let creative_groups = [WEB, MOTION, PRINT, PHOTO];
  // CREATIVE.children = creative_groups;

  for (let i = 0; i < ppl_assets.children.length; i++){
    let curr_group = ppl_assets.children[i];

    // print(curr_group.name);
    for (let j = 0; j < curr_group.children.length; j++){
      // print(curr_group.children[j].name);
      if (curr_group.children[j].type == 'file'){
        let curr_file = curr_group.children[j].name;
        if (curr_file != ".DS_Store"){
          let curr_img = loadImage("assets/people/" + curr_group.name + "/" + curr_file);
          // print("assets/people/" + curr_group.name + "/" + curr_file);
          let curr_name = curr_group.children[j].name.split(".")[0];
          curr_name = curr_name.replace("-", " ");
          curr_role = curr_group.name.toUpperCase();
          // print(curr_name);

          let curr_person = make_group(groups_dict[curr_group.name], curr_name, curr_role, curr_img, true);
          curr_person.text_x = 0;
          curr_person.text_y = 150;
          groups_dict[curr_group.name].children.push(curr_person);
        }
      } else {
        for (let k = 0; k < curr_group.children[j].children.length; k++){
          let curr_subfile = curr_group.children[j].children[k].name;
          if (curr_subfile != ".DS_Store"){
            let curr_img = loadImage("assets/people/" + curr_group.name + "/" + curr_group.children[j].name + '/' + curr_subfile);
            // print("assets/people/" + curr_group.name + "/" + curr_file);
            let curr_name = curr_group.children[j].children[k].name.split(".")[0];
            curr_name = curr_name.replaceAll("-", " ").replaceAll("_", " ").toUpperCase();
            let curr_role = curr_group.children[j].name.toUpperCase();
            // print(curr_name);

            let curr_person = make_group(groups_dict[curr_group.name], curr_name, curr_role, curr_img, true);
            curr_person.text_x = 0;
            curr_person.text_y = 150;
            groups_dict[curr_group.name].children.push(curr_person);
          }
        }
      }
    }
  }

  // let best_names = ['Katie Shaw', 'Melody Huang', 'Yon Maor'];
  // let best_urls = ['assets/katie-shaw.png', 'assets/melody-huang.png', 'assets/yon-maor.png']

  // for (let i = 0; i < groups.length; i++){
  //   if (groups[i] == CREATIVE){
  //     for (let j = 0; j < creative_groups.length; j++){
  //       for (let k = 0; k < 8; k++){
  //         let index = floor(random(3));
  //         let curr_name = best_names[index]
  //         let curr_img = loadImage(best_urls[index]);
  //         let curr_person = make_group(creative_groups[j], curr_name, curr_img, true);
          
  //         creative_groups[j].children.push(curr_person);
  //       }
        
  //     }
  //   }
  //   else {
  //     for (let k = 0; k < 8; k++){
  //       let index = floor(random(3));
  //       let curr_name = best_names[index]
  //       let curr_img = loadImage(best_urls[index]);
  //       let curr_person = make_group(groups[i], curr_name, curr_img, true);
      
  //       groups[i].children.push(curr_person);
  //     }
  //   }
  // }

}

function preload() {

  ppl_assets = loadJSON("assets/people-files.json");
  // print(ppl_assets);

  bgImg = loadImage("assets/ppl-bg.png");
  isenheim = loadFont("assets/fonts/Isenheim_Regulier.otf");

  // cursor
  let inner = loadImage('cursor/assets/moR_inner.png');
  let outer = loadImage('cursor/assets/moR_outer.png');
  IMAGES = [inner, outer];

}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  noCursor();

  make_group_tree();

  STATE = make_state(MASTER);
  CURSOR = make_cursor(width / 2, height / 2, IMAGES);

  bgImg.resize(width * 3070 / 1728, height * 2090 / 1116);

}

function draw() {
  wait_time++;
  // cnv.parent('viewport');

  push();
  translate(mouseX - width / 2, mouseY - height / 2);

  background(244, 243, 239) //, 80);
  // tint(255, 80);
  imageMode(CORNER);
  // image(bgImg, width * (2300-28929)/1728, height * (1260-3212)/1116);
  image(bgImg, -2*height/3, -2*height/3);
  imageMode(CENTER);

  let rpx = null;
  let rpy = null;

  let found_overlap = false;
  for (let i = 0; i < STATE.active_group.children.length; i++){
    let curr_group = STATE.active_group.children[i];
    if (curr_group.overlap() && wait_time > 20){
      CURSOR.active = true
      found_overlap = true;
      rpx = curr_group.x_actual;
      rpy = curr_group.y_actual;
      curr_group.text_alpha = 255;
    }
    else {
      curr_group.text_alpha = 0;
    }
  }

  if (!found_overlap) CURSOR.active = false;

  for (let i = 0; i < STATE.active_group.children.length; i++){
    let curr_group = STATE.active_group.children[i];
    // print(curr_group.x_actual);
    curr_group.draw();
    curr_group.move(rpx, rpy);
  }

  if (STATE.last_group != null){
    for (let i = 0; i < STATE.last_group.children.length; i++){
      let curr_group = STATE.last_group.children[i];
      // print(curr_group.x_actual);
      curr_group.draw();
    }
  }

  pop();

  CURSOR.move();
  CURSOR.draw();
}

function mousePressed() {
  wait_time = 0;

  for (let i = 0; i < STATE.active_group.children.length; i++){
    if (STATE.active_group.children[i].isperson && STATE.active_group.children[i].overlap()){
      return;
    }
    if (STATE.active_group.children[i].overlap()){
      STATE.active_group.children[i].active = true;
      STATE.active_group = STATE.active_group.children[i];
      return;
    }
  }

  if (STATE.active_group.parent == null) return;

  STATE.active_group.active = false;
  STATE.last_group = STATE.active_group;
  STATE.active_group = STATE.active_group.parent;

}

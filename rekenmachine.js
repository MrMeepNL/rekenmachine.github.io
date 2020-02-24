let buttons = [];
let actions = [];
let operators = [];
let INT,a,b,c = 0;
let calculation = '';
//classes ----------------
class Button{
	constructor(a,x,y,l,h,t){
		this.a = a;
		this.x = x;
    this.y = y;
    this.l = l;
		this.h = h;
		this.t = t;
	}
	hovered(){
		fill(0,0,255);
		rect(this.x,this.y,this.l,this.h);
		fill(255);
		text(this.t,this.x+this.l/2-10,this.y+this.h/2-10,500);
	}
	display(){
		textSize(20);
		fill(255);
		rect(this.x,this.y,this.l,this.h);
		fill(12,25,156);
		text(this.t,this.x+this.l/2-10,this.y+this.h/2-10,500);
	}
	clicked(){
		actions.push(this.a);
	}
}
//functions ----------------
function display_all(){
	for (let i=0;i<buttons.length;i++){
    buttons[i].display();
  }
}
function factorial(n) {
  return (n!= 1)?n *factorial(n - 1):1;//recursief, van https://javascript.info/task/factorial
}
function screen(){
	rect(20,20,480,280);
	fill(255);
	print(actions);
	if (actions.includes('=')===false){
		if (actions.length<42){
			text(actions.join(""),475-actions.length*10.9,250);
		}else{
			text(actions.slice(actions.length-42,actions.length+1).join(""),25,250);
			print((actions.slice(actions.length-42,actions.length+1).join("")));
		}
	}
	else if(actions.includes('+')===true){
			a = parseInt(actions.slice(0,actions.indexOf('+')).join(''),10)
			b = parseInt(actions.slice(actions.indexOf('+')+1,actions.length-1).join(''),10)
			text(a+b,100,100);
		  actions = [];
	}
	else if(actions.includes('x')===true){
			print(actions[0]);
			a = parseInt(actions.slice(0,actions.indexOf('x')).join(''),10)
			b = parseInt(actions.slice(actions.indexOf('x')+1,actions.length-1).join(''),10)
			text(a*b,100,100);
			actions = [];
	}
	else if(actions.includes('^')===true){
			print(actions[0]);
			a = parseInt(actions.slice(0,actions.indexOf('^')).join(''),10)
			b = parseInt(actions.slice(actions.indexOf('^')+1,actions.length-1).join(''),10)
			text(Math.pow(a,b),100,100);
			actions = [];
	}
	else if(actions.includes('!')===true){
			print(actions[0]);
			a = parseInt(actions.slice(0,actions.indexOf('!')).join(''),10)
			b = parseInt(actions.slice(actions.indexOf('!')+1,actions.length-1).join(''),10)
			text(factorial(a),100,100);
			actions = [];
	}
}
//setup & draw ----------------
function setup(){
	screen();
	textSize(50);
	background(50);
	createCanvas(500,800);
	buttons.push(new Button('0',20,700,150,100,0));
	buttons.push(new Button('1',20,600,100,100,1));
	buttons.push(new Button('2',120,600,100,100,2));
	buttons.push(new Button('3',220,600,100,100,3));
	buttons.push(new Button('4',20,500,100,100,4));
	buttons.push(new Button('5',120,500,100,100,5));
	buttons.push(new Button('6',220,500,100,100,6));
	buttons.push(new Button('7',20,400,100,100,7));
	buttons.push(new Button('8',120,400,100,100,8));
	buttons.push(new Button('9',220,400,100,100,9));
	
	buttons.push(new Button('!',170,300,150,100,'a!'));
	buttons.push(new Button('^',320,300,150,100,'a^b'));
	buttons.push(new Button('x',320,400,150,100,'x'));
	buttons.push(new Button('+',320,500,150,100,'+'));
	buttons.push(new Button('=',320,600,150,100,'='));
}
function draw(){
	display_all();
	for (i=0;i<buttons.length;i++){
		if((mouseX>buttons[i].x)&& (mouseX<buttons[i].x+buttons[i].l) &&
			 (mouseY>buttons[i].y) && (mouseY<buttons[i].y+buttons[i].h)){
			 display_all();
			 buttons[i].hovered();
		}
	}
}
function mouseClicked(){
	for (i=0;i<buttons.length;i++){
		if((mouseX>buttons[i].x)&& (mouseX<buttons[i].x+buttons[i].l) &&
			 (mouseY>buttons[i].y) && (mouseY<buttons[i].y+buttons[i].h)){
			 display_all();
			 buttons[i].clicked();
			 screen();
		}
	}
}









//declaring global arrays and vars
let Line0 = [];
let Line1 = [];
let Line2 = [];
let Line3 = [];
let Line4 = [];
let buttons = [];
let actions = [];
let operators = [];
let ansTransfer = [];
let INT,a,b,c,offset,canvas = 0;//can only be done with ints
let Ans = 0.0000;
let calculation = '';//empty string
//classes ----------------
class Button{//Contains functions for OUR buttons
	constructor(a,x,y,l,h,t){
		//makes vars work for each individual button pushed into buttons{array}.
		this.a = a;
		this.x = x;
    this.y = y;
    this.l = l;
		this.h = h;
		this.t = t;
	}
	hovered(){//returns blue buttons if hovered basically
		offset = 15;//offset in x direction
		if (this.a==='C'||this.a==='ans'){
			offset = 40;//prevents text clipping behind buttons
		}
		fill(0,0,255);
		rect(this.x,this.y,this.l,this.h);
		fill(255);
		text(this.t,this.x+this.l/2-offset,this.y+this.h/2-15,500);
	}
	display(){
		textSize(20);
		offset = 15;//offset in x direction
		if (this.t !== int){
			textSize(35);
		}
		if (this.a==='C'||this.a==='ans'){
			offset = 40;//prevents text clipping behind buttons
		}
		fill(255);
		rect(this.x,this.y,this.l,this.h);
		fill(12,25,156);
		//x+l/2 or y+h/2 returns center coords of the box.
		text(this.t,this.x+this.l/2-offset,this.y+this.h/2-15,500);
	}
	clicked(){
		if (this.a === 'ans'){//Ans requires manipulation, cant just write a 'Ans' string.
			ansTransfer = [...Ans+''].map(n=>+n);
			//line above creates an array from each digit from INT Ans
			//this then gets mapped to magically work
			//SOURCE: https://stackoverflow.com/questions/7784620/javascript-number-split-into-individual-digits
			actions = [];//reset input because its neccessary
			actions = actions.concat(ansTransfer);//put Ans into actions to be used.
		}else if(this.a === 'C'){//Clears array, used for clicking mistakes
			actions = [];
	  }else{//for everything non-special
		actions.push(this.a);
		}
	}
}
//functions ----------------
function display_all(){
	for (let i=0;i<buttons.length;i++){
    buttons[i].display();
		//displays all the buttons. Nothing special.
  }
}
function centerCanvas() {
  x = (windowWidth-width)/2;
  y = (windowHeight-height)/2;
  canvas.position(x,y);
  //function more complex than just createCanvas(), 
  //better for use in HTML code
}
function factorial(n) {
  return (n!= 1)?n *factorial(n - 1):1;//recursive, from https://javascript.info/task/factorial
	//return n*factorial(n-1), as long as n is not 1 (otherwise end of function).
}
function answers(){//makes answers appear a few times after calculation
	Line0 = Ans.toString();
	text(Line0, 470-Line0.length*10.9,250); 
	text(Line4, 470-Line4.length*10.9,50); 
	Line4 = Line3;
	text(Line3, 470-Line3.length*10.9,100); 
	Line3 = Line2;
	text(Line2, 470-Line2.length*10.9,150); 
	Line2 = Line1;
	text(Line1, 470-Line1.length*10.9,200); 
	Line1 = Ans.toString();
}
function screen(){
	//most important function. Both actually displays the calculation
	//and checks what operators are used so the answer can be calculated.
	rect(20,20,480,280);//blue screen
	fill(255);
	textSize(20);
	print(actions);
	if (actions.includes('=')===false){//returns true while you are doing the calculation
		if (actions.length<42){//if the calculation is able to fit in the screen
			if (actions.includes(null) === true){//checks for null values from floats
				//We should check for this because our current system does not accept a dot (.)
				//as an int and so returns it as NaN. Biggest limitation of the system.
				print('banana');//never comes here as Number.isNan should be used as condition
				//This is really hard, as you would have to filter the operators like +,-,= first, as they
				//also return true (progamm thinks they are the NaN we care about).
				text(actions.join(""),475-actions.length*10.9-100,250);
			}else{
				print('apple');//what usually happens
				text(actions.join(""),475-actions.length*10.9,250);
			}	
		}else{//if calc too long, only display last 42 digits
			text(actions.slice(actions.length-42,actions.length+1).join(""),25,250);
			print((actions.slice(actions.length-42,actions.length+1).join("")));
		}
	}
	//The following else ifs return true when the '=' key has been clicked
	//If operator is present:
	//  a = the stuff before the operator
	//  b = the stuff after the operator
	//  text() shows the answer on screen
	//  Ans is stored in var for later use
	//  actions{array} is cleared for re-use
	else if(actions.includes('^')===true){
			a = parseInt(actions.slice(0,actions.indexOf('^')).join(''),10)
			b = parseInt(actions.slice(actions.indexOf('^')+1,actions.length-1).join(''),10)
			Ans = Math.pow(a,b);
			answers();
			actions = [];
	}
	else if(actions.includes('!')===true){
			a = parseInt(actions.slice(0,actions.indexOf('!')).join(''),10)
			b = parseInt(actions.slice(actions.indexOf('!')+1,actions.length-1).join(''),10)
			if (a>20){
				text('A large number',100,100);
				Ans = 'A large number';
				answers();
			}else{//cant take large values
		  	Ans = factorial(a);
				answers();
			}	
			actions = [];
	}
	else if(actions.includes('÷')===true){
			a = parseFloat(actions.slice(0,actions.indexOf('÷')).join(''),10)
			b = parseFloat(actions.slice(actions.indexOf('÷')+1,actions.length-1).join(''),10)
		  if (a/b === Infinity){
				answers();
			}else{//dont divide by zero!
				Ans = a/b;
				answers();
			}	
			actions = [];
	}
	else if(actions.includes('x')===true){
			a = parseInt(actions.slice(0,actions.indexOf('x')).join(''),10)
			b = parseInt(actions.slice(actions.indexOf('x')+1,actions.length-1).join(''),10)
			Ans = a*b;
			answers();
			actions = [];
	}
	else if(actions.includes('-')===true){
			a = parseFloat(actions.slice(0,actions.indexOf('-')).join(''),10)
			b = parseFloat(actions.slice(actions.indexOf('-')+1,actions.length-1).join(''),10)
			Ans = a-b;
			answers();
			actions = [];
	}
	else if(actions.includes('+')===true){
			a = parseInt(actions.slice(0,actions.indexOf('+')).join(''),10)
			b = parseInt(actions.slice(actions.indexOf('+')+1,actions.length-1).join(''),10)
			Ans = a+b;
			answers();
		  actions = [];
	}
}
//setup & draw ----------------
function setup(){
	//intialisation
	screen();
	textSize(50);
	background(50);
	canvas = createCanvas(500,820);
  centerCanvas();//center canvas on page
	//blue screen and details
	fill(12,25,156);
	rect(20,20,480,280);
	fill(67,60,70);
	rect(20,300,500,520);
	for (i=0;i<41;i++){
		//cool side details
		line(20,300+i*13,500,820-i*13);
	}	
	fill(255);
	//number buttons
	buttons.push(new Button('0',35,700,100,100,0));
	buttons.push(new Button('1',35,600,100,100,1));
	buttons.push(new Button('2',135,600,100,100,2));
	buttons.push(new Button('3',235,600,100,100,3));
	buttons.push(new Button('4',35,500,100,100,4));
	buttons.push(new Button('5',135,500,100,100,5));
	buttons.push(new Button('6',235,500,100,100,6));
	buttons.push(new Button('7',35,400,100,100,7));
	buttons.push(new Button('8',135,400,100,100,8));
	buttons.push(new Button('9',235,400,100,100,9));
	//operator buttons
	buttons.push(new Button('!',35,300,150,100,'a!'));
	buttons.push(new Button('^',185,300,150,100,'a^b'));
	buttons.push(new Button('÷',335,300,150,100,'÷'));
	buttons.push(new Button('x',335,400,150,100,'x'));
	buttons.push(new Button('-',335,500,150,100,'-'));
	buttons.push(new Button('+',335,600,150,100,'+'));
	buttons.push(new Button('=',335,700,150,100,'='));
	buttons.push(new Button('C',135,700,100,100,'Clear'));
	buttons.push(new Button('ans',235,700,100,100,'Ans'));
}
function draw(){
	display_all();
	for (i=0;i<buttons.length;i++){//for all buttons
		if((mouseX>buttons[i].x)&& (mouseX<buttons[i].x+buttons[i].l) &&
			 (mouseY>buttons[i].y) && (mouseY<buttons[i].y+buttons[i].h)){
			 display_all();//if statement above checks if mouse(X,Y) is within button
			 buttons[i].hovered();
		}
	}
}
function mouseClicked(){//called when mouse clicked
	for (i=0;i<buttons.length;i++){//for all buttons
		if((mouseX>buttons[i].x)&& (mouseX<buttons[i].x+buttons[i].l) &&
			 (mouseY>buttons[i].y) && (mouseY<buttons[i].y+buttons[i].h)){
			 display_all();//if statement above checks if mouse(X,Y) is within button
			 buttons[i].clicked();
			 screen();
		}
	}
}
function windowResized() {
  centerCanvas();//if browser window is resized
}









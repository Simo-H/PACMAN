/**
 * Created by Simo on 24/04/2017.
 */
$( document ).ready(function() {
    pageLoaded();
    Math.floor((Math.random() * 18));
    buildBoard();
    buildynamicBoardPacman();
    buildFoodBoard(PiecesOfFood);
    buildGhostBoards(numberOfGhosts);
    buildLifeBord();
    buildBonusBord();
    start_time= new Date();

    Draw();
    DrawDynamicBoard();
    DrawFoodBoard();
    DrawGhostBoards();
    DrowBonus();
    DrawLifeBord();

    main();
});
//Game vars
var score=0;
var time_elapsed;
var start_time;
var numberOfGhosts=3;
var PiecesOfFood=50;
var PiecesOfFoodLeft=50;
var LOGICstaticBoard;
var LOGICpacmanBoard;
var LOGICpointsBoard;
var LOGICghost1Board;
var LOGICghost2Board;
var LOGICghost3Board;
var lifeBord;
var LOGICmovingBonusBoard
var ghost1;
var ghost2;
var ghost3;
var PacmanPlayer;
var MrBonus;
var didntChange="true";



function canvasToMatrix(x,y)
{
    var canvas = document.getElementById("mCanvas");
    var ctx = canvas.getContext("2d");
    return {widthOfCell: Math.floor(canvas.width/13),heightOfCell: Math.floor(canvas.height/18)    }
}

function main()
{
    //do stuff

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
   /* newPlaceBonus();*/
    setInterval(function(){UpdateCanvases();}, 400);
    setInterval(function(){pacmanupdate();}, 400);
    setInterval(function(){chackBonus();}, 20);



}

function chackBonus() {
    if(PacmanPlayer.x==MrBonus.x&&PacmanPlayer.y==MrBonus.y)
    {
        PacmanPlayer.getBonus="true";
        LOGICmovingBonusBoard[MrBonus.x][MrBonus.y]=0

    }
    if(PacmanPlayer.hart==0){
        loseMessage();


    }

}

function pacmanupdate() {
    var keyPress = GetKeyPressed();
    switch (keyPress) {
        case 1:
            PacmanPlayer.move("up");
            keysDown = {};
            break;
        case 2:
            PacmanPlayer.move("down");
            keysDown = {};
            break;
        case 3:
            PacmanPlayer.move("left");
            keysDown = {};
            break;
        case 4:
            PacmanPlayer.move("right");
            keysDown = {};
            break;
    }
    DrawDynamicBoard();
    DrawFoodBoard();


    if(PacmanPlayer.getBonus=="true" && didntChange=="true")
    {
        didntChange="false";
        score+=50;

    }
    lblScore.value = score;

}

function UpdateCanvases()
{


    if(ghost1!=null){    ghost1.moveNextStep();}
    if(ghost2!=null){    ghost2.moveNextStep();}
    if(ghost3!=null){    ghost3.moveNextStep();}
    if(MrBonus!=null){    MrBonus.moveNextStep();}

    DrawGhostBoards();
    DrowBonus();
    ChackLife();
    DrawLifeBord();

}


function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) {
        return 2;
    }
    if (keysDown[37]) {
        return 3;
    }
    if (keysDown[39]) {
        return 4;
    }
}

function ghost(num,x,y)
    {

        this.x = x;
        this.y = y;
        this.code = num;
        this.dir;
        this.laststep;

        this.moveNextStep= function()
        {
            var left=18;
            var right=18;
            var up=18;
            var down=18;
            var x;
            var y;
            var bool = false;
            while (!bool) {
                x = Math.floor((Math.random() * 17));
                y=Math.floor((Math.random() * 13));
                if (LOGICstaticBoard[x][y] != 1 && LOGICpacmanBoard[x][y] == 0) {
                    bool = true
                }
            }

            if(checkIfMoveIsValid(this.x,this.y-1 )&& (this.dir!="down")){
                 up=Math.sqrt(Math.pow( (this.x - (PacmanPlayer.x )) ,2)+Math.pow( (this.y-1) -PacmanPlayer.y,2));
            }
            //down
            if(checkIfMoveIsValid(this.x,this.y+1)&& (this.dir!="up")){
                down=Math.sqrt(Math.pow( (this.x - (PacmanPlayer.x )) ,2)+Math.pow( (this.y+1) -PacmanPlayer.y,2));
            }
            //right
            if(checkIfMoveIsValid(this.x+1,this.y)&& (this.dir!="left")){
                 right=Math.sqrt((Math.pow( (this.x +1)- (PacmanPlayer.x )) ,2)+Math.pow( (this.y) -PacmanPlayer.y,2));
            }
            //left
            if(checkIfMoveIsValid(this.x-1,this.y)&&(this.dir !="right")){
                 left=Math.sqrt((Math.pow( (this.x +1)- (PacmanPlayer.x )) ,2)+Math.pow( (this.y) -PacmanPlayer.y,2));

            }
            var minDist = Math.min(left, right, up, down);

            switch(minDist){
                //left
                case left:
                    this.dir = "left";
                    bool = true;
                    break;
                //right
                case right:
                    this.dir = "right";
                    break;
                //up
                case up:
                    this.dir = "up";
                    break;
                //dwon
                case down:
                    this.dir = "down";
                    break;
            }
            moveCharacter(this.dir,this);

        }


      /*  this.moveNextStep1= function(x,y)
        {
            if( LOGICpacmanBoard[x][y]==3 ){
                return firstStep;
            }

            if(checkIfMoveIsValid(this.x,this.y-1&& LOGICpacmanBoard[x][y-1]!=3 )){
                this.moveNextStep2(this.x,this.y-1,"up");
            }
            //down
            if(checkIfMoveIsValid(this.x,this.y+1)&&  LOGICpacmanBoard[x][y+1]!=3){
               this.moveNextStep2(this.x,this.y+1,"down");

            }
            //right
            if(checkIfMoveIsValid(this.x+1,this.y)&&  LOGICpacmanBoard[x+1][y]!=3){
               this. moveNextStep(this.x+1,this.y,"right");

            }
            if(checkIfMoveIsValid(this.x-1,this.y)&&  LOGICpacmanBoard[x-1][y]!=3){
                this.moveNextStep2(this.x-1,this.y,"left");

            }

        }*/


       /* this.moveNextStep2= function(x,y,first)
        {
            if( LOGICpacmanBoard[x][y]==3 ){
                moveCharacter(this.dir,first);
                return;
            }

            if(checkIfMoveIsValid(this.x,this.y-1&& LOGICpacmanBoard[x][y-1]!=3 )){
               this. moveNextStep2(this.x,this.y-1,"up");
            }
            //down
            if(checkIfMoveIsValid(this.x,this.y+1)&&  LOGICpacmanBoard[x][y+1]!=3){
                this.moveNextStep2(this.x,this.y+1,"down");

            }
            //right
            if(checkIfMoveIsValid(this.x+1,this.y)&&  LOGICpacmanBoard[x+1][y]!=3){
                this.moveNextStep2(this.x+1,this.y,"right");

            }
            if(checkIfMoveIsValid(this.x-1,this.y)&&  LOGICpacmanBoard[x-1][y]!=3){
                this.moveNextStep2(this.x-1,this.y,"left");

            }

        }*/

    }

function bonus(num,x,y) {
    this.x = x;
    this.y = y;
    this.code = num;
    this.dir;
    this.laststep;

    this.moveNextStep = function () {
        var x;
        var y;
        var bool = false;
        while (!bool) {
            var size = Math.floor((Math.random() * 4));


            if (checkIfMoveIsValid(this.x, this.y - 1) && (size == "0")) {
                bool = true;
                moveCharacter("up", this);
            }
            //down
            if (checkIfMoveIsValid(this.x, this.y + 1) && (size == "1")) {
                bool = true;
                moveCharacter("down", this);
            }
            //right
            if (checkIfMoveIsValid(this.x + 1, this.y) && (size == "2")) {
                bool = true;
                moveCharacter("right", this);
            }
            //left
            if (checkIfMoveIsValid(this.x - 1, this.y) && (size == "3")) {
                bool = true;
                moveCharacter("left", this);

            }
        }

    }
}

function pacman(x,y)
{
    this.hart="3";
    this.getBonus="false";
    this.x = x;
    this.y = y;
    this.code = 2;
    this.lastDirection = "left";
    this.mouth="open";
    this.move = function (direction) {
        this.lastDirection = direction;

        moveCharacter(direction,this);
    }

    this.eat = function ()
    {
        var ball = LOGICpointsBoard[this.x][this.y];

        lblScore.value = score;
        switch (ball)
        {
            case 6:
            {
                score+=5;
                PiecesOfFoodLeft--;
                break;
            }
            case 7:
            {
                score+=15;
                PiecesOfFoodLeft--;
                break;
            }
            case 8:
            {
                score+=25;
                PiecesOfFoodLeft--;
                break;
            }

        }


        LOGICpointsBoard[this.x][this.y] = 0;
        DrawFoodBoard();

    }
}

function moveCharacter(direction,character)
{
    switch (direction)
    {
        case "up":
        {
            if(checkIfMoveIsValid(character.x,character.y-1))
            {

                if(character.code == 2)
                {
                    LOGICpacmanBoard[character.x][character.y] = 0;
                    character.y = character.y-1;
                    LOGICpacmanBoard[character.x][character.y] = character.code;
                }
                if(character.code == 2 && LOGICstaticBoard[character.x,character.y]!=0)
                {
                    character.eat();
                }

                if(character.code == 3)
                {
                    LOGICghost1Board[character.x][character.y] = 0;
                    character.y = character.y-1;
                    LOGICghost1Board[character.x][character.y] = character.code;
                }
                if(character.code == 4)
                {
                    LOGICghost2Board[character.x][character.y] = 0;
                    character.y = character.y-1;
                    LOGICghost2Board[character.x][character.y] = character.code;
                }
                if(character.code == 5)
                {
                    LOGICghost3Board[character.x][character.y] = 0;
                    character.y = character.y-1;
                    LOGICghost3Board[character.x][character.y] = character.code;
                }
                if(character.code == 9)
                {
                    LOGICmovingBonusBoard[character.x][character.y] = 0;
                    character.y = character.y-1;
                    LOGICmovingBonusBoard[character.x][character.y] = 1;
                }


            }
            break;
        }
        case "down":
        {
            if(checkIfMoveIsValid(character.x,character.y+1))
            {
                if(character.code == 2){
                LOGICpacmanBoard[character.x][character.y] = 0;
                character.y = character.y+1;
                LOGICpacmanBoard[character.x][character.y] = character.code;
                }
                if(character.code == 2 && LOGICstaticBoard[character.x,character.y]!=0)
                {
                    character.eat();
                }
                if(character.code == 3){
                    LOGICghost1Board[character.x][character.y] = 0;
                    character.y = character.y+1;
                    LOGICghost1Board[character.x][character.y] = character.code;
                }
                if(character.code == 4){
                    LOGICghost2Board[character.x][character.y] = 0;
                    character.y = character.y+1;
                    LOGICghost2Board[character.x][character.y] = character.code;
                }
                if(character.code == 5){
                    LOGICghost3Board[character.x][character.y] = 0;
                    character.y = character.y+1;
                    LOGICghost3Board[character.x][character.y] = character.code;
                }
                if(character.code == 9)
                {
                    LOGICmovingBonusBoard[character.x][character.y] = 0;
                    character.y = character.y+1;
                    LOGICmovingBonusBoard[character.x][character.y] = 1;
                }

            }

            break;
        }
        case "left":
        {
            if(checkIfMoveIsValid(character.x-1,character.y))
            {
                if(character.code == 2){
                LOGICpacmanBoard[character.x][character.y] = 0;
                character.x = character.x-1;
                LOGICpacmanBoard[character.x][character.y] = character.code;}

                if(character.code == 2 && LOGICstaticBoard[character.x,character.y]!=0)
                {
                    character.eat();
                }
                if(character.code == 3){
                    LOGICghost1Board[character.x][character.y] = 0;
                    character.x = character.x-1;
                    LOGICghost1Board[character.x][character.y] = character.code;}
                if(character.code == 4){
                    LOGICghost2Board[character.x][character.y] = 0;
                    character.x = character.x-1;
                    LOGICghost2Board[character.x][character.y] = character.code;}
                if(character.code == 5){
                    LOGICghost3Board[character.x][character.y] = 0;
                    character.x = character.x-1;
                    LOGICghost3Board[character.x][character.y] = character.code;}
                if(character.code == 9)
                {
                    LOGICmovingBonusBoard[character.x][character.y] = 0;
                    character.x = character.x-1;
                    LOGICmovingBonusBoard[character.x][character.y] = 1;
                }
            }
            break;
        }
        case "right":
        {
            if(checkIfMoveIsValid(character.x+1,character.y))
            {
                if(character.code == 2){
                LOGICpacmanBoard[character.x][character.y] = 0;
                character.x = character.x+1;
                LOGICpacmanBoard[character.x][character.y] = character.code;}
                if(character.code == 2 && LOGICstaticBoard[character.x,character.y]!=0)
                {
                    character.eat();
                }
                if(character.code == 3){
                    LOGICghost1Board[character.x][character.y] = 0;
                    character.x = character.x+1;
                    LOGICghost1Board[character.x][character.y] = character.code;}
                if(character.code == 4){
                    LOGICghost2Board[character.x][character.y] = 0;
                    character.x = character.x+1;
                    LOGICghost2Board[character.x][character.y] = character.code;}
                if(character.code == 5){
                    LOGICghost3Board[character.x][character.y] = 0;
                    character.x = character.x+1;
                    LOGICghost3Board[character.x][character.y] = character.code;}
                if(character.code == 9)
                {
                    LOGICmovingBonusBoard[character.x][character.y] = 0;
                    character.x = character.x+1;
                    LOGICmovingBonusBoard[character.x][character.y] = 1;
                }
            }
            break;
        }
    }
}


function checkIfMoveIsValid(x,y)
{
    if(LOGICstaticBoard[x][y] == 1 || x<0 || x>17 || y<0 || y>12)
    {
        return false;
    }
    return true;
}

function buildynamicBoardPacman(numberOfMonsters) {
    LOGICpacmanBoard = new Array();
    for (var i = 0; i < 18; i++) {
        LOGICpacmanBoard[i] = new Array();
        for (var j = 0; j < 13; j++) {
            LOGICpacmanBoard[i][j] = 0;
        }
    }
    var x;
    var y;
    var bool = false;
    while (!bool) {
        x = Math.floor((Math.random() * 17));
        y = Math.floor((Math.random() * 12));
        if (LOGICstaticBoard[x][y] != 1 && LOGICpacmanBoard[x][y] == 0) {
            bool = true
        }
    }
    PacmanPlayer=new pacman(x,y);
    LOGICpacmanBoard[x][y] = 2;
}

function buildGhostBoards(numberOfMonsters) {
    LOGICghost1Board = new Array();
    for (var i = 0; i < 18; i++) {
        LOGICghost1Board[i] = new Array();
        for (var j = 0; j < 13; j++) {
            LOGICghost1Board[i][j] = 0;
        }
    }
    LOGICghost2Board = new Array();
    for (var i = 0; i < 18; i++) {
        LOGICghost2Board[i] = new Array();
        for (var j = 0; j < 13; j++) {
            LOGICghost2Board[i][j] = 0;
        }
    }
    LOGICghost3Board = new Array();
    for (var i = 0; i < 18; i++) {
        LOGICghost3Board[i] = new Array();
        for (var j = 0; j < 13; j++) {
            LOGICghost3Board[i][j] = 0;
        }
    }

    if (numberOfMonsters>=1)
    {
        ghost1=new ghost(3,1,1);
        LOGICghost1Board[1][1]=3;
    }
    if (numberOfMonsters>=2)
    {
        ghost2=new ghost(4,16,11);
        LOGICghost2Board[16][11]=4;
    }
    if (numberOfMonsters>=3)
    {
        ghost3=new ghost(5,16,1);
        LOGICghost3Board[16][1]=5;
    }



}

function buildBoard() {
    LOGICstaticBoard = new Array();
    for (var i = 0; i < 18; i++) {
        LOGICstaticBoard[i] = new Array();
        for (var j = 0; j < 13; j++) {
            LOGICstaticBoard[i][j] = 0;
        }
    }
    for (var j = 0; j < 13; j++) {
        LOGICstaticBoard[0][j] = 1;
    }
    for (var j = 0; j < 13; j++) {
        LOGICstaticBoard[17][j] = 1;
    }

    for (var j = 0; j < 18; j++) {
        LOGICstaticBoard[j][0] = 1;
    }
    for (var j = 0; j < 18; j++) {
        LOGICstaticBoard[j][12] = 1;
    }
    LOGICstaticBoard[2][2] = 1;
    LOGICstaticBoard[2][3] = 1;
    LOGICstaticBoard[3][3] = 1;
    LOGICstaticBoard[3][4] = 1;
    LOGICstaticBoard[3][5] = 1;
    LOGICstaticBoard[4][5] = 1;
    LOGICstaticBoard[4][1] = 1;
    LOGICstaticBoard[1][5] = 0;
    LOGICstaticBoard[1][7] = 0;
    LOGICstaticBoard[2][10] = 1;
    LOGICstaticBoard[3][7] = 1;
    LOGICstaticBoard[3][8] = 1;
    LOGICstaticBoard[4][7] = 1;
    LOGICstaticBoard[4][8] = 1;
    LOGICstaticBoard[4][9] = 1;
    LOGICstaticBoard[4][11] = 1;
    LOGICstaticBoard[5][11] = 1;
    LOGICstaticBoard[5][8] = 1;
    LOGICstaticBoard[5][9] = 1;
    LOGICstaticBoard[6][8] = 1;
    LOGICstaticBoard[7][8] = 1;
    LOGICstaticBoard[5][3] = 1;
    LOGICstaticBoard[6][2] = 1;
    LOGICstaticBoard[5][9] = 1;
    LOGICstaticBoard[6][8] = 1;
    LOGICstaticBoard[7][8] = 1;
    LOGICstaticBoard[6][5] = 1;
    LOGICstaticBoard[6][6] = 1;
    LOGICstaticBoard[7][6] = 1;
    LOGICstaticBoard[8][6] = 1;
    LOGICstaticBoard[9][6] = 1;
    LOGICstaticBoard[10][6] = 1;
    LOGICstaticBoard[11][6] = 1;
    LOGICstaticBoard[11][5] = 1;
    LOGICstaticBoard[10][8] = 1;
    LOGICstaticBoard[11][8] = 1;
    LOGICstaticBoard[12][8] = 1;
    LOGICstaticBoard[13][8] = 1;
    LOGICstaticBoard[14][8] = 1;
    LOGICstaticBoard[12][9] = 1;
    LOGICstaticBoard[13][9] = 1;
    LOGICstaticBoard[13][7] = 1;
    LOGICstaticBoard[14][7] = 1;
    LOGICstaticBoard[7][4] = 0;
    LOGICstaticBoard[10][4] = 0;
    LOGICstaticBoard[10][2] = 1;
    LOGICstaticBoard[11][2] = 1;
    LOGICstaticBoard[12][3] = 1;
    LOGICstaticBoard[13][1] = 1;
    LOGICstaticBoard[7][2] = 1;
    LOGICstaticBoard[15][2] = 1;
    LOGICstaticBoard[15][3] = 1;
    LOGICstaticBoard[14][3] = 1;
    LOGICstaticBoard[14][4] = 1;
    LOGICstaticBoard[14][5] = 1;
    LOGICstaticBoard[13][5] = 1;
    LOGICstaticBoard[7][10] = 1;
    LOGICstaticBoard[8][10] = 1;
    LOGICstaticBoard[9][10] = 1;
    LOGICstaticBoard[10][10] = 1;
    LOGICstaticBoard[16][5] = 0;
    LOGICstaticBoard[16][7] = 0;
    LOGICstaticBoard[15][10] = 1;
    LOGICstaticBoard[12][11] = 1;
    LOGICstaticBoard[13][11] = 1;
}

function buildFoodBoard(PiecesOfFood) {
    LOGICpointsBoard = new Array();
    for (var i = 0; i < 18; i++) {
        LOGICpointsBoard[i] = new Array();
        for (var j = 0; j < 13; j++) {
            LOGICpointsBoard[i][j] = 0;
        }
    }
    fillPointsBalls(PiecesOfFood);

}


function Draw() {

    var canvas = document.getElementById("mCanvas");
    var ctx = canvas.getContext("2d");
    var center = new Object();
    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 13 ;j++) {
            ctx.x = i * 30 ;
            ctx.y = j *30;

            if (LOGICstaticBoard[i][j] == 0) {

                ctx.beginPath();
                ctx.rect(ctx.x,ctx.y,30,30,0);
                ctx.fillStyle = "blue";
                ctx.fill();

            }
            else if (LOGICstaticBoard[i][j] == 1) {
                ctx.beginPath();
                ctx.rect(ctx.x,ctx.y,30,30,0);
                ctx.fillStyle = "red";
                ctx.fill();
            }
        }
    }
}

function DrawDynamicBoard() {

    var canvas = document.getElementById("m2Canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var center = new Object();
    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 13 ;j++) {
            ctx.x = i * 30+15 ;
            ctx.y = j *30+15;

            if (LOGICpacmanBoard[i][j] == 2) {
                if(PacmanPlayer.lastDirection=="right")
                {
                    if(PacmanPlayer.mouth=="open") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15,0.25 * Math.PI, 1.75 * Math.PI, false); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x, ctx.y-6 ,3,0,2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x, ctx.y-6 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();

                        PacmanPlayer.mouth="close";
                    }
                    else if(PacmanPlayer.mouth=="close") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15,0.10 * Math.PI, 1.90 * Math.PI, false); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x, ctx.y-6 ,3,0,2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x, ctx.y-6 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        PacmanPlayer.mouth="open";
                    }

                }
                else if(PacmanPlayer.lastDirection=="left")
                {
                    if(PacmanPlayer.mouth=="open") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15,0.75 * Math.PI, 1.25 * Math.PI, true); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x, ctx.y-6 ,3,0,2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x, ctx.y-6 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        PacmanPlayer.mouth="close";
                    }
                    else if(PacmanPlayer.mouth=="close") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15,0.90 * Math.PI, 1.10 * Math.PI, true); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x, ctx.y-6 ,3,0,2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x, ctx.y-6 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        PacmanPlayer.mouth="open";}
                }
                else if(PacmanPlayer.lastDirection=="up")
                {
                    if(PacmanPlayer.mouth=="open") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15,1.25 * Math.PI, 1.75 * Math.PI, true); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x-6, ctx.y+3 ,3,0,2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x-6, ctx.y+3 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        PacmanPlayer.mouth="close";
                    }
                    else if(PacmanPlayer.mouth=="close") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15,1.4 * Math.PI, 1.6 * Math.PI, true); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x-6, ctx.y+3 ,3,0,2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x-6, ctx.y+3 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        PacmanPlayer.mouth="open";}
                }
                else if(PacmanPlayer.lastDirection=="down")
                {
                    if(PacmanPlayer.mouth=="open") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15,0.25 * Math.PI, 0.75 * Math.PI, true); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x-6, ctx.y+1 ,3,0,2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x-6, ctx.y+1 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        PacmanPlayer.mouth="close";
                    }
                    else if(PacmanPlayer.mouth=="close") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15, 0.4 * Math.PI, 0.6 * Math.PI, true); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x - 6, ctx.y + 1, 3, 0, 2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x - 6, ctx.y + 1, 1.5, 0, 1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        PacmanPlayer.mouth = "open";
                    }
                }

            }



        }
    }
    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/1000;
    lblTime.value=time_elapsed;
}
function fillPointsBalls(numberOfPointsBalls) {
    var ball5points = 0.6*numberOfPointsBalls;
    var ball15points = 0.3*numberOfPointsBalls;
    var bal25points = 0.1*numberOfPointsBalls;
    var counter = numberOfPointsBalls;
    while(counter >0) {
        for (var i = 0; i < 13; i++) {
            for (var j = 0; j < 18; j++)
            {
                if(Math.random() > 0.5)
                {
                    if(ball5points > 0 && LOGICpacmanBoard[j][i]!=2 && LOGICstaticBoard[j][i]==0)
                    {
                        LOGICpointsBoard[j][i] = 6;
                        ball5points--;
                        counter--;
                    }
                    else if(ball15points > 0 && LOGICpacmanBoard[j][i]!=2 && LOGICstaticBoard[j][i]==0)
                    {
                        LOGICpointsBoard[j][i] = 7;
                        ball15points--;
                        counter--;
                    }
                    else if ( bal25points > 0 &&LOGICpacmanBoard[j][i]!=2 && LOGICstaticBoard[j][i]==0)
                    {
                        LOGICpointsBoard[j][i] = 8;
                        bal25points--;
                        counter--;
                    }
                }
            }
        }
    }
}

//Layout functions
function pageLoaded ()
{
    ShowSection('Welcome');
}

function ShowSection(id)
{
    //hide all
    var Welcome = document.getElementById('Welcome');
    Welcome.style.visibility="hidden";
    var Register = document.getElementById('Register');
    Register.style.visibility="hidden";
    var Login = document.getElementById('Login');
    Login.style.visibility="hidden";
    var About = document.getElementById('About');
    About.style.visibility="hidden";

    //Show selected
    var selected = document.getElementById(id);
    selected.style.visibility= "visible";
}

function DrawFoodBoard() {


    var canvas = document.getElementById("food");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var center = new Object();
    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 13; j++) {
            ctx.x = i * 30 + 15;
            ctx.y = j * 30 + 15;


            if (LOGICpointsBoard[i][j] == 6) {
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(ctx.x, ctx.y, 7, 0, 2 * Math.PI); // half circle
                ctx.lineTo(ctx.x, ctx.y);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.font = "15px Garamond"+"bold";

                ctx.fillText("5",ctx.x-4,ctx.y+5,30);
                ctx.fill();
                ctx.closePath();
            }
            if (LOGICpointsBoard[i][j] == 7) {
                ctx.fillStyle = "#ff9933";
                ctx.beginPath();
                ctx.arc(ctx.x, ctx.y, 8, 0, 2 * Math.PI); // half circle
                ctx.lineTo(ctx.x, ctx.y);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.font = "10px Garamond"+"bold";

                ctx.fillText("15",ctx.x-5,ctx.y+4,30);
                ctx.fill();
                ctx.closePath();
            }
            if (LOGICpointsBoard[i][j] == 8) {
                ctx.fillStyle = "#00ffff";
                ctx.beginPath();
                ctx.arc(ctx.x, ctx.y, 9, 0, 2 * Math.PI); // half circle
                ctx.lineTo(ctx.x, ctx.y);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.font = "10px Garamond"+"bold";

                ctx.fillText("25",ctx.x-5,ctx.y+4,30);
                ctx.fill();
                ctx.closePath();
            }

        }
    }
}

function DrawGhostBoards() {



    var canvas1 = document.getElementById("ghost1");
    var ctx1 = canvas1.getContext("2d");
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    var center1 = new Object();
    var canvas2 = document.getElementById("ghost2");
    var ctx2 = canvas2.getContext("2d")
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    var center2 = new Object();
    var canvas3 = document.getElementById("ghost3");
    var ctx3 = canvas3.getContext("2d");
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    var center3 = new Object();
    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 13; j++) {
            ctx1.x = (i * 30)+15;
            ctx1.y = (j * 30)+15;
            ctx2.x = (i * 30)+15;
            ctx2.y = (j * 30)+15;
            ctx3.x = (i * 30)+15;
            ctx3.y = (j * 30)+15;
            if (LOGICghost1Board[i][j] == 3) {

                ctx1.arc(ctx1.x, ctx1.y ,15,0, Math.PI,true); // circle
                ctx1.fillStyle = "green"; //color
                ctx1.fill();
                ctx1.beginPath();

                ctx1.arc(ctx1.x+5, ctx1.y+5 ,4,0,2 * Math.PI); // circle
                ctx1.fillStyle = "white"; //color
                ctx1.fill();
                ctx1.beginPath();
                ctx1.arc(ctx1.x-4, ctx1.y+5 ,4,0,2 * Math.PI); // circle
                ctx1.fillStyle = "white"; //color
                ctx1.fill();
                ctx1.beginPath();
                ctx1.arc(ctx1.x+5, ctx1.y+5 ,2,0,2 * Math.PI); // circle
                ctx1.fillStyle = "black"; //color
                ctx1.fill();
                ctx1.beginPath();
                ctx1.arc(ctx1.x-4, ctx1.y+5 ,2,0,2 * Math.PI); // circle
                ctx1.fillStyle = "black"; //color
                ctx1.fill();
                ctx1.beginPath();

            }
            if (LOGICghost2Board[i][j] == 4) {
                ctx2.arc(ctx2.x, ctx2.y ,15,0, Math.PI,true); // circle
                ctx2.fillStyle = "green"; //color
                ctx2.fill();
                ctx2.beginPath();

                ctx2.arc(ctx2.x+5, ctx2.y+5 ,4,0,2 * Math.PI); // circle
                ctx2.fillStyle = "white"; //color
                ctx2.fill();
                ctx2.beginPath();
                ctx2.arc(ctx2.x-4, ctx2.y+5 ,4,0,2 * Math.PI); // circle
                ctx2.fillStyle = "white"; //color
                ctx2.fill();
                ctx2.beginPath();
                ctx2.arc(ctx2.x+5, ctx2.y+5 ,2,0,2 * Math.PI); // circle
                ctx2.fillStyle = "black"; //color
                ctx2.fill();
                ctx2.beginPath();
                ctx2.arc(ctx2.x-4, ctx2.y+5 ,2,0,2 * Math.PI); // circle
                ctx2.fillStyle = "black"; //color
                ctx2.fill();
                ctx2.beginPath();
            }
            if (LOGICghost3Board[i][j] == 5) {
                ctx3.arc(ctx3.x, ctx3.y ,15,0, Math.PI,true); // circle
                ctx3.fillStyle = "green"; //color
                ctx3.fill();
                ctx3.beginPath();

                ctx3.arc(ctx3.x+5, ctx3.y+5 ,4,0,2 * Math.PI); // circle
                ctx3.fillStyle = "white"; //color
                ctx3.fill();
                ctx3.beginPath();
                ctx3.arc(ctx3.x-4, ctx3.y+5 ,4,0,2 * Math.PI); // circle
                ctx3.fillStyle = "white"; //color
                ctx3.fill();
                ctx3.beginPath();
                ctx3.arc(ctx3.x+5, ctx3.y+5 ,2,0,2 * Math.PI); // circle
                ctx3.fillStyle = "black"; //color
                ctx3.fill();
                ctx3.beginPath();
                ctx3.arc(ctx3.x-4, ctx3.y+5 ,2,0,2 * Math.PI); // circle
                ctx3.fillStyle = "black"; //color
                ctx3.fill();
                ctx3.beginPath();
            }
        }
    }
}

function buildLifeBord() {
    lifeBord= new Array();
    lifeBord[0]= 1;
    lifeBord[1]= 1;
    lifeBord[2]= 1;
}

 function DrawLifeBord() {
     //var ctx = document.querySelector("canvas").getContext("2d");
     var image = new Image();

     var canvas = document.getElementById("life");
     var ctx = canvas.getContext("2d");
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     var img = new Image();
     img.src = "hart.png";


     for (var i=0;i<3;i++)
    {
        if(lifeBord[i]==1)
        {
            // ctx.fillStyle = "#66ff66";
            // ctx.beginPath();
            // ctx.arc(540+30, i*60+30, 30, 0, 2 * Math.PI); // half circle
            // ctx.lineTo(ctx.x, ctx.y);
            // ctx.closePath();
            // ctx.fill();
            ctx.drawImage(img,540+15, i*60+30,30,30);
           /* image.src = 'heart.png';
            ctx.drawImage(image, 540, j*30, 30, 30);*/

        }
    }
 }

function buildBonusBord() {
    LOGICmovingBonusBoard= new Array();
    for (var i = 0; i < 18; i++) {
        LOGICmovingBonusBoard[i] = new Array();
        for (var j = 0; j < 13; j++) {
            LOGICmovingBonusBoard[i][j] = 0;
        }
    }

    LOGICmovingBonusBoard[1][11] = 1;
    MrBonus= new bonus(9,1,11);

}

function DrowBonus()
{
    var canvas = document.getElementById("Bonus");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(PacmanPlayer.getBonus=="false") {


        var center = new Object();
        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 13; j++) {
                ctx.x = i * 30 + 15;
                ctx.y = j * 30 + 15;


                if (LOGICmovingBonusBoard[i][j] == 1) {
                    ctx.fillStyle = "#66ff66";
                    ctx.beginPath();
                    ctx.arc(ctx.x, ctx.y, 15, 0, 2 * Math.PI); // half circle
                    ctx.lineTo(ctx.x, ctx.y);
                    ctx.closePath();
                    ctx.fill();

                    ctx.fillStyle = "black";
                    ctx.beginPath();
                    ctx.font = "15px Garamond" + "bold";

                    ctx.fillText("bonus", ctx.x - 15, ctx.y + 5, 30);
                    ctx.fill();
                    ctx.closePath();
                }


            }

        }

    }

}
function ChackLife() {
    if((PacmanPlayer.x==ghost1.x&&PacmanPlayer.y==ghost1.y)||
        (PacmanPlayer.x==ghost2.x&&PacmanPlayer.y==ghost2.y)||
        (PacmanPlayer.x==ghost3.x&&PacmanPlayer.y==ghost3.y)
    )
    {
        if(PacmanPlayer.hart=="3")
        {
            lifeBord[2]="0";
        }
        if(PacmanPlayer.hart=="2")
        {
            lifeBord[1]="0";
        }
        if(PacmanPlayer.hart=="1")
        {
            lifeBord[0]="0";
        }
        PacmanPlayer.hart--;
    }
}

function loseMessage() {
    //draw popup
    var canvas = document.getElementById("game over");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;

    ctx.fillRect(600 / 2 - 100, 600 / 2 - 150, 200, 100);
    ctx.strokeRect(600 / 2 - 100, 600 / 2 - 150, 200, 100);

    //write message
    ctx.textAlign = "center";
    ctx.fillStyle = "red";
    ctx.font = "26px monospace";
    ctx.fillText("You Lost!", 600 / 2, 600 / 2 -100);
    ctx.font = "12px monospace";
    ctx.fillText("press R to play again", 600 / 2, 600 / 2 -80);

}

function timeUpMessege()
{
    //draw popup
    var canvas = document.getElementById("game over");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (score>"150") {
        ctx.fillStyle = "#33ccff";
        ctx.strokeStyle = "#3333ff";
        ctx.lineWidth = 5;

        ctx.fillRect(600 / 2 - 100, 600 / 2 - 150, 200, 100);
        ctx.strokeRect(600 / 2 - 100, 600 / 2 - 150, 200, 100);

        //write message
        ctx.textAlign = "center";
        ctx.fillStyle = "#000000";
        ctx.font = "26px monospace";
        ctx.fillText("You Lost!", 600 / 2, 600 / 2 - 100);
        ctx.font = "12px monospace";
        ctx.fillText("press R to play again", 600 / 2, 600 / 2 - 80);
    }
    else
    {
        ctx.fillStyle = "#33ccff";
        ctx.strokeStyle = "#3333ff";
        ctx.lineWidth = 5;

        ctx.fillRect(600 / 2 - 100, 600 / 2 - 150, 200, 100);
        ctx.strokeRect(600 / 2 - 100, 600 / 2 - 150, 200, 100);

        //write message
        ctx.textAlign = "center";
        ctx.fillStyle = "#000000";
        ctx.font = "26px monospace";
        ctx.fillText("You Can Do Better "+score, 600 / 2, 600 / 2 - 100);
        ctx.font = "12px monospace";
        ctx.fillText("press R to play again", 600 / 2, 600 / 2 - 80);
    }

}


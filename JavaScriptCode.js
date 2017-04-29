/**
 * Created by Simo on 24/04/2017.
 */
$( document ).ready(function() {
    pageLoaded();
    buildBoard();
    buildynamicBoard(3);
    Draw();
    DrawDynamicBoard();
    main();
});
//Game vars
var numberOfMonsters;
var staticBoard;
var dynamicBoard;
var score = 0;
var pacmanPlayer;

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
    interval=setInterval(UpdateCanvases, 100);
}
function UpdateCanvases()
{
    var keyPress = GetKeyPressed();
    switch (keyPress)
    {
        case 1: pacmanPlayer.move("up");
            keysDown = {};
            break;
        case 2: pacmanPlayer.move("down");
            keysDown = {};
            break;
        case 3: pacmanPlayer.move("left");
            keysDown = {};
            break;
        case 4: pacmanPlayer.move("right");
            keysDown = {};
            break;
    }
    DrawDynamicBoard();
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
function pacman(x,y)
{
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
        var ball = staticBoard[this.x,this.y];
        switch (ball)
        {
            case 6:
            {
                score+=5;
                break;
            }
            case 7:
            {
                score+=15;
                break;
            }
            case 8:
            {
                score+=25;
                break;
            }
        }
        staticBoard[this.x,this.y] = 0;
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
                dynamicBoard[character.x][character.y] = 0;
                character.y = character.y-1;
                dynamicBoard[character.x][character.y] = character.code;
                if(character.code == 2 && staticBoard[character.x,character.y]!=0)
                {
                    character.eat();
                }
            }
            break;
        }
        case "down":
        {
            if(checkIfMoveIsValid(character.x,character.y+1))
            {
                dynamicBoard[character.x][character.y] = 0;
                character.y = character.y+1;
                dynamicBoard[character.x][character.y] = character.code;
            }

            break;
        }
        case "left":
        {
            if(checkIfMoveIsValid(character.x-1,character.y))
            {
                dynamicBoard[character.x][character.y] = 0;
                character.x = character.x-1;
                dynamicBoard[character.x][character.y] = character.code;
            }
            break;
        }
        case "right":
        {
            if(checkIfMoveIsValid(character.x+1,character.y))
            {
                dynamicBoard[character.x][character.y] = 0;
                character.x = character.x+1;
                dynamicBoard[character.x][character.y] = character.code;
            }
            break;
        }
    }
}
function checkIfMoveIsValid(x,y)
{
    if(staticBoard[x][y] == 1 || x<0 || x>17 || y<0 || y>12)
    {
        return false;
    }
    return true;
}

function buildynamicBoard(numberOfMonsters) {
    dynamicBoard = new Array();
    for (var i = 0; i < 18; i++) {
        dynamicBoard[i] = new Array();
        for (var j = 0; j < 13; j++) {
            dynamicBoard[i][j] = 0;
        }
    }

   if (numberOfMonsters>=1)
   {
       dynamicBoard[1][1]=3
   }
   if (numberOfMonsters>=2)
    {
        dynamicBoard[16][11]=4
    }
    if (numberOfMonsters>=3)
    {
        dynamicBoard[16][1]=5
    }


    var bool= false;
    while (!bool)
    {
        var x = Math.floor((Math.random() *17) );
        var y = Math.floor((Math.random() * 12) );
        if(staticBoard[x][y]!=1 && dynamicBoard[x][y]==0){bool=true}
    }
    dynamicBoard[x][y]=2;
    pacmanPlayer = new pacman(x,y);


}
function buildBoard() {
    staticBoard = new Array();
    for (var i = 0; i < 18; i++) {
        staticBoard[i] = new Array();
        for (var j = 0; j < 13; j++) {
            staticBoard[i][j] = 0;
        }
    }
    for (var j = 0; j < 13; j++) {
        staticBoard[0][j] = 1;
    }
    for (var j = 0; j < 13; j++) {
        staticBoard[17][j] = 1;
    }

    for (var j = 0; j < 18; j++) {
        staticBoard[j][0] = 1;
    }
    for (var j = 0; j < 18; j++) {
        staticBoard[j][12] = 1;
    }
    staticBoard[2][2] = 1;
    staticBoard[2][3] = 1;
    staticBoard[3][3] = 1;
    staticBoard[3][4] = 1;
    staticBoard[3][5] = 1;
    staticBoard[4][5] = 1;
    staticBoard[4][1] = 1;
    staticBoard[1][5] = 1;
    staticBoard[1][7] = 1;
    staticBoard[2][10] = 1;
    staticBoard[3][7] = 1;
    staticBoard[3][8] = 1;
    staticBoard[4][7] = 1;
    staticBoard[4][8] = 1;
    staticBoard[4][9] = 1;
    staticBoard[4][11] = 1;
    staticBoard[5][11] = 1;
    staticBoard[5][8] = 1;
    staticBoard[5][9] = 1;
    staticBoard[6][8] = 1;
    staticBoard[7][8] = 1;
    staticBoard[5][3] = 1;
    staticBoard[6][2] = 1;
    staticBoard[5][9] = 1;
    staticBoard[6][8] = 1;
    staticBoard[7][8] = 1;
    staticBoard[6][5] = 1;
    staticBoard[6][6] = 1;
    staticBoard[7][6] = 1;
    staticBoard[8][6] = 1;
    staticBoard[9][6] = 1;
    staticBoard[10][6] = 1;
    staticBoard[11][6] = 1;
    staticBoard[11][5] = 1;
    staticBoard[10][8] = 1;
    staticBoard[11][8] = 1;
    staticBoard[12][8] = 1;
    staticBoard[13][8] = 1;
    staticBoard[14][8] = 1;
    staticBoard[12][9] = 1;
    staticBoard[13][9] = 1;
    staticBoard[13][7] = 1;
    staticBoard[14][7] = 1;
    staticBoard[7][4] = 1;
    staticBoard[10][4] = 1;
    staticBoard[10][2] = 1;
    staticBoard[11][2] = 1;
    staticBoard[12][3] = 1;
    staticBoard[13][1] = 1;
    staticBoard[7][2] = 1;
    staticBoard[15][2] = 1;
    staticBoard[15][3] = 1;
    staticBoard[14][3] = 1;
    staticBoard[14][4] = 1;
    staticBoard[14][5] = 1;
    staticBoard[13][5] = 1;
    staticBoard[7][10] = 1;
    staticBoard[8][10] = 1;
    staticBoard[9][10] = 1;
    staticBoard[10][10] = 1;
    staticBoard[16][5] = 1;
    staticBoard[16][7] = 1;
    staticBoard[15][10] = 1;
    staticBoard[12][11] = 1;
    staticBoard[13][11] = 1;
}

function Draw() {

    var canvas = document.getElementById("mCanvas");
    var ctx = canvas.getContext("2d");
    var center = new Object();
     for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 13 ;j++) {
            ctx.x = i * 30 ;
            ctx.y = j *30;

           if (staticBoard[i][j] == 0) {

               ctx.beginPath();
               ctx.rect(ctx.x,ctx.y,30,30,0);
               ctx.fillStyle = "blue";
               ctx.fill();

            }
            else if (staticBoard[i][j] == 1) {
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
    var center = new Object();
    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 13 ;j++) {
           ctx.x = i * 30+15 ;
           ctx.y = j *30+15;

            // if (dynamicBoard[i][j] == 0) {
            //
            //     ctx.beginPath();
            //     ctx.rect(ctx.x,ctx.y,10,10,5);
            //     ctx.fillStyle = "transparent";
            //     ctx.fill();
            //
            // }
            if (dynamicBoard[i][j] == 2) {
                if(pacmanPlayer.lastDirection=="right")
                {
                    if(pacmanPlayer.mouth=="open") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 1.5, 0, 2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.arc(ctx.x, ctx.y-6 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        pacmanPlayer.mouth=="close";
                    }
                    if(pacmanPlayer.mouth=="close") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15, 0, 2 * Math.PI); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y , 1.5, 0, 2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.arc(ctx.x, ctx.y-6 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        pacmanPlayer.mouth=="open";
                    }

                }
                 if(pacmanPlayer.lastDirection=="left")
                 {
                     if(pacmanPlayer.mouth=="open") {
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
                         pacmanPlayer.mouth=="close";
                     }
                     if(pacmanPlayer.mouth=="close") {
                         ctx.beginPath();
                         ctx.arc(ctx.x, ctx.y, 15, 0, 2 * Math.PI); // half circle
                         ctx.lineTo(ctx.x, ctx.y);
                         ctx.fillStyle = "yellow"; //color
                         ctx.fill();
                         ctx.beginPath();
                         ctx.arc(ctx.x, ctx.y , 1.5, 0, 2 * Math.PI); // circle
                         ctx.fillStyle = "black"; //color
                         ctx.fill();
                         ctx.arc(ctx.x, ctx.y-6 ,1.5,0,1.2 * Math.PI); // circle
                         ctx.fillStyle = "white"; //color
                         ctx.fill();
                         ctx.beginPath();
                         pacmanPlayer.mouth=="open";}
                 }
                if(pacmanPlayer.lastDirection=="up")
                {
                    if(pacmanPlayer.mouth=="open") {
                        ctx.beginPath();

                        ctx.arc(ctx.x, ctx.y, 15,1.75 * Math.PI, 1.25 * Math.PI, false); // half circle
                        ctx.lineTo(ctx.x, ctx.y);

                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x-6, ctx.y+4 ,3,0,2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x-6, ctx.y+4 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        pacmanPlayer.mouth=="close";
                    }
                    if(pacmanPlayer.mouth=="close") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15, 0, 2 * Math.PI); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y , 1.5, 0, 2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.arc(ctx.x, ctx.y-6 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        pacmanPlayer.mouth=="open";}
                }
                if(pacmanPlayer.lastDirection=="down")
                {
                    if(pacmanPlayer.mouth=="open") {
                        ctx.beginPath();

                        ctx.arc(ctx.x, ctx.y, 15,0.75 * Math.PI,0.25* Math.PI, false); // half circle
                        ctx.lineTo(ctx.x, ctx.y);

                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x-7, ctx.y ,3,0,2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.beginPath();

                        ctx.arc(ctx.x-7, ctx.y ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        pacmanPlayer.mouth=="close";
                    }
                    if(pacmanPlayer.mouth=="close") {
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y, 15, 0, 2 * Math.PI); // half circle
                        ctx.lineTo(ctx.x, ctx.y);
                        ctx.fillStyle = "yellow"; //color
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(ctx.x, ctx.y , 1.5, 0, 2 * Math.PI); // circle
                        ctx.fillStyle = "black"; //color
                        ctx.fill();
                        ctx.arc(ctx.x, ctx.y-6 ,1.5,0,1.2 * Math.PI); // circle
                        ctx.fillStyle = "white"; //color
                        ctx.fill();
                        ctx.beginPath();
                        pacmanPlayer.mouth=="open";}
                }

            }
            if (dynamicBoard[i][j] == 3)
            {
                ctx.arc(ctx.x, ctx.y ,15,0, Math.PI,true); // circle
                ctx.fillStyle = "green"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x+5, ctx.y+5 ,4,0,2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ctx.x-4, ctx.y+5 ,4,0,2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ctx.x+5, ctx.y+5 ,2,0,2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ctx.x-4, ctx.y+5 ,2,0,2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();


            }
            if (dynamicBoard[i][j] == 4) {


                ctx.arc(ctx.x+5, ctx.y+5 ,4,0,2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ctx.x-4, ctx.y+5 ,4,0,2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ctx.x+5, ctx.y+5 ,2,0,2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ctx.x-4, ctx.y+5 ,2,0,2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();
            }
            if (dynamicBoard[i][j] == 5) {
                ctx.arc(ctx.x+5, ctx.y+5 ,4,0,2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ctx.x-4, ctx.y+5 ,4,0,2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ctx.x+5, ctx.y+5 ,2,0,2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();
                ctx.arc(ctx.x-4, ctx.y+5 ,2,0,2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();
            }


        }
    }
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
                    if(ball5points > 0)
                    {
                        staticBoard[j][i] = 6;
                        ball5points--;
                        counter--;
                    }
                    else if(ball15points > 0 )
                    {
                        staticBoard[j][i] = 7;
                        ball15points--;
                        counter--;
                    }
                    else
                    {
                        staticBoard[j][i] = 8;
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
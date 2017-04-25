/**
 * Created by Simo on 24/04/2017.
 */
$( document ).ready(function() {
    pageLoaded();
    buildBoard();
    buildynamicBoard(2);
    DrawDynamicBoard();
    Draw();
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
function pacman(x,y)
{
    this.x = x;
    this.y = y;
    this.code = 2;
    this.lastDircetion = "right";
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
    if(staticBoard[x][y] == 1 || x<0 || x>12 || y<0 || y>17)
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
        dynamicBoard[1][1]=5
    }


    var bool= false;
    while (!bool)
    {
        var x = Math.floor((Math.random() * 17) + 1);
        var y = Math.floor((Math.random() * 12) + 1);
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
            ctx.x = i * 10 + 10;
            ctx.y = j *10 + 10;

           if (staticBoard[i][j] == 0) {

               ctx.beginPath();
               ctx.rect(ctx.x,ctx.y,10,10,5);
               ctx.fillStyle = "blue";
               ctx.fill();

            }
            else if (staticBoard[i][j] == 1) {
               ctx.beginPath();
               ctx.rect(ctx.x,ctx.y,10,10,5);
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
            ctx.x = i * 10 + 10;
            ctx.y = j *10 + 10;

            // if (dynamicBoard[i][j] == 0) {
            //
            //     ctx.beginPath();
            //     ctx.rect(ctx.x,ctx.y,10,10,5);
            //     ctx.fillStyle = "transparent";
            //     ctx.fill();
            //
            // }
            if (dynamicBoard[i][j] == 2) {
                if(pacmanPlayer.lastDircetion=="right")
                {

                    ctx.arc(ctx.x,ctx.y, 5, 0, 2 * Math.PI); // circle
                    ctx.fillStyle = "pink"; //color
                    ctx.fill();
                }
                if(pacmanPlayer.lastDircetion=="left")
                {
                    ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*10/9, 2*Math.PI-Math.PI*8/9, true);

                }

            }
            else if (staticBoard[i][j] == 3) {


            }
            else if (staticBoard[i][j] == 4) {


            }
            else if (staticBoard[i][j] == 5) {


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
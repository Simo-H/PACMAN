/**
 * Created by Simo on 03/05/2017.
 */
$( document ).ready(function() {
    pageLoaded();
    main();

});
var game;
// --------------------------- MAIN ---------------------------------------//

function main()
{
    game = new GAME(3,50,2000);
    game.INIT();
    //do stuff

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    /* newPlaceBonus();*/
    setInterval(function(){Update();}, 400);

}

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

function Update()
{
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


}
// ---------------------------- CLASSES ----------------------------------  //

// -----------------------  GAME CLASS  ----------------------------------- //

function GAME(numberOfGhosts,numberOfPointsBalls,TimerOfGame)
{
    this.PacmanPlayer;
    this.MRbonus;
    this.ghost1;
    this.ghost2;
    this.ghost3;
    this.BonusAlreadyEaten;
    this.Score = 0;
    this.TimesLeft = TimerOfGame;
    this.numberOfGhosts = numberOfGhosts;
    this.NumberOfPointsBalls = numberOfPointsBalls;
    this.LOGICstaticBoard;
    this.LOGICpacmanBoard;
    this.LOGICghost1Board;
    this.LOGICghost2Board;
    this.LOGICghost3Board;
    this.LOGICpointsBoard;
    this.LOGICmovingBonusBoard;


    // ----------------------------------------- Build Boards Methods  -------------------------------------- //
    this.buildLOGICstaticBoard = function() {
        this.LOGICstaticBoard = new Array();
        for (var i = 0; i < 18; i++) {
            this.LOGICstaticBoard[i] = new Array();
            for (var j = 0; j < 13; j++) {
                this.LOGICstaticBoard[i][j] = 0;
            }
        }
        for (var j = 0; j < 13; j++) {
            this.LOGICstaticBoard[0][j] = 1;
        }
        for (var j = 0; j < 13; j++) {
            this.LOGICstaticBoard[17][j] = 1;
        }

        for (var j = 0; j < 18; j++) {
            this.LOGICstaticBoard[j][0] = 1;
        }
        for (var j = 0; j < 18; j++) {
            this.LOGICstaticBoard[j][12] = 1;
        }
        this.LOGICstaticBoard[2][2] = 1;
        this.LOGICstaticBoard[2][3] = 1;
        this.LOGICstaticBoard[3][3] = 1;
        this.LOGICstaticBoard[3][4] = 1;
        this.LOGICstaticBoard[3][5] = 1;
        this.LOGICstaticBoard[4][5] = 1;
        this.LOGICstaticBoard[4][1] = 1;
        this.LOGICstaticBoard[1][5] = 0;
        this.LOGICstaticBoard[1][7] = 0;
        this.LOGICstaticBoard[2][10] = 1;
        this.LOGICstaticBoard[3][7] = 1;
        this.LOGICstaticBoard[3][8] = 1;
        this.LOGICstaticBoard[4][7] = 1;
        this.LOGICstaticBoard[4][8] = 1;
        this.LOGICstaticBoard[4][9] = 1;
        this.LOGICstaticBoard[4][11] = 1;
        this.LOGICstaticBoard[5][11] = 1;
        this.LOGICstaticBoard[5][8] = 1;
        this.LOGICstaticBoard[5][9] = 1;
        this.LOGICstaticBoard[6][8] = 1;
        this.LOGICstaticBoard[7][8] = 1;
        this.LOGICstaticBoard[5][3] = 1;
        this.LOGICstaticBoard[6][2] = 1;
        this.LOGICstaticBoard[5][9] = 1;
        this.LOGICstaticBoard[6][8] = 1;
        this.LOGICstaticBoard[7][8] = 1;
        this.LOGICstaticBoard[6][5] = 1;
        this.LOGICstaticBoard[6][6] = 1;
        this.LOGICstaticBoard[7][6] = 1;
        this.LOGICstaticBoard[8][6] = 1;
        this.LOGICstaticBoard[9][6] = 1;
        this.LOGICstaticBoard[10][6] = 1;
        this.LOGICstaticBoard[11][6] = 1;
        this.LOGICstaticBoard[11][5] = 1;
        this.LOGICstaticBoard[10][8] = 1;
        this.LOGICstaticBoard[11][8] = 1;
        this.LOGICstaticBoard[12][8] = 1;
        this.LOGICstaticBoard[13][8] = 1;
        this.LOGICstaticBoard[14][8] = 1;
        this.LOGICstaticBoard[12][9] = 1;
        this.LOGICstaticBoard[13][9] = 1;
        this.LOGICstaticBoard[13][7] = 1;
        this.LOGICstaticBoard[14][7] = 1;
        this.LOGICstaticBoard[7][4] = 0;
        this.LOGICstaticBoard[10][4] = 0;
        this.LOGICstaticBoard[10][2] = 1;
        this.LOGICstaticBoard[11][2] = 1;
        this.LOGICstaticBoard[12][3] = 1;
        this.LOGICstaticBoard[13][1] = 1;
        this.LOGICstaticBoard[7][2] = 1;
        this.LOGICstaticBoard[15][2] = 1;
        this.LOGICstaticBoard[15][3] = 1;
        this.LOGICstaticBoard[14][3] = 1;
        this.LOGICstaticBoard[14][4] = 1;
        this.LOGICstaticBoard[14][5] = 1;
        this.LOGICstaticBoard[13][5] = 1;
        this.LOGICstaticBoard[7][10] = 1;
        this.LOGICstaticBoard[8][10] = 1;
        this.LOGICstaticBoard[9][10] = 1;
        this.LOGICstaticBoard[10][10] = 1;
        this.LOGICstaticBoard[16][5] = 0;
        this.LOGICstaticBoard[16][7] = 0;
        this.LOGICstaticBoard[15][10] = 1;
        this.LOGICstaticBoard[12][11] = 1;
        this.LOGICstaticBoard[13][11] = 1;
    }
    this.fillPointsBalls = function (numberOfPointsBalls) {
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
                        if(ball5points > 0 && this.LOGICpacmanBoard[j][i]!=2 && this.LOGICstaticBoard[j][i]==0)
                        {
                            this.LOGICpointsBoard[j][i] = 6;
                            ball5points--;
                            counter--;
                        }
                        else if(ball15points > 0 && this.LOGICpacmanBoard[j][i]!=2 && this.LOGICstaticBoard[j][i]==0)
                        {
                            this.LOGICpointsBoard[j][i] = 7;
                            ball15points--;
                            counter--;
                        }
                        else if ( bal25points > 0 && this.LOGICpacmanBoard[j][i]!=2 && this.LOGICstaticBoard[j][i]==0)
                        {
                            this.LOGICpointsBoard[j][i] = 8;
                            bal25points--;
                            counter--;
                        }
                    }
                }
            }
        }
    }
    this.buildLOGICGhostBoards = function (numberOfGhosts) {
        this.LOGICghost1Board = new Array();
        for (var i = 0; i < 18; i++) {
            this.LOGICghost1Board[i] = new Array();
            for (var j = 0; j < 13; j++) {
                this.LOGICghost1Board[i][j] = 0;
            }
        }
        this.LOGICghost2Board = new Array();
        for (var i = 0; i < 18; i++) {
            this.LOGICghost2Board[i] = new Array();
            for (var j = 0; j < 13; j++) {
                this.LOGICghost2Board[i][j] = 0;
            }
        }
        this.LOGICghost3Board = new Array();
        for (var i = 0; i < 18; i++) {
            this.LOGICghost3Board[i] = new Array();
            for (var j = 0; j < 13; j++) {
                this.LOGICghost3Board[i][j] = 0;
            }
        }

        if (this.numberOfGhosts>=1)
        {
            this.ghost1=new GHOST(3,1,1);
            this.LOGICghost1Board[1][1]=3;
        }
        if (this.numberOfGhosts>=2)
        {
            this.ghost2=new GHOST(4,16,11);
            this.LOGICghost2Board[16][11]=4;
        }
        if (this.numberOfGhosts>=3)
        {
            this.ghost3=new GHOST(5,16,1);
            this.LOGICghost3Board[16][1]=5;
        }



    }
    this.buildLOGICpacmanBoard = function () {
        this.LOGICpacmanBoard = new Array();
        for (var i = 0; i < 18; i++) {
            this.LOGICpacmanBoard[i] = new Array();
            for (var j = 0; j < 13; j++) {
                this.LOGICpacmanBoard[i][j] = 0;
            }
        }
        var x;
        var y;
        var bool = false;
        while (!bool) {
            x = Math.floor((Math.random() * 17));
            y = Math.floor((Math.random() * 12));
            if (this.LOGICstaticBoard[x][y] != 1 && this.LOGICpacmanBoard[x][y] == 0) {
                bool = true
            }
        }
        this.PacmanPlayer=new PACMAN(x,y,3);
        this.LOGICpacmanBoard[x][y] = 2;
    }
    this.buildLOGICpointsBoard = function (numberOfPointsBalls) {
        this.LOGICpointsBoard = new Array();
        for (var i = 0; i < 18; i++) {
            this.LOGICpointsBoard[i] = new Array();
            for (var j = 0; j < 13; j++) {
                this.LOGICpointsBoard[i][j] = 0;
            }
        }
        this.fillPointsBalls(this.NumberOfPointsBalls);
    }
    this.buildLOGICbonusBoard = function () {
        this.LOGICmovingBonusBoard= new Array();
        for (var i = 0; i < 18; i++) {
            this.LOGICmovingBonusBoard[i] = new Array();
            for (var j = 0; j < 13; j++) {
                this.LOGICmovingBonusBoard[i][j] = 0;
            }
        }

        this.LOGICmovingBonusBoard[1][11] = 1;
        this.MRbonus = new BONUS(9,1,11);
    }
    // ---------------------------------------- Draw Boards Methods ----------------------------------------- //

    this.DrawLOGICstaticBoard = function () {

        var canvas = document.getElementById("mCanvas");
        var ctx = canvas.getContext("2d");
        var center = new Object();
        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 13 ;j++) {
                ctx.x = i * canvas.width/18 ;
                ctx.y = j *canvas.height/13;

                if (this.LOGICstaticBoard[i][j] == 0) {

                    ctx.beginPath();
                    ctx.rect(ctx.x,ctx.y,canvas.width/18 ,canvas.height/13,0);
                    ctx.fillStyle = "blue";
                    ctx.fill();

                }
                else if (this.LOGICstaticBoard[i][j] == 1) {
                    ctx.beginPath();
                    ctx.rect(ctx.x,ctx.y,canvas.width/18 ,canvas.height/13,0);
                    ctx.fillStyle = "red";
                    ctx.fill();
                }
            }
        }
    }
    this.DrawLOGICpacmanBoard = function () {

        var canvas = document.getElementById("m2Canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.x = game.PacmanPlayer.CanvasX;
                ctx.y = game.PacmanPlayer.CanvasY;
                    if(this.PacmanPlayer.lastDirection=="right")
                    {
                        if(this.PacmanPlayer.mouth=="open") {
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

                            this.PacmanPlayer.mouth="close";
                        }
                        else if(this.PacmanPlayer.mouth=="close") {
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
                            this.PacmanPlayer.mouth="open";
                        }

                    }
                    else if(this.PacmanPlayer.lastDirection=="left")
                    {
                        if(this.PacmanPlayer.mouth=="open") {
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
                            this.PacmanPlayer.mouth="close";
                        }
                        else if(this.PacmanPlayer.mouth=="close") {
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
                            this.PacmanPlayer.mouth="open";}
                    }
                    else if(this.PacmanPlayer.lastDirection=="up")
                    {
                        if(this.PacmanPlayer.mouth=="open") {
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
                            this.PacmanPlayer.mouth="close";
                        }
                        else if(this.PacmanPlayer.mouth=="close") {
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
                            this.PacmanPlayer.mouth="open";}
                    }
                    else if(this.PacmanPlayer.lastDirection=="down")
                    {
                        if(this.PacmanPlayer.mouth=="open") {
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
                            this.PacmanPlayer.mouth="close";
                        }
                        else if(this.PacmanPlayer.mouth=="close") {
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
                            this.PacmanPlayer.mouth = "open";
                        }
                    }

    }
    this.DrawLOGICpointsBoard = function () {


        var canvas = document.getElementById("food");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var center = new Object();
        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 13; j++) {
                ctx.x = i * 30 + 15;
                ctx.y = j * 30 + 15;


                if (this.LOGICpointsBoard[i][j] == 6) {
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
                if (this.LOGICpointsBoard[i][j] == 7) {
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
                if (this.LOGICpointsBoard[i][j] == 8) {
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
    this.DrawLOGICghostsBoard = function () {



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
                if (this.LOGICghost1Board[i][j] == 3) {

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
                if (this.LOGICghost2Board[i][j] == 4) {
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
                if (this.LOGICghost3Board[i][j] == 5) {
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
    this.DrawHearts = function () {
        //var ctx = document.querySelector("canvas").getContext("2d");
        var image = new Image();

        var canvas = document.getElementById("life");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var img = new Image();
        img.src = "heart.png";


        for (var i=0;i<this.PacmanPlayer.hearts;i++)
        {
            ctx.drawImage(img,540+15, i*60+30,30,30);
        }
    }
    this.DrawLOGICmovingBonusBoard = function ()
    {
        var canvas = document.getElementById("Bonus");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(this.PacmanPlayer.getBonus=="false") {


            var center = new Object();
            for (var i = 0; i < 18; i++) {
                for (var j = 0; j < 13; j++) {
                    ctx.x = i * 30 + 15;
                    ctx.y = j * 30 + 15;


                    if (this.LOGICmovingBonusBoard[i][j] == 1) {
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

    // ------------------------------------- GAME Methods ------------------------------------------------- //

    this.INIT = function ()
    {
        //initialization of all boards
        this.buildLOGICstaticBoard();
        this.buildLOGICpacmanBoard();
        this.buildLOGICpointsBoard(this.NumberOfPointsBalls);
        this.buildLOGICGhostBoards(this.numOf);
        this.buildLOGICbonusBoard();
        this.DrawLOGICstaticBoard();
        this.DrawLOGICpacmanBoard();
        this.DrawLOGICpointsBoard();
        this.DrawLOGICghostsBoard();
        this.DrawHearts();
        this.DrawLOGICmovingBonusBoard();
    }
    this.UpdateCharacterPosition = function (CanvasX,CanvasY,character)
    {
        character.CanvasY = CanvasY;
        character.CanvasX = CanvasX;

          switch (character.code)
          {
              case 2:
              {
                  this.LOGICpacmanBoard[character.x][character.y] = 0;
                  this.canvasToMatrixMoveCharacter(character.CanvasX,character.CanvasY,character);
                  this.LOGICpacmanBoard[character.x][character.y] = character.code;
                  if(character.code == 2 && this.LOGICpointsBoard[character.x][character.y]!=0)
                  {
                      character.eat();
                  }
              }
              case 3:
              {
                  this.LOGICghost1Board[character.x][character.y] = 0;
                  this.canvasToMatrixMoveCharacter(character.CanvasX,character.CanvasY,character);
                  this.LOGICghost1Board[character.x][character.y] = character.code;
              }
              case 4:
              {
                  this.LOGICghost2Board[character.x][character.y] = 0;
                  this.canvasToMatrixMoveCharacter(character.CanvasX,character.CanvasY,character);
                  this.LOGICghost2Board[character.x][character.y] = character.code;
              }
              case 5:
              {
                  this.LOGICghost3Board[character.x][character.y] = 0;
                  this.canvasToMatrixMoveCharacter(character.CanvasX,character.CanvasY,character);
                  this.LOGICghost3Board[character.x][character.y] = character.code;
              }
              case 9:
              {
                  this.LOGICmovingBonusBoard[character.x][character.y] = 0;
                  this.canvasToMatrixMoveCharacter(character.CanvasX,character.CanvasY,character);
                  this.LOGICmovingBonusBoard[character.x][character.y] = 1;
              }

          }
    }

    this.moveCharacter = function (direction,character)
    {
        switch (direction)
        {
            case "up":
            {
                if(this.CANVAScheckifMoveIsValid(character.CanvasX,character.CanvasY - character.speed - character.radius))
                {
                    this.UpdateCharacterPosition(character.CanvasX,character.CanvasY - character.speed - character.radius,character);
                }
                break;
            }
            case "down":
            {
                if(checkIfMoveIsValid(character.CanvasX,character.CanvasY + character.speed + character.radius))
                {
                    this.UpdateCharacterPosition(character.CanvasX,character.CanvasY + character.speed + character.radius,character);
                }
                break;
            }
            case "left":
            {
                if(checkIfMoveIsValid(character.CanvasX - character.speed - character.radius,character.CanvasY))
                {
                    this.UpdateCharacterPosition(character.CanvasX - character.speed - character.radius,character.CanvasY,character);
                }
                break;
            }
            case "right":
            {
                if(checkIfMoveIsValid(character.CanvasX + character.speed + character.radius,character.CanvasY,character))
                {
                    this.UpdateCharacterPosition(character.CanvasX + character.speed + character.radius,character.CanvasY,character);
                }
                break;
            }
        }
    }
    this.canvasToMatrixMoveCharacter = function (CanvasX,CanvasY,character)
    {
        var canvas = document.getElementById("mCanvas");
        var ctx = canvas.getContext("2d");
        character.x = Math.floor(CanvasX/(canvas.width/18));
        character.y =  Math.floor(CanvasY/(canvas.height/13));
    }
    this.canvasToMatrix = function (CanvasX,CanvasY)
    {
        var canvas = document.getElementById("mCanvas");
        var ctx = canvas.getContext("2d");
        return {X: Math.floor(CanvasX/(canvas.width/18)),Y: Math.floor(CanvasY/(canvas.height/13))}
    }
    this.LOGICcheckIfMoveIsValid = function (x,y)
    {
        if(LOGICstaticBoard[x][y] == 1 || x<0 || x>17 || y<0 || y>12)
        {
            return false;
        }
        return true;
    }

    this.CANVAScheckifMoveIsValid = function (CanvasX,CanvasY)
    {
        var pos = this.canvasToMatrix(CanvasX,CanvasY);
        return LOGICcheckIfMoveIsValid(pos.X,pos.Y);
    }

}

// -----------------------  PACMAN CLASS ---------------------------------- //

function PACMAN(x,y,hearts,speed,radius)
{
    var canvas = document.getElementById("m2Canvas");
    this.radius = radius;
    this.hearts=hearts;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.CanvasX = (canvas.width/18)*(x+0.5);
    this.CanvasY = (canvas.width/13)*(y+0.5);
    this.code = 2;
    this.lastDirection = "left";
    this.mouth="open";
    this.move = function (direction) {
        this.lastDirection = direction;

        moveCharacter(direction,this);
    }

    this.eat = function ()
    {
        var ball = game.LOGICpointsBoard[this.x][this.y];

        lblScore.value = game.Score;
        switch (ball)
        {
            case 6:
            {
                game.Score+=5;
                break;
            }
            case 7:
            {
                game.Score+=15;
                break;
            }
            case 8:
            {
                game.Score+=25;
                break;
            }
        }
        game.LOGICpointsBoard[this.x][this.y] = 0;
        game.DrawLOGICpointsBoard();
        lblScore = game.Score;

    }
}

// ------------------------ GHOST CLASS ----------------------------------- //
function GHOST(num, x, y,speed,radius)
{
    this.radius = radius;
    this.CanvasX;
    this.CanvasY;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.code = num;
    this.dir;

    this.moveNextStep= function()
    {
        var left=18;
        var right=18;
        var up=18;
        var down=18;
        var x;
        var y;
        var bool = false;
      /*  while (!bool) {
            x = Math.floor((Math.random() * 17));
            y=Math.floor((Math.random() * 13));
            if (game.LOGICstaticBoard[x][y] != 1 && game.LOGICpacmanBoard[x][y] == 0) {
                bool = true
            }
        }*/

        if(checkIfMoveIsValid(this.x,this.y-1 )&& (this.dir!="down")){
            up=Math.sqrt(Math.pow( (this.x - (game.PacmanPlayer.x )) ,2)+Math.pow( (this.y-1) -game.PacmanPlayer.y,2));
        }
        //down
        if(checkIfMoveIsValid(this.x,this.y+1)&& (this.dir!="up")){
            down=Math.sqrt(Math.pow( (this.x - (game.PacmanPlayer.x )) ,2)+Math.pow( (this.y+1) -game.PacmanPlayer.y,2));
        }
        //right
        if(checkIfMoveIsValid(this.x+1,this.y)&& (this.dir!="left")){
            right=Math.sqrt((Math.pow( (this.x +1)- (game.PacmanPlayer.x )) ,2)+Math.pow( (this.y) -game.PacmanPlayer.y,2));
        }
        //left
        if(checkIfMoveIsValid(this.x-1,this.y)&&(this.dir !="right")){
            left=Math.sqrt((Math.pow( (this.x +1)- (game.PacmanPlayer.x )) ,2)+Math.pow( (this.y) -game.PacmanPlayer.y,2));

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

// -------------------------- BONUS CLASS ---------------------------------- //
function BONUS(num, x, y,speed,radius)
{
    this.radius = radius;
    this.CanvasX;
    this.CanvasY;
    this.speed = speed;
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



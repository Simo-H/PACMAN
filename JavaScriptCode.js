/**
 * Created by Simo on 24/04/2017.
 */
$( document ).ready(function() {
    pageLoaded();
    buildBoard();
    Draw();
});
//Game vars

var board;


function buildBoard() {
    board = new Array();
    for (var i = 0; i < 18; i++) {
        board[i] = new Array();
        for (var j = 0; j < 13; j++) {
            board[i][j] = 0;
        }
    }

        for (var j = 0; j < 13; j++) {
            board[0][j] = 1;
        }
         for (var j = 0; j < 13; j++) {
            board[17][j] = 1;
         }

        for (var j = 0; j < 18; j++) {
            board[j][0] = 1;
        }
        for (var j = 0; j < 18; j++) {
            board[j][12] = 1;
        }
    board[2][2] = 1;
    board[2][3] = 1;
    board[3][3] = 1;
    board[3][4] = 1;
    board[3][5] = 1;
    board[4][5] = 1;

    board[4][1] = 1;
    board[1][5] = 1;
    board[1][7] = 1;
    board[2][10] = 1;



    board[3][7] = 1;
    board[3][8] = 1;
    board[4][7] = 1;
    board[4][8] = 1;
    board[4][9] = 1;
    board[4][11] = 1;
    board[5][11] = 1;
    board[5][8] = 1;
    board[5][9] = 1;
    board[6][8] = 1;
    board[7][8] = 1;
    board[5][3] = 1;
    board[6][2] = 1;
    board[5][9] = 1;
    board[6][8] = 1;
    board[7][8] = 1;
    board[6][5] = 1;
    board[6][6] = 1;
    board[7][6] = 1;
    board[8][6] = 1;
    board[9][6] = 1;
    board[10][6] = 1;
    board[11][6] = 1;
    board[11][5] = 1;
    board[10][8] = 1;
    board[11][8] = 1;
    board[12][8] = 1;
    board[13][8] = 1;
    board[14][8] = 1;
    board[12][9] = 1;
    board[13][9] = 1;
    board[13][7] = 1;
    board[14][7] = 1;
    board[7][4] = 1;
    board[10][4] = 1;
    board[10][2] = 1;
    board[11][2] = 1;
    board[12][3] = 1;
    board[13][1] = 1;

    board[7][2] = 1;
    board[15][2] = 1;
    board[15][3] = 1;
    board[14][3] = 1;
    board[14][4] = 1;
    board[14][5] = 1;
    board[13][5] = 1;
    board[7][10] = 1;
    board[8][10] = 1;
    board[9][10] = 1;
    board[10][10] = 1;

    board[16][5] = 1;
    board[16][7] = 1;
    board[15][10] = 1;
    board[12][11] = 1;
    board[13][11] = 1;


    // board[14][1] = 1;





}

    /* ------------ End Pre-Build Walls  ------------ */



function Draw() {

    var canvas = document.getElementById("mCanvas");
    var ctx = canvas.getContext("2d");
    var center = new Object();
     for (var i = 0; i < 19; i++) {
        for (var j = 0; j < 14 ;j++) {
            ctx.x = i * 10 + 10;
            ctx.y = j *10 + 10;

           if (board[i][j] == 0) {

               ctx.beginPath();
               ctx.rect(ctx.x,ctx.y,10,10,5);
               ctx.fillStyle = "blue";
               ctx.fill();

            }
            else if (board[i][j] == 1) {
               ctx.beginPath();
               ctx.rect(ctx.x,ctx.y,10,10,5);
               ctx.fillStyle = "red";
               ctx.fill();
                    content.fillStyle="#FF0000";
                    content.fillRect(i*5,j*5,5,5);
                    break;
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
                        board[j][i] = 6;
                        ball5points--;
                        counter--;
                    }
                    else if(ball15points > 0 )
                    {
                        board[j][i] = 7;
                        ball15points--;
                        counter--;
                    }
                    else
                    {
                        board[j][i] = 8;
                        bal25points--;
                        counter--;
                    }
                }
            }
        }
    }


              ;
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
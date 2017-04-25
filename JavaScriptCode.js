/**
 * Created by Simo on 24/04/2017.
 */
$( document ).ready(function() {
    pageLoaded();
    buildBoard();
    draw();
});
//Game vars

var board;



//Game functions
function Pacman(posX,posY,img) {
    this.posX = posX;
    this.posY = posY;
    this.img = new Image();
    this.img.src = img;
    
}
function draw()
{
    var c = document.getElementById("myCanvas");
    var content = c.getContext("2d");
    for(var i = 0;i<13;i++)
    {
        for(var j = 0;j<18;j++)
        {
            switch(board[i][j])
            {
                case 0:
                    content.fillRect(i*5,j*5,5,5);
                    content.fillStyle="#4286f4";
                    break;

                case 1:

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

}

function movePacman() {

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
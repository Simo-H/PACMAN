/**
 * Created by Simo on 24/04/2017.
 */
$( document ).ready(function() {
    pageLoaded();
});
//Game functions
var board;

function buildBoard()
{
    board = new Array();
    for(var i = 0;i<18;i++)
    {
        board[i] = new Array();
        for(var j = 0;j<13;j++)
        {
            board[0,0]=1;


            //horizontal outer
            board[0,12];

            // vertical outer
            board[0,0];
            board[0,7];
            board[17,0];
            board[17,7];

            // ghost base
            board[7,4];
            board[6,5];
            board[10,4];
            board[11,5];
            board[6,6];



            // single blocks
            board[4,0];
            board[13,0];

            board[2,2];
            board[6,2];
            board[15,2];
            board[10,2];

            board[2,3];
            board[14,3];
            board[5,3];
            board[12,3];
            board[3,3];
            board[14,3];

            board[3,4];
            board[14,4];

            board[0,5];
            board[3,5];
            board[16,5];
            board[13,5];

            board[0,7];
            board[16,7];
            board[3,7];
            board[13,7];

            board[4,8];
            board[12,8];
            board[5,8];
            board[10,8];

            board[2,10];
            board[15,10];
            board[7,10];
            board[4,11];
            board[12,11];
            /* ------------ End Pre-Build Walls  ------------ */
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
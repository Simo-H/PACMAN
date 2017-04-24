/**
 * Created by Simo on 24/04/2017.
 */
$( document ).ready(function() {
    pageLoaded();
    buildBoard();
});
//Game functions
var board;

function buildBoard() {
    board = new Array();
    for (var i = 0; i < 18; i++) {
        board[i] = new Array();
        for (var j = 0; j < 13; j++) {
            board[i][j] = 0;
        }
    }
    board[0][0] = 1;
    //horizontal outer
    board[0][12] = 1;
    // vertical outer
    board[0][0] = 1;
    board[0][7] = 1;
    board[17][0] = 1;
    board[17][7] = 1;
    // ghost base
    board[7][4] = 1;
    board[6][5] = 1;
    board[10][4] = 1;
    board[11][5] = 1;
    board[6][6] = 1;
    // single blocks
    board[4][0] = 1;
    board[13][0] = 1;
    board[2][2] = 1;
    board[6][2] = 1;
    board[15][2] = 1;
    board[10][2] = 1;
    board[2][3] = 1;
    board[14][3] = 1;
    board[5][3] = 1;
    board[12][3] = 1;
    board[3][3] = 1;
    board[14][3] = 1;
    board[3][4] = 1;
    board[14][4] = 1;
    board[0][5] = 1;
    board[3][5] = 1;
    board[16][5] = 1;
    board[13][5] = 1;
    board[0][7] = 1;
    board[16][7] = 1;
    board[3][7] = 1;
    board[13][7] = 1;
    board[4][8] = 1;
    board[12][8] = 1;
    board[5][8] = 1;
    board[10][8] = 1;
    board[2][10] = 1;
    board[15][10] = 1;
    board[7][10] = 1;
    board[4][11] = 1;
    board[12][11] = 1;

    /* ------------ End Pre-Build Walls  ------------ */

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
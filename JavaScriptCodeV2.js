/**
 * Created by Simo on 03/05/2017.
 */
$(document).ready(function () {
    // var windowWidth = $(window).width();
    // var windowHeight = $(window).height();
    // // $("#mCanvas").height = windowHeight/2;
    // // $("#mCanvas").width = windowWidth/2;
    // var a = $("#mCanvas");
    // var ctx = a[0].getContext('2d');
    // ctx.canvas.width = windowWidth/2;
    // ctx.canvas.height = windowHeight/2;
    //$(".canvas").style.height = windowHeight/2;
    //$(".canvas").style.width = windowWidth/2;
    usernameArray = new Array();
    passwordArray = new Array();
    height = (document.getElementById("mCanvas").height) / 13;
    width = (document.getElementById("mCanvas").width) / 18;

    pageLoaded();

    $('#contact_P').on('input', function() {
        var input=$(this);
        var p=input.val();
        var reo = /[0-9]/;
        var re = /[a-zA-Z]/;
        var letters=re.test(input.val());
        var numbers=reo.test(input.val());
        if(letters&& numbers && p.length==8 )
        {input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });




    $('#contact_u').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        var bool =jQuery.inArray( is_name, usernameArray );
        if(is_name&& bool=="-1" ){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });
    // Name can't be blank
    $('#contact_name').on('input', function() {
        var input=$(this);
        var p=input.val();
        var reo = /[0-9]/;
        var re = /[a-zA-Z]/;
        var letters=re.test(input.val());
        var numbers=reo.test(input.val());
        if(letters&& !numbers )
        {input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_lname').on('input', function() {
        var input=$(this);
        var p=input.val();
        var reo = /[0-9]/;
        var re = /[a-zA-Z]/;
        var letters=re.test(input.val());
        var numbers=reo.test(input.val());
        if(letters&& !numbers )
        {input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });
    $('#contact_email').on('input', function() {
        var input=$(this);
        var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var is_email=re.test(input.val());
        if(is_email){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_bday').on('input', function() {
        var input=$(this);
        var d=input.val();
        var bool;
        if(d>"1900-01-01"&& d<"2017-5-6"){
            bool=true;
        }
        if(bool){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $("#contact_submit").click(function(event){
        var form_data=$("#contact").serializeArray();
        var error_free=true;
        for (var input in form_data){
            var element=$("#contact_"+form_data[input]['name']);
            var valid=element.hasClass("valid");
            var error_element=$("span", element.parent());
            if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;}
            else{error_element.removeClass("error_show").addClass("error");}
        }
        if (!error_free){
            event.preventDefault();
        }
        else {
            event.preventDefault();
            var name= $('#contact_u');
            name=name.val();
            usernameArray.push(name);
            var password= $('#contact_P');
            password=password.val();
            passwordArray.push(password);
            ShowSection("Welcome");
            $('#contact_u').val(" ");
            $('#contact_P').val("");
            $('#contact_name').val('');
            $('#contact_lname').val('');
            $('#contact_email').val('');
            $('#contact_bday').val('');

        }
    });

});
window.onclick = function (event) {
    if(event.target ==  $('#modalDiv')[0])
    {
        $('#modalDiv').css("display","none");
    }

}



var usernameArray;
var passwordArray;
var game;
var bfs;
var height;
var width;
var startTime;
var audio;
var interval;
var isLoggedIn = false;
audio = new Audio('Pacman Dubstep Remix.mp3');
var audioWin = new Audio('D.J. Khaled - All I do is Win (short version chorus).mp3');
var audioLose = new Audio('beck-loser_cutted.mp3');



// --------------------------- MAIN ---------------------------------------//

function main(Ghosts,Balls,time) {
    game = new GAME(Ghosts,Balls,parseInt(time));
    $("#lblTime").text(time);

    game.INIT();
    ShowSection("rsg");

    var canvas = document.getElementById("rsg");
    var ctx = canvas.getContext("2d");
    //write message
   //  ctx.textAlign="center";
   //  ctx.font = "50px monospace";
   //  ctx.vertAlign="top";
   //  ctx.fillStyle="white";
   //
   //  ctx.fillText("Redy", canvas.width/2, canvas.height/2);
   // // sleep(1000);
   //  ctx.clearRect(0, 0, canvas.width, canvas.height);
   //
   //  ctx.fillText("Steady", canvas.width/2, canvas.height/2);
   // // sleep(1000);
   //  ctx.clearRect(0, 0, canvas.width, canvas.height);
   //
   //  ctx.fillText("Go..", canvas.width/2, canvas.height/2);
   //  sleep(1000);
   //  ctx.clearRect(0, 0, canvas.width, canvas.height);

    ShowSection("Game");

    startTime = new Date();

    audio.play();
    //do stuff

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    //newPlaceBonus();
    interval = setInterval(function () {
        Update();
    }, 50);

}

function pageLoaded() {

    ShowSection('Welcome');
}

function ShowSection(id) {
    //hide all
    if (id!="rsg" && id!="YouLost" && id!="YouCanDoBetter"&& id!="WeHaveAWinner") {
        var Welcome = document.getElementById('Welcome');
        Welcome.style.visibility = "hidden";
        var Register = document.getElementById('Register');
        Register.style.visibility = "hidden";
        var Login = document.getElementById('Login');
        Login.style.visibility = "hidden";
        var About = document.getElementById('About');
        About.style.visibility = "hidden";
        var About = document.getElementById('choice');
        About.style.visibility = "hidden";
        var About = document.getElementById('Game');
        About.style.visibility = "hidden";
        var About = document.getElementById('rsg');
        About.style.visibility = "hidden";
        var About = document.getElementById('WeHaveAWinner');
        About.style.visibility = "hidden";
        var About = document.getElementById('YouCanDoBetter');
        About.style.visibility = "hidden";
        var About = document.getElementById('YouLost');
        About.style.visibility = "hidden";
    }

    //Show selected
    audio.pause();
    audio.currentTime = 0;
    audioWin.pause();
    audioWin.currentTime = 0;
    audioLose.pause();
    audioLose.currentTime = 0;
    clearInterval(interval);
    if(isLoggedIn && id=="Login")
    {
        var selected = document.getElementById("choice");
        selected.style.visibility = "visible";
    }
    else
    {
        var selected = document.getElementById(id);
        selected.style.visibility = "visible";

    }
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

function Update() {
    var keyPress = GetKeyPressed();
    switch (keyPress) {
        case 1:
            game.PacmanPlayer.move("up");
            keysDown = {};
            break;
        case 2:
            game.PacmanPlayer.move("down");
            keysDown = {};
            break;
        case 3:
            game.PacmanPlayer.move("left");
            keysDown = {};
            break;
        case 4:
            game.PacmanPlayer.move("right");
            keysDown = {};
            break;
    }
    if($("#lblTime").text() == 0)
    {
        //STAV END GAME
        window.clearInterval(interval);
        if(game.Score >= 150)
        {
            window.clearInterval(interval);
            gameOver("win");
        }
        else
        {
            gameOver("better");

        }
    }
    game.ghost1.BFSMoveNextStep();
    if(game.numberOfGhosts >1)
        game.ghost2.BFSMoveNextStep();
    if(game.numberOfGhosts > 2)
        game.ghost3.BFSMoveNextStep();
    if(game.BonusAlreadyEaten == "false")
        game.MRbonus.BonusMoveNextStep();
    game.DrawLOGICpacmanBoard();
    game.DrawLOGICghostsBoard();
    game.DrawLOGICmovingBonusBoard();
    game.CheckIfPacmanIsEaten();
    game.CheckifPacmanEatenBonus();
    $("#lblScore").text(game.Score);
    $("#lblTime").text(Math.floor(game.Time - (new Date()-startTime)/1000));
    game.DrawLOGICpointsBoard();
    game.DrawHearts();
}

// document.getElementById("mainlogin").onclick = function() {ClickLogin()};

function ClickLogin() {
    if (document.getElementById("name").value!="" && document.getElementById("password").value!="") {
        var usernameLogin = document.getElementById("name").value;
        var passwordLogin = document.getElementById("password").value;
        if (usernameLogin != "test2017" && passwordLogin != "test2017" && usernameLogin != "a" && passwordLogin != "a") {
            var index = usernameArray.indexOf(usernameLogin);
            if (passwordArray[index] == passwordLogin) {
                document.getElementById("Welcome name").textContent = "Welcome " + usernameLogin;
                ShowSection('choice');
            }
        }
        else
        {
            if(!isLoggedIn)
            {
                document.getElementById("Welcome name").textContent = "Welcome " + usernameLogin;
                ShowSection('choice');
                isLoggedIn = true;
                $('#welcomeMenuText').text("Play |");
                $('#WelcomeLoginButton').text("Play");
                $('#LogOut').css("visibility", "visible");
            }
            else
            {
                ShowSection('choice');
            }
        }
    }
    else
    {


    }
}

function openModal () {
    $('#modalDiv').css("display","block");
}
function closeModal() {
    $('#modalDiv').css("display","none");

}

function StartGame()
{
    if((document.getElementById("Numberofghosts").value!='')&&(document.getElementById("timeOfGame").value!='')&&(document.getElementById("50-90").value!='')&&((document.getElementById("50-90").value<=90)&&( document.getElementById("50-90").value>=50)))
    {
        var x = document.getElementById("Numberofghosts");
        var  Number_of_ghosts=x.options[x.selectedIndex].value;
        var y = document.getElementById("timeOfGame");
        var  timeOfGame=y.options[y.selectedIndex].value;
        var num=document.getElementById("50-90").value;
        main(parseInt(Number_of_ghosts),parseInt(num),timeOfGame);


    }
    else{
    alert("Invalid number of balls, please try again");

    }
}
function ReGame() {
    ShowSection("choice");
}

    function clickLogout()
    {

        passwordArray.push("aaaaa");
        isLoggedIn = false;
        $('#welcomeMenuText').text("Login |");
        $('#WelcomeLoginButton').text("Login");
        $('#LogOut').css("visibility", "hidden");
        ShowSection("Welcome");
    }
    function ToMenu()
    {
        passwordArray.push("aaaaaaa");
        ShowSection("Welcome");

    }
    function gameOver(reason)
    {
        clearInterval(interval);
        switch (reason)
        {
            case "win":
            {
                $("#point3").text("Score : " + game.Score);
                ShowSection("WeHaveAWinner");
                audioWin.play();
                break;
            }
            case "better":
            {
                $("#point2").text("Score : " + game.Score);
                ShowSection("YouCanDoBetter");
                break;
            }
            case "lose":
            {
                $("#point1").text("Score : " + game.Score);
                ShowSection("YouLost");
                audioLose.play();
                break;
            }

        }

    }
    function NewGame() {
        ShowSection("choice");

    }

    function gotoRegister() {

        ShowSection("Register");
    }

    function gotoLogin() {
        ShowSection("Login");

    }

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }



// ---------------------------- CLASSES ----------------------------------  //

// -----------------------  GAME CLASS  ----------------------------------- //

function GAME(numberOfGhosts, numberOfPointsBalls, TimerOfGame) {
    this.PacmanPlayer;
    this.MRbonus;
    this.ghost1;
    this.ghost2;
    this.ghost3;
    this.BonusAlreadyEaten = "false";
    this.Score = 0;
    this.Time = TimerOfGame;
    this.numberOfGhosts = numberOfGhosts;
    this.NumberOfPointsBalls = numberOfPointsBalls;
    this.LOGICstaticBoard;
    this.LOGICpacmanBoard;
    this.LOGICghost1Board;
    this.LOGICghost2Board;
    this.LOGICghost3Board;
    this.LOGICpointsBoard;
    this.LOGICmovingBonusBoard;

    //Sounds

    this.SOUND_eatPoint = new Audio('pacman_chomp.wav');
    this.SOUND_pacmanDead = new Audio('pacman_death.wav');
    this.SOUND_eatMoreTime = new Audio('pacman_eatfruit.wav');
    this.SOUND_moreLife = new Audio('pacman_extrapac.wav');
    //images


    // ----------------------------------------- Build Boards Methods  -------------------------------------- //
    this.buildLOGICstaticBoard = function () {
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
        var ball5points = 0.6 * numberOfPointsBalls;
        var ball15points = 0.3 * numberOfPointsBalls;
        var bal25points = 0.1 * numberOfPointsBalls;
        var specials = 2;
        var counter = numberOfPointsBalls + specials;
        while (counter > 0) {
            for (var i = 0; i < 13; i++) {
                for (var j = 0; j < 18; j++) {
                    if (Math.random() > 0.5) {
                        if (ball5points > 0 && this.LOGICpacmanBoard[j][i] != 2 && this.LOGICstaticBoard[j][i] == 0) {
                            this.LOGICpointsBoard[j][i] = 6;
                            ball5points--;
                            counter--;
                        }
                        else if(specials == 2 && this.LOGICpacmanBoard[j][i] != 2 && this.LOGICstaticBoard[j][i] == 0)
                        {
                            this.LOGICpointsBoard[j][i] = 11;
                            specials--;
                            counter--;
                        }

                        else if (ball15points > 0 && this.LOGICpacmanBoard[j][i] != 2 && this.LOGICstaticBoard[j][i] == 0) {
                            this.LOGICpointsBoard[j][i] = 7;
                            ball15points--;
                            counter--;
                        }
                        else if(specials == 1 && this.LOGICpacmanBoard[j][i] != 2 && this.LOGICstaticBoard[j][i] == 0 )
                        {
                            this.LOGICpointsBoard[j][i] = 22;
                            specials--;
                            counter--;
                        }
                        else if (bal25points > 0 && this.LOGICpacmanBoard[j][i] != 2 && this.LOGICstaticBoard[j][i] == 0) {
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

        if (this.numberOfGhosts >= 1) {
            this.ghost1 = new GHOST(3, 1, 1,2,14);
            this.LOGICghost1Board[1][1] = 3;
        }
        if (this.numberOfGhosts >= 2) {
            this.ghost2 = new GHOST(4, 16, 11,2,14);
            this.LOGICghost2Board[16][11] = 4;
        }
        if (this.numberOfGhosts >= 3) {
            this.ghost3 = new GHOST(5, 16, 1,2,14);
            this.LOGICghost3Board[16][1] = 5;
        }


    }
    this.buildLOGICpacmanBoard = function (hearts) {
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
            x = 4 + Math.floor((Math.random() * 10));
            y = 3 + Math.floor((Math.random() * 7));
            if (this.LOGICstaticBoard[x][y] != 1 && this.LOGICpacmanBoard[x][y] == 0) {
                bool = true
            }
        }
        this.PacmanPlayer = new PACMAN(x, y, hearts,15, 14);
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
        this.LOGICmovingBonusBoard = new Array();
        for (var i = 0; i < 18; i++) {
            this.LOGICmovingBonusBoard[i] = new Array();
            for (var j = 0; j < 13; j++) {
                this.LOGICmovingBonusBoard[i][j] = 0;
            }
        }

        this.LOGICmovingBonusBoard[1][11] = 1;
        this.MRbonus = new BONUS(9, 1, 11, 2, 14);
    }
    // ---------------------------------------- Draw Boards Methods ----------------------------------------- //

    this.DrawLOGICstaticBoard = function () {

        var canvas = document.getElementById("mCanvas");
        var ctx = canvas.getContext("2d");
        var center = new Object();
        for (var i = 0; i < 18; i++) {
            for (var j = 0; j < 13; j++) {
                ctx.x = i * canvas.width / 18;
                ctx.y = j * canvas.height / 13;

                if (this.LOGICstaticBoard[i][j] == 0) {

                    ctx.beginPath();
                    ctx.rect(ctx.x, ctx.y, canvas.width / 18, canvas.height / 13, 0);
                    ctx.fillStyle = "black";
                    ctx.fill();

                }
                else if (this.LOGICstaticBoard[i][j] == 1) {
                    ctx.beginPath();
                    ctx.rect(ctx.x, ctx.y, canvas.width / 18, canvas.height / 13, 0);
                    ctx.fillStyle = "blue";
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
        if (this.PacmanPlayer.lastDirection == "right") {
            if (this.PacmanPlayer.mouth == "open") {
                ctx.beginPath();
                ctx.arc(ctx.x, ctx.y, this.PacmanPlayer.radius, 0.25 * Math.PI, 1.75 * Math.PI, false); // half circle
                ctx.lineTo(ctx.x, ctx.y);
                ctx.fillStyle = "yellow"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x, ctx.y - 6, 3, 0, 2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x, ctx.y - 6, 1.5, 0, 1.2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();


            }
            else if (this.PacmanPlayer.mouth == "close") {
                ctx.beginPath();
                ctx.arc(ctx.x, ctx.y, this.PacmanPlayer.radius, 0.10 * Math.PI, 1.90 * Math.PI, false); // half circle
                ctx.lineTo(ctx.x, ctx.y);
                ctx.fillStyle = "yellow"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x, ctx.y - 6, 3, 0, 2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x, ctx.y - 6, 1.5, 0, 1.2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();

            }

        }
        else if (this.PacmanPlayer.lastDirection == "left") {
            if (this.PacmanPlayer.mouth == "open") {
                ctx.beginPath();
                ctx.arc(ctx.x, ctx.y, this.PacmanPlayer.radius, 0.75 * Math.PI, 1.25 * Math.PI, true); // half circle
                ctx.lineTo(ctx.x, ctx.y);
                ctx.fillStyle = "yellow"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x, ctx.y - 6, 3, 0, 2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x, ctx.y - 6, 1.5, 0, 1.2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();

            }
            else if (this.PacmanPlayer.mouth == "close") {
                ctx.beginPath();
                ctx.arc(ctx.x, ctx.y, this.PacmanPlayer.radius, 0.90 * Math.PI, 1.10 * Math.PI, true); // half circle
                ctx.lineTo(ctx.x, ctx.y);
                ctx.fillStyle = "yellow"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x, ctx.y - 6, 3, 0, 2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x, ctx.y - 6, 1.5, 0, 1.2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();

            }
        }
        else if (this.PacmanPlayer.lastDirection == "up") {
            if (this.PacmanPlayer.mouth == "open") {
                ctx.beginPath();
                ctx.arc(ctx.x, ctx.y, this.PacmanPlayer.radius, 1.25 * Math.PI, 1.75 * Math.PI, true); // half circle
                ctx.lineTo(ctx.x, ctx.y);
                ctx.fillStyle = "yellow"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x - 6, ctx.y + 3, 3, 0, 2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x - 6, ctx.y + 3, 1.5, 0, 1.2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();
                this.PacmanPlayer.mouth = "close";
            }
            else if (this.PacmanPlayer.mouth == "close") {
                ctx.beginPath();
                ctx.arc(ctx.x, ctx.y, this.PacmanPlayer.radius, 1.4 * Math.PI, 1.6 * Math.PI, true); // half circle
                ctx.lineTo(ctx.x, ctx.y);
                ctx.fillStyle = "yellow"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x - 6, ctx.y + 3, 3, 0, 2 * Math.PI); // circle
                ctx.fillStyle = "black"; //color
                ctx.fill();
                ctx.beginPath();

                ctx.arc(ctx.x - 6, ctx.y + 3, 1.5, 0, 1.2 * Math.PI); // circle
                ctx.fillStyle = "white"; //color
                ctx.fill();
                ctx.beginPath();

            }
        }
        else if (this.PacmanPlayer.lastDirection == "down") {
            if (this.PacmanPlayer.mouth == "open") {
                ctx.beginPath();
                ctx.arc(ctx.x, ctx.y, this.PacmanPlayer.radius, 0.25 * Math.PI, 0.75 * Math.PI, true); // half circle
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

            }
            else if (this.PacmanPlayer.mouth == "close") {
                ctx.beginPath();
                ctx.arc(ctx.x, ctx.y, this.PacmanPlayer.radius, 0.4 * Math.PI, 0.6 * Math.PI, true); // half circle
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
                ctx.x = i * width + width / 2;
                ctx.y = j * height + height / 2;


                if (this.LOGICpointsBoard[i][j] == 6) {
                    ctx.fillStyle = "red";
                    ctx.beginPath();
                    ctx.arc(ctx.x, ctx.y, 7, 0, 2 * Math.PI); // half circle
                    ctx.lineTo(ctx.x, ctx.y);
                    ctx.closePath();
                    ctx.fill();

                    ctx.fillStyle = "white";
                    ctx.beginPath();
                    ctx.font = "15px Garamond" + "bold";

                    ctx.fillText("5", ctx.x - 4, ctx.y + 5, 30);
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
                    ctx.font = "10px Garamond" + "bold";

                    ctx.fillText("15", ctx.x - 5, ctx.y + 4, 30);
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
                    ctx.font = "10px Garamond" + "bold";

                    ctx.fillText("25", ctx.x - 5, ctx.y + 4, 30);
                    ctx.fill();
                    ctx.closePath();
                }
                if (this.LOGICpointsBoard[i][j] == 11)
                {
                    var img1 = new Image();
                    var posx = ctx.x -width/2;
                    var posy = ctx.y - height/2;
                    img1.src = "heart.png";
                    ctx.drawImage(img1,posx, posy,25,25);
                }
                if (this.LOGICpointsBoard[i][j] == 22)
                {
                    var img2 = new Image();
                    var posx = ctx.x -width/2;
                    var posy = ctx.y - height/2;
                    img2.src = "cherry_bonus-0.png";
                    ctx.drawImage(img2, posx, posy, 25, 25);
                }



            }
        }
    }
    this.DrawLOGICghostsBoard = function () {
        var canvas1 = document.getElementById("ghost1");
        var ctx1 = canvas1.getContext("2d");
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        var canvas2 = document.getElementById("ghost2");
        var ctx2 = canvas2.getContext("2d")
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        var canvas3 = document.getElementById("ghost3");
        var ctx3 = canvas3.getContext("2d");
        ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
        ctx1.x = this.ghost1.CanvasX - width/2;
        ctx1.y = this.ghost1.CanvasY - height/2;
        var ghost1Img = new Image();
        ghost1Img.src = "ghost1.png";
        var ghost2Img = new Image();
        ghost2Img.src = "ghost2-0.png";
        var ghost3Img = new Image();
        ghost3Img.src = "pacman3-0.png";
        ctx1.drawImage(ghost1Img, ctx1.x,ctx1.y, 30, 30);
        if (numberOfGhosts > 1) {
            ctx2.x = this.ghost2.CanvasX - width/2;;
            ctx2.y = this.ghost2.CanvasY - height/2;
            ctx2.drawImage(ghost2Img, ctx2.x,ctx2.y, 30, 30);
        }
        if (numberOfGhosts > 2) {
            ctx3.x = this.ghost3.CanvasX - width/2;;
            ctx3.y = this.ghost3.CanvasY - height/2;
            ctx3.drawImage(ghost3Img, ctx3.x,ctx3.y, 30, 30);

        }
    }
    this.DrawHearts = function () {
        //var ctx = document.querySelector("canvas").getContext("2d");
        var canvas = document.getElementById("life");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var img = new Image();
        img.src = "heart.png";


        for (var i = 0; i < this.PacmanPlayer.hearts; i++) {
            ctx.drawImage(img, 600 + 15, i * 60 + 30, 30, 30);
        }
    }
    this.DrawLOGICmovingBonusBoard = function () {
        var canvas = document.getElementById("Bonus");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.BonusAlreadyEaten == "false") {

            ctx.x = this.MRbonus.CanvasX;
            ctx.y = this.MRbonus.CanvasY;
            ctx.fillStyle = "#66ff66";
            ctx.beginPath();
            ctx.arc(ctx.x, ctx.y, this.MRbonus.radius, 0, 2 * Math.PI); // half circle
            ctx.lineTo(ctx.x, ctx.y);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.font = "13px Garamond" + "bold";
            ctx.fillText("Bonus", ctx.x - 15, ctx.y + 5, 30);
            ctx.fill();
            ctx.closePath();


        }
    }

    // ------------------------------------- GAME Methods ------------------------------------------------- //

    this.INIT = function () {
        ShowSection("Game");
        //initialization of all boards
        this.buildLOGICstaticBoard();
        this.buildLOGICpacmanBoard(3);
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


    this.UpdateCharacterPosition = function (CanvasX, CanvasY, character) {
        character.CanvasY = CanvasY;
        character.CanvasX = CanvasX;

        switch (character.code) {
            case 2: {
                this.LOGICpacmanBoard[character.x][character.y] = 0;
                this.canvasToMatrixMoveCharacter(character.CanvasX, character.CanvasY, character);
                this.LOGICpacmanBoard[character.x][character.y] = character.code;
                if (character.code == 2 && this.LOGICpointsBoard[character.x][character.y] != 0) {
                    character.eat();
                }
                break;
            }
            case 3: {
                this.LOGICghost1Board[character.x][character.y] = 0;
                this.canvasToMatrixMoveCharacter(character.CanvasX, character.CanvasY, character);
                this.LOGICghost1Board[character.x][character.y] = character.code;
                break;
            }
            case 4: {
                this.LOGICghost2Board[character.x][character.y] = 0;
                this.canvasToMatrixMoveCharacter(character.CanvasX, character.CanvasY, character);
                this.LOGICghost2Board[character.x][character.y] = character.code;
                break;
            }
            case 5: {
                this.LOGICghost3Board[character.x][character.y] = 0;
                this.canvasToMatrixMoveCharacter(character.CanvasX, character.CanvasY, character);
                this.LOGICghost3Board[character.x][character.y] = character.code;
                break;
            }
            case 9: {
                this.LOGICmovingBonusBoard[character.x][character.y] = 0;
                this.canvasToMatrixMoveCharacter(character.CanvasX, character.CanvasY, character);
                this.LOGICmovingBonusBoard[character.x][character.y] = 1;
                break;
            }

        }
    }

    this.moveCharacter = function (direction, character) {
        switch (direction) {
            case "up": {
                if ((this.CANVAScheckifMoveIsValid(character.CanvasX - character.radius, character.CanvasY - character.speed - character.radius))
                && (this.CANVAScheckifMoveIsValid(character.CanvasX + character.radius, character.CanvasY - character.speed - character.radius))) {
                    this.UpdateCharacterPosition(character.CanvasX, character.CanvasY - character.speed, character);
                }
                break;
            }
            case "down": {
                if ((this.CANVAScheckifMoveIsValid(character.CanvasX - character.radius, character.CanvasY + character.speed + character.radius))
                && (this.CANVAScheckifMoveIsValid(character.CanvasX + character.radius, character.CanvasY + character.speed + character.radius))) {
                    this.UpdateCharacterPosition(character.CanvasX, character.CanvasY + character.speed, character);
                }
                break;
            }
            case "left": {
                if ((this.CANVAScheckifMoveIsValid(character.CanvasX - character.speed - character.radius, character.CanvasY - character.radius))
                    &&(this.CANVAScheckifMoveIsValid(character.CanvasX - character.speed - character.radius, character.CanvasY + character.radius))) {
                    this.UpdateCharacterPosition(character.CanvasX - character.speed, character.CanvasY, character);
                }
                break;
            }
            case "right": {
                if ((this.CANVAScheckifMoveIsValid(character.CanvasX + character.speed + character.radius, character.CanvasY - character.radius ))
                    &&(this.CANVAScheckifMoveIsValid(character.CanvasX + character.speed + character.radius, character.CanvasY + character.radius))) {
                    this.UpdateCharacterPosition(character.CanvasX + character.speed, character.CanvasY, character);
                }
                break;
            }
        }
    }
    this.canvasToMatrixMoveCharacter = function (CanvasX, CanvasY, character) {
        var canvas = document.getElementById("mCanvas");
        var ctx = canvas.getContext("2d");
        character.x = Math.floor(CanvasX / (canvas.width / 18));
        character.y = Math.floor(CanvasY / (canvas.height / 13));
    }
    this.canvasToMatrix = function (CanvasX, CanvasY) {
        var canvas = document.getElementById("mCanvas");
        var ctx = canvas.getContext("2d");
        return {X: Math.floor(CanvasX / (canvas.width / 18)), Y: Math.floor(CanvasY / (canvas.height / 13))}
    }
    this.LOGICcheckIfMoveIsValid = function (x, y) {
        if (this.LOGICstaticBoard[x][y] == 1 || x < 0 || x > 17 || y < 0 || y > 12) {
            return false;
        }
        return true;
    }

    this.CANVAScheckifMoveIsValid = function (CanvasX, CanvasY) {
        var pos = this.canvasToMatrix(CanvasX, CanvasY);
        return this.LOGICcheckIfMoveIsValid(pos.X, pos.Y);
    }
    this.CheckIfPacmanIsEaten = function () {
        switch (this.numberOfGhosts)
        {
            case 3:
            {
                if((game.PacmanPlayer.x==game.ghost1.x&&game.PacmanPlayer.y==game.ghost1.y)||
                    (game.PacmanPlayer.x==game.ghost2.x&&game.PacmanPlayer.y==game.ghost2.y)||
                    (game.PacmanPlayer.x==game.ghost3.x&&game.PacmanPlayer.y==game.ghost3.y))
                {
                    var hearts = this.PacmanPlayer.hearts--;
                    //STAV - do box READY? 3 .. 2 .. 1 .. GO
                    this.buildLOGICGhostBoards(this.numberOfGhosts);
                    this.buildLOGICpacmanBoard(this.PacmanPlayer.hearts);
                    this.DrawHearts();
                    this.SOUND_pacmanDead.play();
                }
                break;
            }
            case 2:
            {
                if((game.PacmanPlayer.x==game.ghost1.x&&game.PacmanPlayer.y==game.ghost1.y)||
                    (game.PacmanPlayer.x==game.ghost2.x&&game.PacmanPlayer.y==game.ghost2.y))
                {
                    var hearts = this.PacmanPlayer.hearts--;
                    //STAV - do box READY? 3 .. 2 .. 1 .. GO
                    this.buildLOGICGhostBoards(this.numberOfGhosts);
                    this.buildLOGICpacmanBoard(this.PacmanPlayer.hearts);
                    this.DrawHearts();
                    this.SOUND_pacmanDead.play();
                }
            }
            case 1:
                if((game.PacmanPlayer.x==game.ghost1.x&&game.PacmanPlayer.y==game.ghost1.y))
                {
                    var hearts = this.PacmanPlayer.hearts--;
                    //STAV - do box READY? 3 .. 2 .. 1 .. GO
                    this.buildLOGICGhostBoards(this.numberOfGhosts);
                    this.buildLOGICpacmanBoard(this.PacmanPlayer.hearts);
                    this.DrawHearts();
                    this.SOUND_pacmanDead.play();
                }
        }
        if(this.PacmanPlayer.hearts == 0)
        {
            window.clearInterval(interval);
            gameOver("lose");
        }
    }
    this.CheckifPacmanEatenBonus = function (){
        if(this.PacmanPlayer.x == this.MRbonus.x && this.PacmanPlayer.y == this.MRbonus.y && this.BonusAlreadyEaten == "false")
        {
            this.BonusAlreadyEaten = "true";
            this.LOGICmovingBonusBoard[this.MRbonus.x][this.MRbonus.y] = 0;
            game.SOUND_moreLife.play();
            this.DrawLOGICmovingBonusBoard();
            this.Score += 50;
        }
    }
}

// -----------------------  PACMAN CLASS ---------------------------------- //

function PACMAN(x, y, hearts, speed, radius) {
    var canvas = document.getElementById("m2Canvas");
    this.radius = radius;
    this.hearts = hearts;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.CanvasX = (width) * (x + 0.5);
    this.CanvasY = (height) * (y + 0.5);
    this.code = 2;
    this.lastDirection = "left";
    this.mouth = "open";
    this.move = function (direction) {
        this.lastDirection = direction;
        if(this.mouth == "close")
            this.mouth = "open";
        else
            this.mouth = "close";
        game.moveCharacter(direction, this);
    }

    this.eat = function () {
        var ball = game.LOGICpointsBoard[this.x][this.y];
        switch (ball) {
            case 6: {
                game.Score += 5;
                game.SOUND_eatPoint.play();
                break;
            }
            case 7: {
                game.Score += 15;
                game.SOUND_eatPoint.play();
                break;
            }
            case 8: {
                game.Score += 25;
                game.SOUND_eatPoint.play();
                break;
            }
            case 11: {
                this.hearts++;
                game.SOUND_eatMoreTime.play();
                break;
            }
            case 22:
            {
                game.Time+=15;
                game.SOUND_eatMoreTime.play();
                break;
            }
        }

        game.LOGICpointsBoard[this.x][this.y] = 0;
        //game.DrawLOGICpointsBoard();

    }
}

// ------------------------ GHOST CLASS ----------------------------------- //
function GHOST(num, x, y, speed, radius) {
    this.radius = radius;
    this.CanvasX = (width) * (x + 0.5);
    this.CanvasY = (height) * (y + 0.5);
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.code = num;
    this.dir;
    this.lastMove;
    this.counterRight = 0;
    this.counterUp = 0;
    this.moveNextStep = function () {
        var left = 18;
        var right = 18;
        var up = 18;
        var down = 18;
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

        if (checkIfMoveIsValid(this.x, this.y - 1) && (this.dir != "down")) {
            up = Math.sqrt(Math.pow((this.x - (game.PacmanPlayer.x )), 2) + Math.pow((this.y - 1) - game.PacmanPlayer.y, 2));
        }
        //down
        if (checkIfMoveIsValid(this.x, this.y + 1) && (this.dir != "up")) {
            down = Math.sqrt(Math.pow((this.x - (game.PacmanPlayer.x )), 2) + Math.pow((this.y + 1) - game.PacmanPlayer.y, 2));
        }
        //right
        if (checkIfMoveIsValid(this.x + 1, this.y) && (this.dir != "left")) {
            right = Math.sqrt((Math.pow((this.x + 1) - (game.PacmanPlayer.x )) , 2) + Math.pow((this.y) - game.PacmanPlayer.y, 2));
        }
        //left
        if (checkIfMoveIsValid(this.x - 1, this.y) && (this.dir != "right")) {
            left = Math.sqrt((Math.pow((this.x + 1) - (game.PacmanPlayer.x )) , 2) + Math.pow((this.y) - game.PacmanPlayer.y, 2));

        }
        var minDist = Math.min(left, right, up, down);

        switch (minDist) {
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
        game.moveCharacter(this.dir, this);

    }

    this.BFSMoveNextStep = function ()
    {

        if(this.counterRight == 0 && this.counterUp == 0)
        {
            var start = new STATE(this.x,this.y,null,null)
            var goal = new STATE(game.PacmanPlayer.x,game.PacmanPlayer.y);
            bfs = new BFS(start,goal);
            var nextMove = bfs.findNextMove();
            this.lastMove = nextMove;
            if(nextMove == "left" || nextMove == "right")
            {
                this.counterRight = (width/this.speed) - 1;

            }
            else
            {
                this.counterUp = (height/this.speed) - 1;

            }
        }
        else
        {
            if(this.lastMove == "left" || this.lastMove == "right")
            {
                this.counterRight-= 1;
                var nextMove = this.lastMove;
            }
            else
            {
                this.counterUp-= 1;
                var nextMove = this.lastMove;
            }
        }
        game.moveCharacter(nextMove,this);
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
function BONUS(num, x, y, speed, radius) {
    this.radius = radius;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.CanvasX = (width) * (x + 0.5);
    this.CanvasY = (height) * (y + 0.5);
    this.code = num;
    this.dir;
    this.lastMove;
    this.counterUp = 0;
    this.counterRight = 0;
    this.queue;
    this.moveNextStep = function () {
        var x;
        var y;
        while (!game.BonusAlreadyEaten) {

            game.checkIfMoveIsValid()
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
    this.BonusCheckValidMove = function (x, y) {
        if (game.LOGICstaticBoard[x][y] == 1 || x < 0 || x > 17 || y < 0 || y > 12) {
            return false;
        }
        return true;
    }
    this.chooseNextMove = function () {
        this.queue = new Array();
        if(this.BonusCheckValidMove(this.x,this.y+1) && this.lastMove != "up")
            this.queue.push("down");
        if(this.BonusCheckValidMove(this.x,this.y-1) && this.lastMove != "down")
            this.queue.push("up");
        if(this.BonusCheckValidMove(this.x+1,this.y) && this.lastMove != "left")
            this.queue.push("right");
        if(this.BonusCheckValidMove(this.x-1,this.y) && this.lastMove != "right")
            this.queue.push("left");
        var choose = Math.floor(Math.random()*this.queue.length);
        return this.queue[choose];
    }
    this.BonusMoveNextStep = function ()
    {

        if(this.counterRight == 0 && this.counterUp == 0)
        {
            var nextMove = this.chooseNextMove();
            this.lastMove = nextMove;
            if(nextMove == "left" || nextMove == "right")
            {
                this.counterRight = (width/this.speed) - 1;

            }
            else
            {
                this.counterUp = (height/this.speed) - 1;

            }
        }
        else
        {
            if(this.lastMove == "left" || this.lastMove == "right")
            {
                this.counterRight-= 1;
                var nextMove = this.lastMove;
            }
            else
            {
                this.counterUp-= 1;
                var nextMove = this.lastMove;
            }
        }
        game.moveCharacter(nextMove,this);
    }
}


// --------------------------- BFS ----------------------------------------- //
function BFS(Start, Goal)
{
    this.queue = new Array();
    this.start = Start;
    this.goal = Goal;
    this.Matrix =$.extend(true, [], game.LOGICstaticBoard);

    this.BFScheckValidMove = function (x, y) {
        if (this.Matrix[x][y] == 1 || x < 0 || x > 17 || y < 0 || y > 12) {
            return false;
        }
        return true;
    }
    // this.BFScheckCanvasValidMove = function (CanvasX, CanvasY) {
    //     var pos = this.canvasToMatrix(CanvasX, CanvasY);
    //     return this.LOGICcheckIfMoveIsValid(pos.X, pos.Y);
    // }
    this.openNextStates = function (state)
    {
        var queue = new Array();
        if(this.BFScheckValidMove(state.x,state.y-1))
            queue.push(new STATE(state.x,state.y-1,state,"up"));
        if(this.BFScheckValidMove(state.x,state.y+1))
            queue.push(new STATE(state.x,state.y+1,state,"down"));
        if(this.BFScheckValidMove(state.x-1,state.y))
            queue.push(new STATE(state.x-1,state.y,state,"left"));
        if(this.BFScheckValidMove(state.x+1,state.y))
            queue.push(new STATE(state.x+1,state.y,state,"right"));
        return queue;
    }

    this.findNextMove = function ()
    {
        this.queue.unshift(this.start);
        while(this.queue.length > 0)
        {
            var currentState = this.queue.pop();
            this.Matrix[currentState.x][currentState.y] = 1;
            if(currentState.isGoalState(this.goal))
            {
                while(currentState.cameFrom != null && currentState.cameFrom.cameFrom != null)
                    currentState = currentState.cameFrom;
                return currentState.direction;
            }
            var a = new Array();
            a = this.openNextStates(currentState);
            for(var i = 0;i<a.length;i++)
            {
                this.queue.unshift(a[i]);
            }
        }
    }
}

// -------------------------- STATE CLASS ---------------------------------- //

function STATE(x,y,cameFrom,direction)
{
    this.x = x;
    this.y = y;
    this.cameFrom = cameFrom;
    this.direction = direction;
    var queue = [];

    this.isGoalState = function (goal)
    {
        if(this.x == goal.x && this.y == goal.y)
            return true;
        return false;
    }
}
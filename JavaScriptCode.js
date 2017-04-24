/**
 * Created by Simo on 24/04/2017.
 */
$( document ).ready(function() {
    pageLoaded();
});

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
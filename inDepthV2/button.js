function reRoute(){
                    document.location.href='https://discord.com/api/oauth2/authorize?client_id=707998791126745149&redirect_uri=http%3A%2F%2Fec2-18-191-68-76.us-east-2.compute.amazonaws.com%2FinDepthV2%2FdataDisplay.php&response_type=code&scope=identify';
                    var login = document.getElementById('realUserName').innerHTML;
                     document.getElementById('home').innerText = login;

                } 
 function logOut(){
    document.location.href='finalProjectLogout.php';
 }
 function loading(){
    document.getElementById("loadingGif").style.display = "none";
    document.getElementById("run").innerText = "--LOADING--";

 }
<?php

    session_start();
    $accessToken = $_SESSION['current_Token'];

    require_once('Template.php');
    $tmpl = new Template();
    $header = $tmpl->build('PageLayoutTemplate.tmpl');
    
?>
<!DOCTYPE html>

<html lang = "en">
	<head>
		<title>LeagueOflegendsInDepth</title>
        <meta charset="UTF-8">
        <link href = "finalProjectCss.css" rel = "stylesheet" type = "text/css">
        <link href="https://fonts.googleapis.com/css?family=Alata&display=swap" rel="stylesheet">
        
         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script type="text/javascript" src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
        <script type="text/javascript" src="https://canvasjs.com/assets/script/canvasjs.min.js"></script> 
        <script type ="text/javascript" src = "GraphJS.js"></script>
        <script type ="text/javascript" src = "button.js"></script>
        <script data-ad-client="ca-pub-4150085836719181" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    </head> 
     <body>
         <?php print $header?>
         
            <div id = "allContent">
            <h1 id = "nameHolder">Welcome Summoner: "<span id = "summonerName"></span>"</h1>
                <img class = "" id = "userAvatar"  alt = "avatar">
                <?php 
            
            $code = $_GET['code'];

            if($code == ""){
                
            }
                $CLIENT_ID = "707998791126745149";
                $CLIENT_SECRET = "zxN3HffiiB6huRjsZ4wgGW2Gl3qzCldD";
                $URL = "https://discordapp.com/api/oauth2/token";
                $grant = "authorization_code";
                $REDIRECT = "http://ec2-18-191-68-76.us-east-2.compute.amazonaws.com/inDepthV2/dataDisplay.php";
                $scope = "identify";
                $API = "https://discordapp.com/api/users/@me";
                $APIREQUEST = "/users/@me";
                
                
                $postParams = [
                    'client_id' => $CLIENT_ID,
                    'client_secret'=> $CLIENT_SECRET,
                    'grant_type' => $grant,
                    'code' => $code,
                    'redirect_uri' => $REDIRECT,
                    'scope' => $scope,
                      
                ];
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $URL);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS,$postParams);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $server_output = curl_exec($ch);
                curl_close ($ch);
            
                $data = json_decode($server_output);
                
                
                if($data->access_token != ""){
                    
                    $accessToken = $_SESSION['current_token'] = $data->access_token;
                    $header = "Authorization: Bearer ".$accessToken."";
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $API);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch, CURLOPT_HTTPHEADER,array($header));
                    $server_output2 = curl_exec($ch);
                    curl_close ($ch);
                    
                    $userName = json_decode($server_output2);
                    $userAvatar = $userName->avatar;
                    $userID = $userName->id;
                    $avatarPng = "https://cdn.discordapp.com/avatars/".$userID."/".$userAvatar.".png";
                    echo '<p id = "realUserName">'.$userName->username.'</p><script type = "text/javascript">var login = document.getElementById("realUserName").innerHTML;
                    document.getElementById("home").innerText = "Hello: " + login; document.getElementById("userAvatar").src= "'.$avatarPng.'"; document.getElementById("userAvatar").style.display = "block";</script>';
                    
                    
                }
                
            ?>
                
                <h1 id = "test"></h1>
                
                <div id = "run"> <div id = "loadingGif"><img id = "loading" src = "https://66.media.tumblr.com/53ce9dfffa2744f64d6b79ea9ee90759/tumblr_mvd8kacCdT1qzqouzo1_r3_500.gif"><div id = "center" class = "userClickStyle" onclick = "calculate()">Calculate</div></div></div>
                
                <div id = "chartContainer"></div>
                <div id = "videos"><h1>Want to get better at your role?</h1>
                <iframe id = "4"class = "youtubeVideo" width="560" height="315" src="https://www.youtube.com/embed/isePrdE_8RA" frameborder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <iframe id = "1" class = "youtubeVideo" width="560" height="315" src="https://www.youtube.com/embed/4vbmyA1ZZaY" frameborder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <iframe id = "0" class = "youtubeVideo" width="560" height="315" src="https://www.youtube.com/embed/OCSk8d4deWk" frameborder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <iframe od = "2" class = "youtubeVideo" width="560" height="315" src="https://www.youtube.com/embed/3vwrE8k68Qw" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <iframe id = "3" class = "youtubeVideo" width="560" height="315" src="https://www.youtube.com/embed/Of0sVgS4FhE" frameborder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div id ="chartContainerChamps"></div>
                <h1 id = "infoInGame">Here is an in Depth look into your Gameplay</h1>
                <div id = "goldChartContainer"></div>
                <div id = "itemHolder">
                    <h3>Item Set: </h3>
                    <img id ="item0" src = "" alt = "item0" >
                    <img id ="item1" src = "" alt = "item1" >
                    <img id ="item2" src = "" alt = "item2" >
                    <img id ="item3" src = "" alt = "item3" >
                    <img id ="item4" src = "" alt = "item4" >
                    <img id ="item5" src = "" alt = "item5" >
                    <img id ="item6" src = "" alt = "item6" >
                    
                </div>
                <h2>Want more features? Let us know!</h2>
                
         </div>
         
         <div id = "infoBar">
             <h2><span id = "aboutUs">About Us:</span> This page will grab your LoL username and pull up data about your gold, exp, playrates, etc.</h2>
         </div>
	 </body>
    
           
        
</html>
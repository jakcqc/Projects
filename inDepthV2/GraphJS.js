var gameID = [];
                var champsPlayed=[];
                var rolesPlayed=[];
                var lanePlayed = [];
                var winRateChamp;
                var gamesPlayed = 192;
                var winRateRole;
                var rolePlayRate = [0,0,0,0,0];
                var chart;
                var chartChamps;
                var champAmount = [0,0,0,0,0];
                var mostPlayedChamps = [111,161,11,202,518];
                var accountName = "peeepeeeman";
                var participantNumber;
                var items = [0,0,0,0,0,0];
                var goldChart;
                var totalGold = 0;
                var currentGold;
                var xp;
                var gold;
                var avgXp = 0;


    $(function(){
                
               
                goldChart = new CanvasJS.Chart("goldChartContainer", { 
		title: {
			text: "In Game Comparisons"
		},
        animationEnabled: true,
        axisX:{
            minimum:0
        },
        axisY:{
            suffix: "",
          minimum: 0
        },
                    theme: "dark2",
		data: [
		{
            
			type: "line",
            showInLegend:"true",
            name: "Your Gold",
			dataPoints: [
				{ y: 0 }
				
			]
	},
            {
			type: "line",
            showInLegend:"true",
            name: "Average Gold",
			dataPoints: [
				{ y: 0 }
				
			]
	},
            {
			type: "line",
            showInLegend:"true",
            name: "Your xp",
			dataPoints: [
				{ y: 0 }
				
			]
	},
            {
			type: "line",
            showInLegend:"true",
            name: "Average xp",
			dataPoints: [
				{ y: 0 }
				
			]
	},
    {
        type: "line",
        showInLegend: true,
                    name: "Current Gold",
                    lineDashType: "dash",
                    dataPoints:[
                        {y: 0}
                        
                    ]
    }]
    });
    goldChart.render();
        
                chart = new CanvasJS.Chart("chartContainer", { 
		title: {
			text: "Percentage of Each Role Played through the Season"
		},
        animationEnabled: true,
        axisX:{
            minimum:0,
            maximum: gamesPlayed
        },
        axisY:{
            suffix: "%",
          minimum: 0,
            maximum: 100
        },
                    theme: "dark2",
		data: [
		{
            
			type: "line",
            showInLegend:"true",
            name: "jungle",
			dataPoints: [
				{ y: 0 }
				
			]
	},
            {
			type: "line",
            showInLegend:"true",
            name: "support",
			dataPoints: [
				{ y: 0 }
				
			]
	},
            {
			type: "line",
            showInLegend:"true",
            name: "ADC",
			dataPoints: [
				{ y: 0 }
				
			]
	},
            {
			type: "line",
            showInLegend:"true",
            name: "mid",
			dataPoints: [
				{ y: 0 }
				
			]
	},
    {
        type: "line",
        showInLegend: true,
                    name: "top",
                    lineDashType: "dash",
                    dataPoints:[
                        {y: 0}
                        
                    ]
    }]
    });
	chart.render();	 
        
        chartChamps = new CanvasJS.Chart("chartContainerChamps", {
	title: {
		text: "Top Five Champions Played"              
	},
        theme: "dark2",
  animationEnabled: true,
  
	data: [              
	{
		// Change type to "doughnut", "line", "splineArea", etc.
		type: "column",
		dataPoints: [
			//{ label: mostPlayedChamps[0],  y: champAmount[0]  },
			//{ label: mostPlayedChamps[1], y: champAmount[1]   },
			//{ label: mostPlayedChamps[2], y: champAmount[2]  },
			//{ label: mostPlayedChamps[3],  y: champAmount[3]  },
			//{ label: mostPlayedChamps[4],  y: champAmount[4]  }
		]
	}
	]
 });
chartChamps.render();
});
             
             
                function addPoints(dataValue,yValue) {
                    
                    var length = chart.options.data[dataValue].dataPoints.length;
	               chart.options.data[dataValue].dataPoints.push({ y: yValue});
                    
	               chart.render();
                    
                }
                function addPointsGold(dataValue,yValue) {
                    
                    var length = goldChart.options.data[dataValue].dataPoints.length;
	               goldChart.options.data[dataValue].dataPoints.push({ y: yValue});
                    
	               goldChart.render();
                    
                }
                var url = "https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com";
                var API = "api_key=RGAPI-a52ce2c2-8809-4311-89e1-4db17cb023f6";
                var sumName = "peeepeeeman";
                 url = url + "/lol/summoner/v4/summoners/by-name/" + sumName + "?" + API;
                $.get(url, {format: "json"},function(data){
                        //url would normally be equal to the league api + whatever the summoner name is, I am using my own json files here to access the api information as my website does not have access
                    var accountID = data.accountId;
                     accountName = data.name;
                    document.getElementById("summonerName").innerHTML = accountName;
                });
                //here you would pass the accountID to access this information but we have it a json file instead, which contains all of the data from the api
                url = "http://ec2-18-191-68-76.us-east-2.compute.amazonaws.com/inDepthV2/LeagueJsonFiles/match-matchlists.JSON";
                $.get(url, {format:"json"}, function(data){
                       gamesPlayed = data.totalGames;
                    gameID.length = gamesPlayed;
                    champsPlayed.length = gamesPlayed;
                    rolesPlayed.length = gamesPlayed;
                    lanePlayed.length = gamesPlayed;
                    for(var i = 0; i<gamesPlayed-1;i++){
                            gameID[i]=data.matches[i].gameId;
                        champsPlayed[i] = data.matches[i].champion;
                        rolesPlayed[i] = data.matches[i].role;
                        lanePlayed[i] = data.matches[i].lane;   
                    }
                    
                });
                url = "http://ec2-18-191-68-76.us-east-2.compute.amazonaws.com/inDepthV2/LeagueJsonFiles/championID.JSON";
                $.get(url,{format:"json"},function(data){
                    for(var j = 0;j<5;j++){
                        var temp = mostPlayedChamps[j];
                        
                            mostPlayedChamps[j] = data.data[temp].name;
                        
                    }
                   //document.getElementById("test").innerHTML = champsPlayed[1];
                   
                    
                });
                url = "http://ec2-18-191-68-76.us-east-2.compute.amazonaws.com/inDepthV2/LeagueJsonFiles/matchInfo.JSON";
                $.get(url,{format:"json"},function(data){
                   // document.getElementById("test").innerHTML = data.participantIdentities[1]
                    for(var i = 0; i<10;i++){
                        if(data.participantIdentities[i].player.summonerName == accountName){
                            participantNumber = data.participantIdentities[i].participantId;
                        }
                          
                    }
                    for(var j =0; j<7;j++){
                        var itemTemp = j;
                        itemTemp = itemTemp.toString();
                        itemTemp = "item" + itemTemp;
                        var itemID = data.participants[1].stats[itemTemp];
                        if(itemID != "0" && itemID != "3401"){
                        document.getElementById(itemTemp).src = "http://ddragon.leagueoflegends.com/cdn/9.23.1/img/item/"+itemID+".png";
                        }
                        else if(itemID == "3401"){
                            document.getElementById(itemTemp).src = "https://gamepedia.cursecdn.com/lolesports_gamepedia_en/8/8e/Remnant_and_Eye_of_the_Aspect.png?version=030ab6039f6b0bbbbf1b6e0b3220f205";
                        }
                        else{
                            document.getElementById(itemTemp).style.display = "none";
                        }
                    }
                    
                    
                    
                });
                
                    // function loading(){
                    //     document.getElementById("loadingGif").style.display = "none";
                    //     document.getElementById("run").innerText = "--LOADING--";
                        
                    // }
                    function calculate(){
                        realCalc();
                        
                    }
                    function realCalc(){
                         url = "http://ec2-18-191-68-76.us-east-2.compute.amazonaws.com/inDepthV2/LeagueJsonFiles/matchTimeline.JSON";
                
                $.get(url,{format:"json"},function(data){
                    var size = data.frames.length;
                    for(var i=0;i<size;i++){
                        totalGold =0;
                        avgXp =0;
                        for(var j =1;j<11;j++){
                            
                            totalGold = totalGold + data.frames[i].participantFrames[j].totalGold;
                            avgXp = avgXp + data.frames[i].participantFrames[j].xp;
                            
                            
                        }
                        xp = data.frames[i].participantFrames['5'].xp;
                        gold = data.frames[i].participantFrames['5'].totalGold;
                        addPointsGold(0,gold);
                        currentGold = data.frames[i].participantFrames['5'].currentGold;
                        
                        addPointsGold(4, currentGold);
                        addPointsGold(1,totalGold/10);
                        addPointsGold(2, xp);
                        addPointsGold(3,avgXp/10);
                        
                    }
                    
                    
                    
                });
                    document.getElementById("infoInGame").style.display = "block";
                    document.getElementById("run").style.display = "none";
                    document.getElementById("chartContainer").style.display = "block";
                    document.getElementById("chartContainerChamps").style.display = "block";
                        document.getElementById("goldChartContainer").style.display = "block";
                    
                    for(var i = 1;i<gamesPlayed-1;i++){
                        if(champsPlayed[i] == "111"){
                            champAmount[0]++;
                        }
                        if(champsPlayed[i] == "11"){
                            champAmount[2]++;
                        }
                        if(champsPlayed[i] == "518"){
                            champAmount[4]++;
                        }
                        if(champsPlayed[i] == "161"){
                            champAmount[1]++;   
                        }
                        if(champsPlayed[i] == "202"){
                            champAmount[3]++;
                        }
                    if(rolesPlayed[i] == "NONE"){
                        rolePlayRate[0] = rolePlayRate[0]+1;
                    }
                    if(rolesPlayed[i] == "DUO_SUPPORT"){
                        rolePlayRate[1] = rolePlayRate[1]+1;
                    }
                    if(rolesPlayed[i] == "SOLO"){
                        if(lanePlayed[i] == "MID"){
                            rolePlayRate[3] = rolePlayRate[3]+1;
                        }
                        if(lanePlayed[i] == "TOP"){
                            rolePlayRate[4] = rolePlayRate[4]+1;
                        }
                        
                    }
                    if(rolesPlayed[i] == "DUO_CARRY"){
                        rolePlayRate[2] = rolePlayRate[2]+1;
                    }
                       addPoints(0,(rolePlayRate[0]/(i))*100);
                        addPoints(1,(rolePlayRate[1]/(i))*100);
                        addPoints(2,(rolePlayRate[2]/(i))*100);
                        addPoints(3,(rolePlayRate[3]/(i))*100);
                        addPoints(4,(rolePlayRate[4]/(i))*100);
                        
                        
                    }
                    var max = 0;
                        var final;
                    for(var doop = 0; doop<5;doop++){
                        if(rolePlayRate[doop]>max){
                            max = rolePlayRate[doop];
                            final = doop;
                            
                        }
                    }
                        document.getElementById("videos").style.display = "block";     document.getElementById(final).style.display = "block";
                     chartChamps.options.data[0].dataPoints.push({label: mostPlayedChamps[0], y: champAmount[0]});
                        chartChamps.options.data[0].dataPoints.push({label: mostPlayedChamps[1], y: champAmount[1]});
                        chartChamps.options.data[0].dataPoints.push({label: mostPlayedChamps[2], y: champAmount[2]});
                        chartChamps.options.data[0].dataPoints.push({label: mostPlayedChamps[3], y: champAmount[3]});
                        chartChamps.options.data[0].dataPoints.push({label: mostPlayedChamps[4], y: champAmount[4]});
                        
                        chartChamps.render();
                    document.getElementById("itemHolder").style.display = "block";
                    document.getElementById("loadingGif").style.display = "none";
                }
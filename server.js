var express = require('express');
var http = require('http');
var path = require('path');
if (process.env.NODE_ENV !== 'production'){
  require('longjohn');
}

var app = express();

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));	
});

app.get("/userinfo", function(exReq, exRes) {        
	console.log("Started express request");	
	http.request({host: "api.steampowered.com", path: "/ISteamUser/GetPlayerSummaries/v0002/?key=XXXXXXXX&steamids=XXXXXXX", method: 'GET'}, function(nRes) {				
		var info = "";
		var infoParsed ="";
		console.log("Started player info request");	
		nRes.on('data', function(dataChunk) {                  
			info += dataChunk;
		});
		nRes.on('end', function() {
			infoParsed = JSON.parse(info); 			
			exRes.send(infoParsed);			
		})		
	}).end();	
});

app.get("/achievements/:appid", function (exReq, exRes) {
	console.log(exReq.params.appid);
	http.request({host: 'api.steampowered.com', path: '/ISteamUserStats/GetPlayerAchievements/v0001/?appid=' + exReq.params.appid + "&key=XXXXXXXX&steamid=XXXXXXXX", method: 'GET'}, function(nRes) {
			console.log("Started achievements request");
			var info = "";
			var infoParsed = "";
			nRes.on('data', function (dataChunk) {
					info += dataChunk;
			}),
			nRes.on('end', function() {
				infoParsed = JSON.parse(info);									
				exRes.send(infoParsed);											
			});				
		}).end();
});

app.get("/owned_games", function (exReq, exRes) {
	console.log(exReq.params.appid);
	http.request({host: 'api.steampowered.com', path: '/IPlayerService/GetOwnedGames/v0001/?key=XXXXXXXX&include_appinfo=1&steamid=XXXXXXXX&format=json', method: 'GET'}, function(nRes) {
			console.log("Started owned games request");
			var info = "";
			var infoParsed = "";
			nRes.on('data', function (dataChunk) {
					info += dataChunk;
			}),
			nRes.on('end', function() {
				infoParsed = JSON.parse(info);										
				exRes.send(infoParsed);											
			});				
		}).end();
});

var server = app.listen(3000);
console.log("Server running on port 3000");
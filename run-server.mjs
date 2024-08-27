
import { handler as ssrHandler } from './dist/server/entry.mjs';
import  notFound  from '.dist/client/404.html';
import gamesText from '.dist/client/games.txt';
import extraGames from '.dist/client/extra-games.txt'

const charsPerLine = 19

const url = window.location.href
const http = require("http")
const fs = require("fs");
const path = require("path")
const cleanInput = RegExp("([A-z]| |:)*","gm")
function combineIterator(thing){
  var returnString = ""
  for(let x = 0;thing.length>x;x++){
    returnString = returnString + thing[x]
  }
  console.log(returnString)
  return returnString
}
function get_wrap(url,headers) {
    console.log(url)
    let stuff = new Object();
    let options = {
      hostname: isolateDomain(url),
      port: 80,
      path: isolatePath(url),
      Headers:{
        headers
      },
    };
    return new Promise((resolve, reject) => {
    const req = http.get(options, function(res) {
      let code = res.statusCode
      let data = ""
      req.on("timeout",function(){
        throw new Error("timeout");
        //silly identation go brrrrrr
                                 })
      res.setEncoding("utf-8");
      res.on("data", function(chunk) {data=data+chunk});
      res.on("end", function(){
        stuff[1] = res.statusCode
        stuff[2] = res.headers
        stuff[3] = data
        resolve(stuff);
      })
      res.on("error", function(erm){
        throw new Error(erm)})
    })
    })
  }

  async function get(url) {
    try{dumb_shit = await await get_wrap(url)}catch(err){throw new Error(err)}
    return dumb_shit
  }

function search(queryThing){
  var query
  //we worship the perl gods, creators of the holy lookahead and lookbehind assertion
  if(queryThing.length>25){
    query = queryThing.substring(0,25) 
  }else{
    query = queryThing
  }
  queryCleaned = [...query.matchAll(cleanInput)]
  query = combineIterator(queryCleaned)
  var getIcon = RegExp('(?<="name" ?: ?")(?=' + query +')' + query + '(?="})')
  var getTitle = RegExp()
  var getDescription = RegExp()
  var thingToReturn = ["","",""]
  thingToReturn[0] = gamesText.matchAll(getIcon)
  thingToReturn[1] = gamesText.matchAll(getTitle)
  thingToReturn[2] = gamesText.matchAll(getDescription)
  return thingToReturn
}
function makeGameHtml(results){
  var resultsReal = JSON.parse(results)
  var thingToReturn = ""
  for (let x = 0;resultsReal["results"].length>x;x++) {
    thingToReturn = thingToReturn + "<div id='" + results[0] + "' name='" + results[0] + "' title='" + results[1] + "' class='game' style=backgroundImage:`url(https://metallic.eu.org" + results[0] + ")><div class='textContainerContainer'><div class='textContainer'><p class='gameDesc'>" + results[2].slice(charsPerLine, charsPerLine*2) + "</p><p class='gameDesc' id='gameDesc1'>" + results[2].slice(charsPerLine*2, charsPerLine*3) +"</p><p class='gameDesc' id='gameDesc2></p><p class='gameDesc' id='gameDesc3'>" + results[2].slice(charsPerLine*3,charsPerLine*4) +"</p></div></div></div>"
  }
  return thingToReturn
} 
handler.createServer(async function(request,response) {
    if(request.url.substring(0,10)="/gamesearch"){
        var query = request.url.substring(11)
        var domMods = search(query)
        //create a div with only the games with the ids in domMods, then set display auto and increase z index and add a background color so it will cover the other games 
        //(faster than deleting each non result div one by one)
        //this will be done on serverside, for maximum speed
        var thingToPass = '{"results":['
        for(let x = 0;domMods.length>x;x++){
          thingToPass = thingToPass + "'" + domMods[x] + "'," 
        }
        thingToPass = thingToPass.substring(0,thingToPass.length-1) + "]}"
        response.data = makeGameHtml(thingToPass)
        response.writeHead(200)
    }else{
      //serve 404 page
        response.data = notFound
        response.writeHead(404)
    }
}).listen(80)
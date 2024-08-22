import re2 from "re2"
import express from "express"

const http = require("http")
const fs = require("fs");
const path = require("path")

//todo: make the regex
const findGameInJson = ""
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

const gamesText = await get("https://cdn.jsdelivr.net/gh/Quartinal/CommanderRewrite@main/src/pages/games/games.json")
const games = gamesText.json()
http.createServer(async function(request,response) {
    if(request.url.substring(0,10)="/gamesearch"){
        var query = request.url.substring(11)
        var domMods = []
    }
})
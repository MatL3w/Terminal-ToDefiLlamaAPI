//modules 
const readline = require("node:readline");
const fs = require("node:fs");
const https = require("node:https");

//variables
let rl;
let inputData='';
let index;
const search=[
    {name:'protocols', function:protocolsInformation},
    {name:'chains', function:protocolsInformation}];

//CORE
introduction();
readingFromConsole(analyzeData);
//CORE

//Functions
function readingFromConsole(analyze) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "#",
    });
    rl.prompt();
   
    rl.on("line", (line) => {
      rl.prompt();
      inputData=line.trim();
        switch (inputData) {
        case "close":
          console.log("closing input stream");
          rl.exit();
          break;
        default:
            analyze();
          rl.prompt();
          break;
      }
    });
    // add event listner for closing streams and also process
    rl.on("close", () => {
      console.log("CLOSED");
      process.exit(0);
    });
  }
function introduction(){
    console.log("Scripts explore data about Cryptocurrency from DefiLlama.");
    console.log("Input Type of data to explore");
  }
function analyzeData(){
   if(!index){
    for(let i=0;i<search.length;i++){
        if(inputData===search[i].name){
        index=i;
        search[index].function();
        console.log('lol');
        };
    }}
    else{
        search[index].function();
    }
}   
function protocolsInformation(){


  }
function httpsGetFuntion(typeOfData){
    
}
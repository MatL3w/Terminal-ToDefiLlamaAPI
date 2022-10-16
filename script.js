//modules
const readline = require("node:readline");
const fs = require("node:fs");
const https = require("node:https");

//variables
let rl;
let inputData = "";

let index;
let strData = "";
let strDataParsed;
let nextData;
const search = [
  { name: "protocols", function: getInformation },
  { name: "chains", function: getInformation },
];

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
    inputData = line.trim();
    switch (inputData) {
      case "close":
        console.clear();
        console.log("closing input stream");
        rl.close();
        break;
        case "reset":
            console.log("reset");
            console.clear();
            reset();
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
function introduction() {
  console.log("Scripts explore data about Cryptocurrency from DefiLlama.");
  console.log("Input Type of data to explore");
}
function analyzeData() {
  if (index===undefined) {
    for (let i = 0; i < search.length; i++) {
      if (inputData === search[i].name) {
        index = i;
        search[index].function(saveDataToFile);
      }
    }
  } else {
    search[index].function(saveDataToFile);
  }
}
function getInformation(saveFunction) {
    if(!strData){
        httpsGetRequest(search[index].name, saveDataToFile);
        console.log(`Type next value`)
    }
    else{
        nextData=inputData;
        for(let i=0;i<strDataParsed.length;i++){
            if(strDataParsed[i].name===nextData){
                console.log(i);
                console.log(strDataParsed[i]);
                saveFunction(search[index].name+nextData,JSON.stringify(strDataParsed[i]));
            }
        }
        console.log(`Type value for: ${search[index].name}`);
    }
}
function httpsGetRequest(information, saveFunction) {
  const options = {
    hostname: "api.llama.fi",
    port: 443,
    path: `/${information}`,
    method: "GET",
  };
  https
    .request(options, (res) => {
      res.on("data", (chunk) => {
        strData += chunk;
      });
      res.on("end", () => {
        strDataParsed=JSON.parse(strData);
        saveFunction(information, strData);
      });
    })
    .end();
}
function saveDataToFile(filename, content) {
  fs.writeFile(filename, content, (err) => {
    if (err) throw err;
  });
}
function reset(){
    index=undefined;
    strData = '';
    strDataParsed=undefined;
    nextData='';
    introduction();
}
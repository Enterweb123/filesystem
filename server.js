const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const listenPort = process.env.PORT || 4000;


const homefilepath = path.resolve(__dirname,"home.html");
app.set(express.static("./files"));
app.get("/",(req,res)=>{
    res.sendFile(homefilepath);
    console.log("home");
});

app.get("/create", (req,res)=>{
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const newDate = new Date();
    const mydate = newDate.getDate();
    const myyear = newDate.getFullYear();
    const thisMonth = newDate.getMonth();
    var AmPm = "";
    var ThisHour = newDate.getHours();
        ThisHour = ThisHour > 12 ? ThisHour-12 : ThisHour;
        AmPm = ThisHour >= 12 ? "AM" : "PM"; 
    const ThisMin = newDate.getMinutes();
    const ThisSec = newDate.getSeconds();
    const today = `${mydate}${month[thisMonth]}${myyear}`;
    const todayTime = `${ThisHour}Hour:${ThisMin}Min:${ThisSec}Sec:${AmPm}`;

    res.send("file Create");
    fs.writeFile(`files/${today}.txt`,todayTime,(er)=>{
        if(er){
            console.log(er);
        } else {
            console.log("created");
        }
      })
   });

   app.get("/view",(req,res)=>{
    fs.readdir("files",(err, files)=>{
        if(err){
            console.log(err);
        }
        else{
            files.forEach((file)=>{
            fs.readFile(`files/${file}`,"utf-8",(err ,data)=>{
                if(err){
                    console.log(err);
                }
                else{
            res.write(`<div>
           filename :<h1>${file}</h1>
           <br>
           file data :<h1>${data}</h1>
            </div>`)
            res.end;
                }                    
                })
             })
            
        }
    })
})
app.get("*",(req,res)=>{
    res.send("404 file not found")
})
app.listen(listenPort,()=>{
    console.log("server live on succcesfully");
})

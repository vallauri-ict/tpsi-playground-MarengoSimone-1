import * as _http from "http";
import express from "express";
import HEADERS from "./headers.json";

let port : number = 1337;
let app = express();

let server = _http.createServer(app);

server.listen(port,function(){
    console.log("server in ascolto sulla porta: " + port);
});

// Elenco delle Routes (listeners)
app.use("*", function (req, res, next) {
    console.log(" -----> " + req.method + ":" + req.originalUrl);
    next(); 
});

app.get("*",function(req,res,next){
    res.send("this is the response");
});



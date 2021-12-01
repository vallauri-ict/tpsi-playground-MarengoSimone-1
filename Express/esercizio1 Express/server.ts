import * as http from "http";
import express from "express";
import * as fs from "fs";
import * as bodyParser from "body-parser";
import HEADERS from "./headers.json";

let port : number = 1337;
let app = express();

let server = http.createServer(app);

server.listen(port,function(){
    console.log("server in ascolto sulla porta: " + port);
    init();
});

let paginaErrore = "";
function init(){
    fs.readFile("./static/error.html",function(err,data){
        if(!err){
            paginaErrore = data.toString();
        }
        else{
            paginaErrore = "<h2> Risorsa non trovata </h2>";
        }
    });
}

// **********************************************************************
// Elenco delle routes di tipo Middleware
// ***********************************************************************
// 1. log
app.use("/", function (req, res, next) {
    console.log(" -----> " + req.method + ":" + req.originalUrl);
    next(); 
});

// 2. static route
// esegue il next automaticamente quando non trova la risorsa
app.use("/", express.static("./static"));

// 3. route di lettura parametri post
app.use("/", bodyParser.json()); // intercetta i parametri in formato json
app.use("/", bodyParser.urlencoded({"extended":true})); // parametri body

// 4. log dei parametri
app.use("/",function(req,res,next){
    if(Object.keys(req.query).length > 0){
        console.log("Parametri GET: ",req.query);
    }

    if(Object.keys(req.body).length > 0){
        console.log("Parametri BODY: ",req.body);
    }
    next();
});


// **********************************************************************
// Elenco delle routes di risposta al client
// ***********************************************************************
app.get("/api/risorsa1",function(req,res,next){
    let nome = req.query.nome;
    res.send({"nome":nome});
});

app.post("/api/risorsa1",function(req,res,next){
    let nome = req.body.nome;
    res.send({"nome":nome});
});


// **********************************************************************
// Default route (risorsa non trovata) e route di gestione degli errori 
// ***********************************************************************
app.use("/", function (req, res, next) {
    res.status(404);
    if(req.originalUrl.startsWith("/api/")){
        res.send("Servizio non trovato!");
    }
    else{
        res.send(paginaErrore);
    }
    next(); 
});
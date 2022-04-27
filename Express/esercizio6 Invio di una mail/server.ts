import * as http from "http";
import * as fs from "fs";
import express from "express";
import * as bodyParser from "body-parser";
import * as _mongodb from "mongodb";
import cors from "cors";
import nodemailer from "nodemailer";
import ENVIRONMENT from "./environment.json";

// MongoDB
const mongoClient = _mongodb.MongoClient;
const CONNECTIONSTRING = process.env.MONGODB_URI || "mongodb+srv://simone:admin@cluster0.kmj18.mongodb.net/5B?retryWrites=true&w=majority" // heroku app
const DB_NAME = "recipeBook";

// se la prima variabile esiste assegna quel valore, altrimenti mette 1337
let port : number = parseInt(process.env.PORT) || 1337
let app = express();

let server = http.createServer(app);

server.listen(port,function(){
    console.log("server in ascolto sulla porta: " + port);
    init();
});

let paginaErrore = "";
let message = "";

function init(){
    fs.readFile("./static/error.html",function(err,data){
        if(!err){
            paginaErrore = data.toString();
        }
        else{
            paginaErrore = "<h2> Risorsa non trovata </h2>";
        }
    });

    fs.readFile("./message.html",function(err,data){
        if(!err){
            message = data.toString();
        }
    });
}

// **********************************************************************
// Elenco delle routes di tipo Middleware
// **********************************************************************
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
        console.log("      Parametri GET: ",req.query);
    }
    if(Object.keys(req.body).length > 0){
        console.log("      Parametri BODY: ",req.body);
    }
    next();
});

// 5. middleware cors, accetta tutte le richieste
const corsOptions = {
    origin: function(origin, callback) {
    return callback(null, true);
    },
    credentials: true
};
app.use("/", cors(corsOptions));

// **********************************************************************
// Elenco delle routes di risposta al client
// **********************************************************************
let transporter = nodemailer.createTransport({"service":"gmail",
                                            "auth":ENVIRONMENT.MAILCREDENTIALS});
app.post("/api/newMail",function(req,res,next){
    let msg = message.replace("__user","pippo").replace("__password","pippo");
    let mailOptions = {
        "from":ENVIRONMENT.MAILCREDENTIALS.user,
        "to":req.body.to,
        "subject":req.body.subject,
        // "text":msg non fa la formattazione html
        "html":msg, // formatta l'html
        "attachments":[{"filename":"qrCde.png","path":"./qrCode.png"}] // inseriamo degli allegati
    }
    transporter.sendMail(mailOptions,function(err,data){
        if(!err){
            console.log("ok");
            res.send({"ris":"ok"});
        }
        else{
            res.status(500).send("Errore invio mail: " + err.message);
        }
    })
});

// **********************************************************************
// Default route (risorsa non trovata) e route di gestione degli errori 
// **********************************************************************
app.use("/", function (req, res, next) {
    res.status(404);
    if(req.originalUrl.startsWith("/api/")){
        res.send("Risorsa non trovata");
    }
    else{
        res.send(paginaErrore);
    }
});

app.use(function(err, req, res, next) {
    console.log("*************** ERRORE CODICE SERVER",err.stack, "***************");
});
import * as http from "http";
import * as fs from "fs";
import express from "express";
import * as bodyParser from "body-parser";

// MongoDB
import * as _mongodb from "mongodb";
const mongoClient = _mongodb.MongoClient;
//const CONNECTIONSTRING = "mongodb://127.0.0.1:27017"; accesso locale
// accesso ad Atlas:
const CONNECTIONSTRING = "mongodb+srv://simone:admin@cluster0.kmj18.mongodb.net/5B?retryWrites=true&w=majority"
const DB_NAME = "unicorns";


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

// **********************************************************************
// Elenco delle routes di risposta al client
// **********************************************************************
// middleware di apertura della connessione
app.use("/",function(req,res,next){
    mongoClient.connect(CONNECTIONSTRING,function(err,client){
        if(err){
            res.status(503).send("Errore nella connessione al DB");
        }
        else{
            console.log("Connected succesfully");
            req["client"] = client;
            next();
        }
    });
});

// lettura delle collezioni presenti nel DB
app.use("/api/getCollections",function(req,res,next){
    let db = req["client"].db(DB_NAME) as _mongodb.Db;
    let request = db.listCollections().toArray();
    request.then(function(data){
        res.send(data);
    });
    request.catch(function(err){
        res.status(503).send("Errore esecuzione query");
    })
    request.finally(function(){
        req["client"].close();
    })
});

// middleware di intercettazione dei parametri
let currentCollection = "";
let id = "";
app.use("/api/:collection/:id?",function(req,res,next){
    currentCollection = req.params.collection;
    id = req.params.id;
    next();
});


// listener specifici:
app.get("/api/*",function(req,res,next){
    let db = req["client"].db(DB_NAME) as _mongodb.Db;
    let collection = db.collection(currentCollection);
    if(!id)
    {
        let request = collection.find().toArray();
        request.then(function(data){
            res.send(data);
        });
        request.catch(function(err){
            res.status(503).send("Errore esecuzione query");
        })
        request.finally(function(){
            req["client"].close();
        })
    }
    else
    {
        let oId = new _mongodb.ObjectId(id);
        let request = collection.find({"_id":oId}).toArray();
        request.then(function(data){
            res.send(data);
        });
        request.catch(function(err){
            res.status(503).send("Errore esecuzione query");
        })
        request.finally(function(){
            req["client"].close();
        })
    }
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
    console.log("Errore codice server",err.message)
});
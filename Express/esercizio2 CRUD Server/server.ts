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



app.get("/api/servizio1",function(req,res,next){
    let unicorn = req.query.nome;
    if(unicorn)
    {
        let db = req["client"].db(DB_NAME) as _mongodb.Db;
        let collection = db.collection("unicorns");
        let request = collection.find({"name":unicorn}).toArray();
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
        res.status(400).send("Parametro mancante: UnicornName");
        req["client"].close();
    }
});

app.patch("/api/servizio2",function(req,res,next){
    let unicorn = req.body.nome;
    let incVampires = req.body.vampires;
    if(unicorn && incVampires)
    {
        let db = req["client"].db(DB_NAME) as _mongodb.Db;
        let collection = db.collection("unicorns");
        let request = collection.updateOne({"name":unicorn},{$inc:{vampires:incVampires}});
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
        res.status(400).send("Parametro mancante: name o vampires");
        req["client"].close();
    }
});

app.get("/api/servizio3/:gender/:hair",function(req,res,next){
    let gender = req.params.gender;
    let hair = req.params.hair;
    // la if sull'esistenza dei parametri non serve perchè
    // se non c'è un match esatto nell'url non entra neanche nel servizio
        let db = req["client"].db(DB_NAME) as _mongodb.Db;
        let collection = db.collection("unicorns");
        let request = collection.find({"$and":[{"gender":gender},{"hair":hair}]}).toArray();
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
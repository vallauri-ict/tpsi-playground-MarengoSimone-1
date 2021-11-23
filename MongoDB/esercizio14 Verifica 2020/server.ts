import * as _http from "http"
import { Dispatcher } from "./dispatcher";
import HEADERS from "./headers.json";
let port : number = 1337;
import * as _mongodb from "mongodb";
const mongoClient = _mongodb.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";
const DB_NAME = "5B";

let dispatcher = new Dispatcher();

let server = _http.createServer(function(req,res){
    dispatcher.dispatch(req,res);
})
server.listen(port);
console.log("server in ascolto sulla porta: " + port);

// Registrazione dei servizi
dispatcher.addListener("POST","/api/servizio1",function(req,res) {
    let dataStart = new Date(req["BODY"].dataStart);
    let dataEnd = new Date(req["BODY"].dataEnd);

    // Query 1:
    mongoClient.connect(CONNECTIONSTRING,function(err,client){
        if(!err){
            let db = client.db(DB_NAME);
            let collection = db.collection("vallauri");
            collection.find({"$and":[{"dob":{"$gte":dataStart,"$lte":dataEnd}}]})
            .project({"nome":1, "classe":1})
            .toArray(function(err,data){
                if(!err){
                    res.writeHead(200, HEADERS.json);
                    res.write(JSON.stringify(data));
                    res.end();
                }
                else{
                    res.writeHead(500, HEADERS.text);
                    res.write("Errore esecuzione della query");
                    res.end();
                }
                client.close();
            });
        }
        else{
            console.log("Errore nella connessione al DB " + err.message);
        }
    });
})


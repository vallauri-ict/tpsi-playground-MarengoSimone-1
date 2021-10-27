import * as _http from "http"
import { Dispatcher } from "./dispatcher";
import HEADERS from "./headers.json";
import * as _mongodb from "mongodb";
const mongoClient = _mongodb.MongoClient;
const port : number = 1337; // node js

const dispatcher : Dispatcher = new Dispatcher();

const server = _http.createServer(function(req,res){
    dispatcher.dispatch(req,res);
})
server.listen(port);
console.log("server in ascolto sulla porta: " + port);

// -------------------------
// Registrazione dei servizi:
// --------------------------

// Inserimento di un nuovo record
mongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
    if(!err){
        let db = client.db("5B_Studenti");
        let collection = db.collection("Studenti");
        let student = {"nome":"Giovanni","hobbies":["nuoto","padel"],"cognome":"Lorenzi","residenza":{"citta":"Genola","provincia":"CN","CAP":"12045"},"indirizzo":"Informatica","sezione":"B","lavoratore":false};
        collection.insertOne(student,function(err,data){
            if(!err){
                console.log(data);
            }
            else{
                console.log("Errore esecuzione query " + err.message);
            }
            client.close();
        });
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});

// Modello di accesso al database
mongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
    if(!err){
        let db = client.db("5B_Studenti");
        let collection = db.collection("Studenti");
        collection.find().toArray(function(err,data){
            if(!err){
                console.log(data);
            }
            else{
                console.log("Errore esecuzione query " + err.message);
            }
            client.close();
        });
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});
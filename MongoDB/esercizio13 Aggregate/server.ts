import * as _http from "http"
import { Dispatcher } from "./dispatcher";
import HEADERS from "./headers.json";
import * as _mongodb from "mongodb";
const mongoClient = _mongodb.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";
const DB_NAME = "5B";

// Query 1:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("orders");
        // i nomi dei campi devono essere preceduti da "$" se sono usati come valore;
        // se sono come chiave (a sinistra) non ci va il $;
        //
        // dopo aver fatto i gruppi con $group il recordset risultante ha solo 2 colonne
        // che sono _id e totale, tutti gli altri campi non sono visibili
        let req = collection.aggregate([
            {"$match":{"status":"A"}},
            {"$group":{"_id":"$cust_id", "totale":{"$sum":"$amount"}}},
            {"$sort":{"totale":-1}}
        ]).toArray();
        req.then(function(data){
            console.log("Query 1",data);
        });
        req.catch(function(err){
            console.log("Errore esecuzione query " + err.message);
        })
        req.finally(function(){
            client.close();
        })
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});

// Query 2:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("orders");
        let req = collection.aggregate([
            {"$group":{
                "_id":"$cust_id", 
                "avgAmount":{"$avg":"$amount"},
                "avgTotal":{"$avg":{"$multiply":["$qta","$amount"]}}
            }}
        ]).toArray();
        req.then(function(data){
            console.log("Query 2",data);
        });
        req.catch(function(err){
            console.log("Errore esecuzione query " + err.message);
        })
        req.finally(function(){
            client.close();
        })
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});


// Query 3
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        let req = collection.aggregate([{"$match" : {"gender" : {$exists : true}}},{$group:{"_id":"$gender","totale" : {"$sum" : 1}}}]).toArray();
        req.then(function(data){
            console.log("Query 3",data);
        });
        req.catch(function(err){
            console.log("Errore esecuzione query " + err.message);
        })
        req.finally(function(){
            client.close();
        })
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});

// Query 4:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        let req = collection.aggregate([
            {"$match":{"gender":{"$exists":true}}},
            { "$group":{
                "_id":{"gender":"$gender"}, // indica il campo su cui vogliamo fare i gruppi
                "mediaVampiri":{"$avg":"$vampires"}
            }}
        ]).toArray();
        req.then(function(data){
            console.log("Query 4",data);
        });
        req.catch(function(err){
            console.log("Errore esecuzione query " + err.message);
        })
        req.finally(function(){
            client.close();
        })
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});

// Query 5:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        let req = collection.aggregate([
            {"$match":{"gender":{"$exists":true}}},
            { "$group":{
                "_id":{"gender":"$gender","hair":"$hair"},
                "nEsemplari":{"$sum":1}
            }},
            {"$sort":{"nEsemplari":-1,"_id":-1}}
        ]).toArray();
        req.then(function(data){
            console.log("Query 5",data);
        });
        req.catch(function(err){
            console.log("Errore esecuzione query " + err.message);
        })
        req.finally(function(){
            client.close();
        })
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});




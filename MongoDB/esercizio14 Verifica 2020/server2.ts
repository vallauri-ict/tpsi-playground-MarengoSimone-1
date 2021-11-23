import * as _http from "http"
let port : number = 1337;
import * as _mongodb from "mongodb";
const mongoClient = _mongodb.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";
const DB_NAME = "5B";

// Query 2:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("vallauri");
        let req = collection.aggregate([
            {"$project":{
                "nome":1, "classe":1, "_id":0,
                "mediaIta":{"$avg":"$italiano"},
                "mediaMate":{"$avg":"$matematica"},
                "mediaInfo":{"$avg":"$informatica"},
                "mediaSistemi":{"$avg":"$sistemi"},
            }},
            {
                "$project":{
                    "nome":1,"classe":1,
                    "mediaStudente":{"$avg":["$mediaIta","$mediaMate","$mediaInfo","$mediaSistemi"]}
                }
            },
            {"$group":{"_id":"$classe","mediaClasse":{"$avg":"$mediaStudente"}}},
            {"$sort":{"mediaClasse":-1}},
            { "$project":{
                "mediaClasse":{"$round":["$mediaClasse",2]}
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

// Query 3:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("vallauri");
        let req = collection.updateMany(
            {"genere":"f","classe":"4A"},{"$push":{"informatica":7 as never}}
        );
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
        let collection = db.collection("vallauri");
        let req = collection.deleteMany(
            {"classe":"3B","sistemi":{"$in":[3]}}
        );
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
        let collection = db.collection("vallauri");
        let req = collection.aggregate([
            {"$group":{"_id":"$classe","totAssenze":{"$sum":"$assenze"}}},
            {"$sort":{"totAssenze":-1}}
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
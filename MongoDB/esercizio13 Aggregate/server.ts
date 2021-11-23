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

// Query 6:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        let req = collection.aggregate([
            { "$group":{
                "_id":{},
                "media":{"$avg":"$vampires"}
            }},
            {"$project":{"_id":0,"ris":{"$round":"$media"}}}
        ]).toArray();
        req.then(function(data){
            console.log("Query 6",data);
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

// Query 7:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("quizzes");
        let req = collection.aggregate([
            // le funzioni di aggregazione usate dentro project lavorano solo
            // sui campi dei singoli record (in orizzontale)
            { "$project":{
                "quizAvg":{"$avg":"$quizzes"},
                "labAvg":{"$avg":"$labs"},
                "examAvg":{"$avg":["$midterm","$final"]}
            }},
            {  "$project":{
                "quizAvg":{"$round":["$quizAvg",1]},
                "labAvg":{"$round":["$labAvg",1]},
                "examAvg":{"$round":["$examAvg",1]},
            }},
            { "$group":{
                "_id":{},
                "mediaQuiz":{"$avg":"$quizAvg"},
                "mediaLab":{"$avg":"$labAvg"},
                "mediaExam":{"$avg":"$examAvg"},
            }},
            {  "$project":{
                "mediaQuiz":{"$round":["$mediaQuiz",2]},
                "mediaLab":{"$round":["$mediaLab",2]},
                "mediaExam":{"$round":["$mediaExam",2]},
            }}
        ]).toArray();
        req.then(function(data){
            console.log("Query 7",data);
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

// Query 8:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("students");
        let regex = new RegExp("F","i"); // sia f che F
        let req = collection.aggregate([
            {"$match":{"genere":{"$regex":regex}}},
            {"$project":{"nome":1,"genere":1,"media":{"$avg":"$voti"}}},
            {"$sort":{"media":-1}},
            {"$skip":1}, // salto il primo
            {"$limit":1} // prendo il primo (che equivale al secondo)
        ]).toArray();
        req.then(function(data){
            console.log("Query 8",data);
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

// Query 9:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("orders");
        let req = collection.aggregate([
            {"$project":{"status":1,"nDettagli":1}},
            {"$unwind":"$nDettagli"},
            {"$group":{"_id":"$status","sommaDettagli":{"$sum":"$nDettagli"}}}
        ]).toArray();
        req.then(function(data){
            console.log("Query 9",data);
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

// Query 10:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("students");
        let req = collection.find(
            {"$expr":{"$gte":[{"$year":"$nato"},2000]}}
        ).toArray();
        req.then(function(data){
            console.log("Query 10",data);
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

// Query 11:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        let req = collection.aggregate([
            {"$match":{"gender":{"$exists":true}}},
            {"$group":{"_id":"$gender","mediaPeso":{"$avg":"$weight"}}},
        ]).toArray();
        req.then(function(data){
            console.log("Query 11",data);
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

// Query 12:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        let req = collection.aggregate([
            {"$match":{"loves":{"$in":["apple"]}}},
            {"$group":{"_id":"$gender","kills":{"$sum":"$vampires"}}},
        ]).toArray();
        req.then(function(data){
            console.log("Query 12",data);
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

// Query 13:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        let req = collection.aggregate([
            {"$project":{"loves":1}},
            {"$unwind":"$loves"},
            {"$group":{"_id":"$loves", "totale":{"$sum":1}}},
            {"$sort":{"totale":-1}}
        ]).toArray();
        req.then(function(data){
            console.log("Query 13",data);
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

// Query 14:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("students");
        let req = collection.aggregate([
            {"$project":{"nome":1,"classe":1,"media":{"$avg":"$voti"}}},
            {"$group":{"_id":"$classe","mediaClasse":{"$avg":"$media"}}},
            {"$match":{"$expr": {"$gt": ["$mediaClasse",6]}}},
            {"$sort":{"mediaClasse":-1}}
        ]).toArray();
        req.then(function(data){
            console.log("Query 14",data);
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

// Query 15:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("students");
        let req = collection.aggregate([
            //{"$project":{"nome":1,"classe":1,"nato":1}}
            {"$match":{"$expr":{"$lt":[{"$year":"$nato"},2004]}}}
        ]).toArray();
        req.then(function(data){
            console.log("Query 15",data);
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

// Query 16
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("students");
        let req = collection.aggregate([
            {"$match":{"$expr":{"$eq":[{"$year":"$nato"},2000]}}}
        ]).toArray();
        req.then(function(data){
            console.log("Query 16",data);
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




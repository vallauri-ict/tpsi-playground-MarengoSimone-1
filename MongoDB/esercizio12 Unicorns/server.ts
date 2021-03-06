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
        let collection = db.collection("unicorns");
        collection.find({"weight":{"$lte":800,"$gte":700}}).toArray(function(err,data){
            if(!err){
                console.log("Query 1",data);
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

// Query 1b: [CON LE PROMISE]
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        let req = collection.find({"weight":{"$lte":800,"$gte":700}}).toArray();
        req.then(function(data){
            console.log("Query 1b",data);
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
        let collection = db.collection("unicorns");
        collection.find({"$and":[{"gender":'m'},{"loves":{"$in":["grape","apple"]}},{"vampires":{"$gt":60}}]}).toArray(function(err,data){
            if(!err){
                console.log("Query 2",data);
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

// Query 3:
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({"$or":[{"gender":"f"},{"weight":{"$lte":700}}]}).toArray(function(err,data){
            if(!err){
                console.log("Query 3",data);
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

// Query 4
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({"$and":[{"loves":{"$in":["apple","grape"]}},{"vampires":{"$gte":60}}]}).toArray(function(err,data){
            if(!err){
                console.log("Query 4",data);
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

// Query 5
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({"loves":{"$all":["watermelon","grape"]}}).toArray(function(err,data){
            if(!err){
                console.log("Query 5",data);
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

// Query 6
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({"$or":[{"hair":"brown"},{"hair":"grey"}]}).toArray(function(err,data){
            if(!err){
                console.log("Query 6",data);
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

// Query 7
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({"$and":[{"vaccinated":{"$exists":true}},{"vaccinated":true}]}).toArray(function(err,data){
            if(!err){
                console.log("Query 7",data);
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

// Query 8
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({"$and":[{"loves":{"$nin":["apple"]}},{"gender":"m"}]}).toArray(function(err,data){
            if(!err){
                console.log("Query 8",data);
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

// Query 9
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        let regex = new RegExp("^A","i"); // inizia con A oppure a ( grazie a parametro i)
        collection.find({"$and":[{"name":{"$regex":regex}},{"gender":"f"}]}).toArray(function(err,data){
            if(!err){
                console.log("Query 9",data);
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

// Query 10
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({_id:new _mongodb.ObjectId('6182394f953313ab8531b409')}).toArray(function(err,data){
            if(!err){
                console.log("Query 10",data);
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

// Query 11a
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({"gender":"m"}).project({"name":1,"_id":0,"vampires":1}).toArray(function(err,data){
            if(!err){
                console.log("Query 11a",data);
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

// Query 11b
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        // sort = -1 ordine decrescente
        collection.find({"gender":"m"}).project({"name":1,"_id":0,"vampires":1}).sort({"vampires":-1,"name":1}).toArray(function(err,data){
            if(!err){
                console.log("Query 11b",data);
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

// Query 11c
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({"gender":"m"}).project({"name":1,"_id":0,"vampires":1}).sort({"vampires":-1,"name":1}).limit(3).toArray(function(err,data){
            if(!err){
                console.log("Query 11c",data);
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

// Query 12
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({"weight":{"$gt":500}}).count(function(err,data){
            if(!err){
                console.log("Query 12",data);
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

// Query 13
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.findOne({"name":"Aurora"},{"projection":{"weight":1,"hair":1}},function(err,data){
            if(!err){
                console.log("Query 13",data);
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

// Query 14
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.distinct("loves",{"gender":"f"},function(err,data){
            if(!err){
                console.log("Query 14",data);
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

// Query 15
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.insertOne({"name":"Apollo","gender":"f","loves":["apple","lemon"]},function(err,data){
            if(!err){
                console.log("Query 15",data);
                collection.deleteMany({"name":"Apollo"},function(err,data){
                    if(!err)
                    {
                        console.log("Query 15b",data);
                    }
                    else
                    {
                        console.log("Errore esecuzione query " + err.message);
                    }
                    client.close(); // va messo sempre nella query pi?? interna
                });
            }
            else{
                console.log("Errore esecuzione query " + err.message);
            }
        });
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});

// Query 16
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        // terzo parametro {upsert:true} -> se il record da aggiornare non esiste
        // viene creato automaticamente
        collection.updateOne({"name":"Pilot"},{$inc: {"vampires":1}},function(err,data){
            if(!err){
                console.log("Query 16",data);
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

// Query 17
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.updateOne({"name":"Aurora"},{"$addToSet":{"loves":"carrot"},"$inc":{weight:10}},function(err,data){
            if(!err)
            {
                console.log("Query 17",data);
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

// Query 18
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.updateOne({"name":"Pluto"},{"$inc":{"vampires":1}},{"upsert":true},function(err,data){
            if(!err)
            {
                console.log("Query 18",data);
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

// Query 19
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.updateMany({"vaccinated":{"$exists":false}},{"$set":{"vaccinated":true}},function(err,data){
            if(!err)
            {
                console.log("Query 19",data);
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

// Query 20
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.deleteMany({"loves":{"$all":["carrot","grape"]}},function(err,data){
            if(!err)
            {
                console.log("Query 20",data);
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

// Query 21
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({"gender":"f"}).sort({"vampires":-1}).limit(1).project({"name":1,"vampires":1,"_id":0}).toArray(function(err,data){
            if(!err)
            {
                console.log("Query 21",data);
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

// Query 21b
// si pu?? mettere la projection come secondo parametro nella find anzich?? scrivere .project()
// nel caso della findOne ?? OBBLIGATORIO mettere projection come parametro nella find
/*
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.find({"gender":"f"},{"projection":{"name":1,"vampires":1,"_id":0}}).sort({"vampires":-1}).limit(1).toArray(function(err,data){
            if(!err)
            {
                console.log("Query 21",data);
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
});*/

// Query 22
// replaceOne() cancella tutti i dati tranne l'id, inserisce solo quelli che mettiamo noi
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DB_NAME);
        let collection = db.collection("unicorns");
        collection.replaceOne({"name":"Pluto"},{"name":"Pluto","residenza":"Fossano","loves":["cocoa"]},{"upsert":true},function(err,data){
            if(!err)
            {
                console.log("Query 22",data);
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

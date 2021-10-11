import * as _http from "http"
let HEADERS = require("./headers.json");
let dispatcher = require("./dispatcher.ts");
let persons = require("./persons");
let port : number = 1337;

let server = _http.createServer(function(req,res){
    dispatcher.dispatch(req,res);
})
server.listen(port);
console.log("server in ascolto sulla porta: " + port);

// -------------------------
// Registrazione dei servizi:
// --------------------------
dispatcher.addListener("GET","/api/nazioni",function(req,res) {
    res.writeHead(200, HEADERS.json);
    let nazioni = [];
    for (const person of persons["results"]) {
        if(!nazioni.includes(person.location.country)){
            nazioni.push(person.location.country);
        }
    }
    nazioni.sort(); // ordina il vettore
    res.write(JSON.stringify({"nazioni":nazioni}));
    res.end();
})

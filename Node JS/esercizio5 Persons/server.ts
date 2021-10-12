import * as _http from "http"
import { json } from "stream/consumers";
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
    let nazioni = [];
    for (const person of persons["results"]) {
        if(!nazioni.includes(person.location.country)){
            nazioni.push(person.location.country);
        }
    }
    nazioni.sort(); // ordina il vettore
    res.writeHead(200, HEADERS.json);
    res.write(JSON.stringify({"nazioni":nazioni}));
    res.end();
})

dispatcher.addListener("GET","/api/persone",function(req,res) {
    let nazione : string = req["GET"].nazione;
    let persone : object[] = [];
    for (const person of persons["results"]) {
        if(person.location.country == nazione)
        {
            let jsonPerson : object = {
                "name": person.name.title + " " + person.name.first + " " + person.name.last,
                "city":person.location.city,
                "state":person.location.state,
                "cell":person.cell
            }
            persone.push(jsonPerson);
        }
    }
    res.writeHead(200, HEADERS.json);
    res.write(JSON.stringify(persone));
    res.end();
})

dispatcher.addListener("GET","/api/dettagli",function(req,res) {
    let persona = req["GET"].persona;
    let jsonDettagli = {};
    for (const person of persons["results"]) {
        let name = person.name.title + " " + person.name.first + " " + person.name.last
        if(persona == name)
        {
            jsonDettagli = {
                "img": person.picture.thumbnail,
                "name": person.name.title + " " + person.name.first + " " + person.name.last,
                "gender":person.gender,
                "address":person.location,
                "email":person.email,
                "dob": person.dob
            };
        }
    }
    res.writeHead(200, HEADERS.json);
    res.write(JSON.stringify(jsonDettagli));
    res.end();
})


dispatcher.addListener("DELETE","/api/elimina",function(req,res) {
    let persona = req["BODY"].persona;
    
    for (const person of persons["results"]) {
        let name = person.name.title + " " + person.name.first + " " + person.name.last
        if(persona == name)
        {
            ///// DELETE
        }
    }
    res.writeHead(200, HEADERS.json);
    res.write(JSON.stringify({"ris":"ok"}));
    res.end();
})

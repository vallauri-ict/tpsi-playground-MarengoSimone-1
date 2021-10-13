import * as _http from "http"
import {HEADERS} from "./headers";
import {Dispatcher} from "./dispatcher";
import {persons} from "./persons";
let port : number = 1337;

let dispatcher : Dispatcher = new Dispatcher();

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

dispatcher.addListener("PATCH","/api/dettagli",function(req,res) {
    let persona = req["BODY"].persona;
    let trovato = false;
    let person;
    for (person of persons["results"]) {
        let name = person.name.title + " " + person.name.first + " " + person.name.last
        if(persona == name)
        {
            trovato = true;
            break;
        }
    }
    if(trovato)
    {
        res.writeHead(200, HEADERS.json);
        res.write(JSON.stringify(person));
        res.end();
    }
    else
    {
        res.writeHead(404, HEADERS.text);
        res.write("Persona non trovata");
        res.end();
    }
})


dispatcher.addListener("DELETE","/api/elimina",function(req,res) {
    let persona = req["BODY"].persona;
    let trovato = false;
    let i;

    for (i = 0; i < persons.results.length; i++) {
        let name = persons.results[i].name.title + " " + persons.results[i].name.first + " " + persons.results[i].name.last
        if(persona == name)
        {
            trovato = true;
            break;
        }
    }
    if(trovato)
    {
        persons.results.splice(i,1);
        res.writeHead(200, HEADERS.json);
        res.write(JSON.stringify("Persona eliminata correttamente"));
        res.end();
    }
    else
    {
        res.writeHead(404, HEADERS.text);
        res.write("Persona non trovata");
        res.end();
    }  
})

import { json } from 'stream/consumers';
import radios from './radios.json';
import states from "./states.json";
import * as _fs from 'fs';
import * as _mime from 'mime';
import * as _http from "http"
import {HEADERS} from "./headers";
import {Dispatcher} from "./dispatcher";
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
dispatcher.addListener("GET","/api/update",function(req,res) {
    for (const state of states) {
        let num = 0;
        state.stationcount = num.toString();
    }
    for (const radio of radios) {
        for (const state of states) {
            if(radio.state == state.name)
            {
                let count = parseInt(state.stationcount);
                count++;
                state.stationcount = count.toString();
            }
        }
    }
    _fs.writeFile("./states.json", JSON.stringify(states), function (err) {
        if (err) {
          res.writeHead(404, HEADERS.text);
          res.write(err);
        }
        else {
          res.writeHead(200, HEADERS.json);
          res.write(JSON.stringify("Json salvato correttamente su disco"));
        }
        res.end();
    })
});

dispatcher.addListener("GET","/api/elenco",function(req,res) {
    res.writeHead(200,HEADERS.json);
    res.write(JSON.stringify(states));
    res.end();
});
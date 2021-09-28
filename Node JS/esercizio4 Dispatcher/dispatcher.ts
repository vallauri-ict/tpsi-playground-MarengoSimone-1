import * as _http from "http"
import * as _url from "url"
import * as _fs from "fs"
import * as _mime from "mime"
let HEADERS = require("./headers.json");
let paginaErrore : string;

class Dispatcher {  
    prompt:string = ">>>"
    // ogni listener è costituito da un JSON del tipo
    // {"risorsa":"callback"}
    // I listener sono suddivisi in base al metodo di chiamata  
    listeners:any = {            
        "GET": { /* "risorsa1":"callback1", "risorsa2":"callback2" */ },
        "POST": {},            
        "DELETE": {},            
        "PUT": {},            
        "PATCH": {}      
    }      
    constructor() {
              
    }  
    // metodo che consente di aggiungere un listener al vettore listeners
    addListener(metodo:string, risorsa:string, callback:any){
        metodo = metodo.toUpperCase();
        /*if(this.listeners[metodo]){}*/
        if(metodo in this.listeners){
            // crea una nuova chiave risorsa nel vettore listeners, valore = callback
            this.listeners[metodo][risorsa] = callback;
        }
        else{
            throw new Error("metodo non valido");
        }
    }
}  
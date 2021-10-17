import * as _http from 'http';
import * as _url from 'url';
import * as _fs from 'fs';
import * as _mime from 'mime';
import {HEADERS} from "./headers";
import {Dispatcher} from "./dispatcher";
import {notizie} from "./notizie";

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
dispatcher.addListener("GET","/api/elenco",function(req,res) {
    res.writeHead(200,HEADERS.json);
    res.write(JSON.stringify(notizie));
    res.end();
});

dispatcher.addListener("POST","/api/dettagli",function(req,res) {
    let fileNotizia = "./news/" + req["BODY"].file;
    let cont = 0;
    _fs.readFile(fileNotizia,function(error,data){
        if(!error){
            for (const notizia of notizie) {
                if(notizia.file == req["BODY"].file)
                {
                    notizie[cont].visualizzazioni = notizie[cont].visualizzazioni + 1;
                    break;
                }
                cont++;
            }
            let header = {"Content-Type" : _mime.getType(fileNotizia)};
            res.writeHead(200,header);
            res.write(JSON.stringify({"file":`${data}`}));
            res.end();
        }
        else{
            res.writeHead(404, HEADERS.text);
            res.write("File non trovato");
            res.end();
        }
    });
});

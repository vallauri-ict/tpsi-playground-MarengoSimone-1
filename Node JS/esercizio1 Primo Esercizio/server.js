
const _http = require("http");
const _url = require("url"); // nome della libreria
const HEADERS = require("./headers.json"); // path del file headers.json --> "./" indica la cartella corrente
const _colors = require("colors");

const port = 1337; // porta storica di node js

const server=_http.createServer(function (req, res) {
    /*  PRIMA PROVA
        // scrittura intestazione
        res.writeHead(200,HEADERS.text);
        // scrittura corpo dell'intestazione
        res.write("Richiesta eseguita correttamente");
        // invio risposta
        res.end();

        console.log("Risposta eseguita");
    */

   // Lettura di metodo risorsa e parametri
   let metodo = req.method;
   // parsing della url ricevuta
   let url = _url.parse(req.url,true); // true = parsifico anche i parametri
   let risorsa = url.pathname;
   let parametri = url.query;
   let dominio = req.headers.host;

   res.writeHead(200,HEADERS.html);
   res.write("<h1> Informazioni relative alla richiesta ricevuta: </h1>");
   res.write("<br>");
   res.write(`<p> <b> Risorsa richiesta: </b> ${risorsa} </p>`);
   res.write(`<p> <b> Metodo: </b> ${metodo} </p>`);
   res.write(`<p> <b> Parametri: </b> ${JSON.stringify(parametri)} </p>`);
   res.write(`<p> <b> Dominio richiesto: </b> ${dominio} </p>`);
   res.write("<p> Grazie per la richiesta! </p>");
   res.end();

   console.log("Richiesta ricevuta: " + req.url.yellow);
});

// se non si specifica l'indirizzo IP di ascolto il server viene avviato su tutte le interfacce
server.listen(port);
console.log("server in ascolto sulla porta " + port);
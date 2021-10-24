import * as _fs from 'fs';
import * as _mime from 'mime';
import * as _http from "http"
import HEADERS from "./headers.json";
import {Dispatcher} from "./dispatcher";
import facts from "./facts.json";
let port : number = 1337;

const icon_url = "https://assets.chucknorris.host/img/avatar/chuck-norris.png";
const api_url = "https://api.chucknorris.io"
const base64Chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"]

let dispatcher = new Dispatcher();

let server = _http.createServer(function(req,res){
    dispatcher.dispatch(req,res);
})
server.listen(port);
console.log("server in ascolto sulla porta: " + port);

// -------------------------
// Registrazione dei servizi:
// --------------------------
dispatcher.addListener("GET","/api/categories",function(req,res) {
    let vetFacts = [];
    for (const fact of facts.facts) {
        for (const category of fact.categories) {
            if(!vetFacts.includes(category))
            {
                vetFacts.push(category);
            }
        }
    }
    res.writeHead(200,HEADERS.json);
    res.write(JSON.stringify(vetFacts));
    res.end();
});

dispatcher.addListener("GET","/api/facts",function(req,res) {
    let categoryToFind = req["GET"].category;
    let vetFacts = [];
    for (const fact of facts.facts) {
        for (const category of fact.categories) {
            if(category == categoryToFind)
            {
                vetFacts.push(fact);
            }
        }
    }
    res.writeHead(200,HEADERS.json);
    res.write(JSON.stringify(vetFacts));
    res.end();
});

dispatcher.addListener("GET","/api/rate",function(req,res) {
    let vetId = req["GET"]["ids[]"];
    for (const fact of facts.facts) {
        if(vetId.includes(fact.id))
        {
            let score = fact.score;
            score++;
            fact.score = score;
            _fs.writeFile("./facts.json", JSON.stringify(facts), function (err) {
                if (err) {
                  res.writeHead(404, HEADERS.text);
                  res.write(err);
                }
            })
        }
    }
    res.writeHead(200, HEADERS.text);
    res.write(JSON.stringify("Score aggiornati correttamente!"));
    res.end();
});

dispatcher.addListener("POST","/api/add",function(req,res) {
    let category = req["BODY"].category;
    let value = req["BODY"].value;
    var date = new Date();
    let id = generateId();
    console.log(date);
    let json = {
        "categories": category,
        "created_at":date,
        "icon_url": icon_url,
        "id":id,
        "updated_at":date,
        "url":api_url,
        "value":value,
        "score":0
    }

    _fs.appendFile('./facts.json.facts', JSON.stringify(json), (err) => {
            if (err)
            {
                res.writeHead(404, HEADERS.text);
                res.write(err); 
                res.end();
            }
            else
            {
                res.writeHead(200, HEADERS.text);
                res.write(JSON.stringify("Dati aggiunti correttamente!"));
                res.end();
            }
      });
});

function generateId()
{
    let id;
    let factsId = [];
    for (const fact of facts.facts) {
        factsId.push(fact.id);
    }
    for(let i = 0; i < 22; i++)
    {
        let n = generaNumero(0,base64Chars.length-1);
        id += base64Chars[n];
    }
    if(!factsId.includes(id))
    {
        return id;
    }
}

function generaNumero(a,b)
{
    return Math.floor((b - a + 1) * Math.random()) + a;
}
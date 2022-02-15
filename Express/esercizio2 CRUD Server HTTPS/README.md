2. > **LEZIONE 2**
     2. > *<img src="https://developerhowto.com/wp-content/uploads/2018/12/node-express-mocha-chai.png" style="width: 100px"></img>  Express - Ese 2 Crud Server HTTPS*
     
## Obiettivo:
Un **CRUD serve**r è un server che, **indipendentemente dalla collezione richiesta dal client**, esegue una azione diversa a seconda del tipo di chiamata sulla base del seguente
schema in cui, in tutte le chiamate, id viene passato al server sempre come parte della risorsa:
- GET / restituisce l’elenco completo dei record. Indipendentemente dalla tabella richiesta, i campi 
restituiti sono sempre _id, name, gender, hair
- GET /id restituisce il record avente l’id indicato
- POST inserisce nella collezione il record ricevuto come parametro
- DELETE /id elimina il record avente l’id indicato
- PATCH /id aggiorna il record avente l’id indicato sulla base del json ricevuto come parametro
- PUT /id sostituisce il record avente l’id indicato con il json ricevuto come parametro

**LE FUNZIONALITA' SONO LE STESSE DELL'ESERCIZIO 2, MA IL CRUD SERVER SI APPOGGIA AL PROTOCOLLO HTTPS E QUINDI ALLA COPPIA DI CHIAVI (1 PUBBLICA E 1 PRIVATA)**

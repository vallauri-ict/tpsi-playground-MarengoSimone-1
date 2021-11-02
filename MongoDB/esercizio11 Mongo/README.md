1. > **LEZIONE 1**
     1. > *<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_AcD0p2W7Wghzsxl7WYRDntelrM7VCnlHaQ&usqp=CAU" style="width: 50px"></img>  MongoDB - Ese 11 Introduzione MongoDB*
     
## Obiettivo:
Realizzare l'esercizio base per i futuri esercizi con MongoDB. La base di partenza è il **dispatcher** di Node JS.


## Descrizione:
- Tramite i comandi **npm install mongodb e npm install @types/mongodb** è stato scaricato MongoDB nel progetto. 
- Successivamente è stato incluso MongoDB nel progetto tramite **l'import**
- E' stato modificato il solo file server.ts: nella gestione dei servizi sono stati introdotti alcuni metodi come il **client.connect** e **db.find()**
- Il primo servizio, invece, introduce l'inserimento di nuovi **documents** nel db tramite **db.insertOne()**
- Infine sono stati introdotti i metodi **updateOne()** e **deleteMany()**

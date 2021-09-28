2. > **LEZIONE 2**
     2. > *<img src="https://user-images.githubusercontent.com/62563624/134513026-0b4e7fc7-4eef-47b2-877d-1155ba1a81e9.png" style="width: 50px"></img>  Node JS - Ese 2 ReadFile*
     
## Obiettivo
Realizzare un  web server che restituisca al client i servizi o le pagine richieste dal client (utilizzando il modulo file system). 

## Il modulo FS - File System: 
- Permette di leggere e scrivere risorse nel file system del server, eseguendo tutte le operazioni tipiche di questo ambito come ad esempio la copia, la lettura, la scrittura,
la cancellazione di files e cartelle. Per richiamare il modulo è necessario scrivere: **var fs = require('fs');**
- Il metodo **readFile()** legge l'intero file ricevuto come parametro.  
- Parametri: 
  1. il **path** del file da leggere  
  2. il tipo di **encoding**. Il file viene restituito come raw buffer, cioè come buffer binario nudo e crudo. Il parametro encoding consente di convertire il raw buffer nella codifica indicata, che può 
essere “utf8” per il testo, “base64” per immagini base64, “binary” per files binari. 

3. > **LEZIONE 3**
     3. > *<img src="https://user-images.githubusercontent.com/62563624/134513026-0b4e7fc7-4eef-47b2-877d-1155ba1a81e9.png" style="width: 50px"></img>  Node JS - Ese 3 Creazione di un Modulo*
     
## Obiettivo:
Creare un nuovo modulo, un **modulo** è un file che definisce una serie di funzioni o oggetti JavaScript e che saranno poi utilizzabili dall'applicazione principale che utilizzerà
quel modulo. I moduli si basano su **CommonJS, uno standard ES5** che definisce le modalità e la sintassi di lavoro per la gestione dei moduli, sintassi basata principalmente su due metodi:  
- **module.exports** per esportare gli oggetti di un modulo 
- **require()** per importare un modulo da una applicazione principale 

## Il file modulo.js:
- Presenta un console.log() al momento del require del modulo
- Contiene l'esposizione di una funzione in **forma anonima** che va scritta prima delle funzioni esplicite (si può fare una sola funzione anonima altrimenti l'ultima funzione
anonima sovrascrive quelle precedenti)
- Espone alcune semplici **funzioni esplicite** matematiche
- Espone un esempio di classe con **standard ES6**
- Espone un **JSON**

## Il file server.js:
Contiente semplicemente il require() del modulo e richiama tutte le varie funzioni create. Ci sono alcuni console.log() per confermare la corretta esecuzione del codice

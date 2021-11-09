2. > **LEZIONE 2**
     2. > *<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_AcD0p2W7Wghzsxl7WYRDntelrM7VCnlHaQ&usqp=CAU" style="width: 50px"></img>  MongoDB - Ese 12 Unicorns*
     
## Obiettivo:
Eseguire le query del file pdf allegato sul database **unicorns**.


## Descrizione:
Per l'esecuzione delle query sono stati usati i seguenti operatori:
- **$and** e **$or** (eseguono le and e le or del linguaggio SQL)
- **$all** e **$in** per selezionare tutti o alcuni documenti
- operatori per i controlli minore, maggiore o uguale
- sono state eseguite delle **Regex tramite $regex**
- ricerca di un documento in base all'id tramite **ObjectId()**
- verificato l'esistenza di un campo con **$exists**
- **.count()** per contare i record restituiti
- **.project()** per stabilire i campi da visualizzare o meno (oppure projection)
- **.sort()** per eseguire un ordinamento
- **.findOne()** per trovare un singolo record
- **updateOne()**,**deleteOne()** e **insertOne()** per la modifica, la cancellazione e l'aggiunta dei record
- **.distinct()** per visualizzare tutti i dati ripetuti solo una 1 volta

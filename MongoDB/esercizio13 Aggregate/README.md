3. > **LEZIONE 3**
     3. > *<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_AcD0p2W7Wghzsxl7WYRDntelrM7VCnlHaQ&usqp=CAU" style="width: 50px"></img>  MongoDB - Ese 13 Aggregate*
     
## Obiettivo:
Eseguire le query del file pdf allegato sui documents **unicorns**,**orders**,**quizzes** e **students** nel db 5B di Mongo.

## Descrizione:
E' stato utilizzato il metodo **aggregate()**, esso consente d eseguire query di selezione più complesse (ad esempio con il **group by**). Mentre find() esegue un singolo comando
(costituito eventualmente da una AND di tante condizioni), il metodo aggregate() si aspetta come parametro un vettore enumerativo contenente un elenco ordinato di **operatori di aggregazione (pipeline)** che:
- vengono eseguiti sequenzialmente uno dopo l'altro nell'ordine in cui sono scritti
- ognuno opera a catena sul recordset restituito dall'operatore precedente

## Principali operatori utilizzati:
- **$match**: applica un filtro sul recordset ricevuto ed utilizza la stessa sintassi del find().
- **$group**: raggruppa i record sulla base di uno o più campi indicati. 
- **$project**: consente di realizzare una proiezione sui campi che dovranno essere utilizzati dall'operatore successivo. Accetta al suo interno l'utilizzo delle funzioni di aggregazione 
(come ad esempio $avg()) in modo da poter eseguire calcoli che coinvolgono più colonne oppure su campi singoli costituiti da vettori enumerativi.
- **$sort**: esegue un ordinamento sul recordset finale.
- **$unwind**: consente di srotolare un campo costituito da un vettore enumerativo producendo un elenco di N documenti.
- **$limit e $skip**: limitano o saltano un numero di record passato come parametro
- **$expr**: l'operatore consente di fare dei confronti tramite $gt, $lt, $eq con l'aggiunta di diverse potenzialità.

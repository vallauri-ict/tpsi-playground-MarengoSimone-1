5. > **LEZIONE 5**
     5. > *<img src="https://user-images.githubusercontent.com/62563624/134513026-0b4e7fc7-4eef-47b2-877d-1155ba1a81e9.png" style="width: 50px"></img>  Node JS - Ese 5 Persons*
     
## Obiettivo:
Scrivere una applicazione Client Server di tipo SPA (**Single Page Application**) che esponga e gestisca l'elenco di persone gestite da RANDOMUSER.org

## All'avvio:
- All’avvio il **server** legge e mantiene in memoria il contenuto del file (semplice require)
- All’avvio il **client** invia al server una richiesta **/nazioni** e visualizza una lista con tutte le nazioni ricevute.
 Il server costruisce il vettore sulla base del campo **location.country** facendo attenzione a ripetere ogni nazione una 
sola volta ed ordinando le nazioni in ordine alfabetico.

## In corrispondenza della scelta di una nazione:
Il client invia al server una richiesta /persone relativa alle persone appartenenti alla nazione selezionata. Il server, in corrispondenza della richiesta, invia un vettore 
enumerativo di oggetti aventi i seguenti campi: **name = title + " " + first + " " + lastcity, state, cell** dove si suppone che la combinazione title + first + last sia univoca all’interno del database. 
Il client visualizza tutti i campi ricevuti all’interno di una apposita tabella.

## In corrispondenza del click sul pulsante Dettagli:
Il client richiede al server l’elenco di tutti i dettagli  relativi alla persona indicata (sulla base di title + first + last) e visualizza nella sezione Dettagli 
(inizialmente nascosta) tutti i **dettagli**.

## In corrispondenza del click sul pulsante Elimina:
Il client, dopo aver chiesto conferma, richiede al server l’eliminazione della persona indicata (sempre sulla base di title + first + last). 
In corrispondenza dell’OK esegue un refresh della pagina.

## I quattro pulsanti di navigazione:
Consentono di scorrere i dettagli delle varie persone.
Fare attenzione a disabilitare FISRT e PREVIOUS quando si arriva sulla prima persona e disabilitare NEXT e LAST 
quando si arriva sull’ultima persona.

## Un pulsante AGGIUNGI:
Apre una nuova sezione per l’inserimento di un nuovo studente. 
Al termine del caricamento del nuovo studente sul server, l’applicazione ritorna alla sezione principale.


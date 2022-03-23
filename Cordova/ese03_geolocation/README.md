3. > **LEZIONE 3**
     3. > *<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdP3X1Hj9l1GU8UUn1PHR_mWsKVBTFNNDJwUBG1NoKtU6OcvyhH2xP4ToQGB4YWiCwSak&usqp=CAU" style="width: 100px"></img>  Cordova - Ese 03 Geolocation*
     
## Descrizione:
All'avvio l'applicazione (tramite *https://maps.googleapis.com/maps/api*) presenta due pulsanti:
- Sul click di **Avvia Rilevamento**: viene chiesta la posizione dell'utente e, se consentita, viene visualizzata in una Google Map. Tramite apposita notifica segnala 
l'avvio del rilevamento, che prosegue all'infinito. Tramite il metodo **navigator.geolocation.watchPosition** otteniamo la posizione corrente.
- Sul click di **Termina Rilevamento**: si segnala con l'alert la fine e viene rimossa la mappa dalla pagina (**clearWatch**), termina il rilevamento.

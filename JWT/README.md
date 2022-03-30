<h1 align="center">
  <a href="https://nodejs.org/it/"><img src="http://jwt.io/img/logo-asset.svg" width="300px" /></a>
</h1>

**Json Web Token (JWT)** è uno standard abbastanza recente di Token Authentication, standardizzato all'inizio del 2015 in cui il server, in corrispondenza della 
validazione del login, provvede a creare un **token cifrato** (signature based) contenente alcune informazioni dell'utente ed una **scadenza**. Questo token viene 
trasmesso al client che lo utilizzerà come identificativo per tutte le successive richieste. Sostanzialmente invece di trasmettere username e password, in corrispondenza
di ogni richiesta, al loro posto viene trasmesso il token. Un esempio di token è rappresentato dalla API KEY che occorre scaricare per poter accedere alle Google Maps. 
In quel caso il token non viene rilasciato a seguito di un login, ma occorre registrarsi e scaricare manualmente il token che dovrà poi essere allegato ad ogni richiesta accodandolo alla url.

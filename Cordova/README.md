<h1 align="center">
  <a href="https://cordova.apache.org/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdP3X1Hj9l1GU8UUn1PHR_mWsKVBTFNNDJwUBG1NoKtU6OcvyhH2xP4ToQGB4YWiCwSak&usqp=CAU" width="150px" /></a>
</h1>

Il progetto fu creato da una azienda canadese, Nitobi Software, e presentato nel 2009 come PhoneGap ad un evento Apple di presentazione e riconoscimento di nuovi progetti. 
Il nome Phone Gap stava ad indicare il Gap esistente tra il web ed il telefono, tra le web app e le app native. Successivamente nell' ottobre 2011 Nitobi Software entra a far 
parte della Apache Software Foundation con il nome di **Apache Cordova**, in onore di Cordova Street in Vancouver dove avevano sede gli uffici della Nitobi. 

## Architettura e Funzionamento:
L'architettura di Apache Cordova **è strutturata mediante un “contenitore” che esegue localmente la ns applicazione**. In pratica cordova agisce come un web server che “serve” al 
browser le risorse memorizzate all’interno della cartella www della app. Il browser viene aperto a schermo intero ed inizialmente visualizza il file index.html con tutte le sue 
dipendenze (CSS e JavaScript). Oltre a questo, è possibile aggiungere dei **plugin** che consentono di wrappare tutte le funzionalità native del dispositivo, quali ad esempio 
fotocamera, accelerometro, bussola, GPS.

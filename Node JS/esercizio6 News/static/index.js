"use strict"

$(document).ready(function() {
   let _wrapper = $("#wrapper");
   let _news = $("#news");

   let requestElenco = inviaRichiesta("GET","/api/elenco");
   requestElenco.fail(errore);
   requestElenco.done(function(data){
        console.log(data);
        
        for (const notizia of data) {
           $("<span>").appendTo(_wrapper).addClass("titolo").text(" " + notizia.titolo + " ");
           $("<a>").appendTo(_wrapper).prop("href","#").prop("notizia",notizia).text(" Leggi ").on("click",visualizzaDettagli);
           $("<span>").appendTo(_wrapper).addClass("nVis").text(` [visualizzato ${notizia.visualizzazioni} volte]`);
           $("<br>").appendTo(_wrapper);
        }
   });

   function visualizzaDettagli()
   {
      let notizia = $(this).prop("notizia");
      let requestDettagli = inviaRichiesta("POST","/api/dettagli",{"file":notizia.file});
      requestDettagli.fail(errore);
      requestDettagli.done(function(data){
         _news.html(data.file);
      });
   }
})

"use strict"
$(document).ready(function() {
    let _lstNazioni = $("#lstNazioni");
    let _tabStudenti = $("#tabStudenti");
    let _divDettagli = $("#divDettagli");

    _divDettagli.hide();

    let requestNazioni = inviaRichiesta("GET", "/api/nazioni");
    requestNazioni.fail(errore);
    requestNazioni.done(function(data){
        for (let i=0;i<data.nazioni.length;i++) {
            $('<a>',{
                'class':'dropdown-item',
                'href':'#',
                'text':data.nazioni[i],
                'click':visualizzaPersone
            }).appendTo(_lstNazioni);
        }
    });

    function visualizzaPersone(){
        let nation = $(this).text();
        let requestPersone = inviaRichiesta("GET", "/api/persone", {"nazione":nation});
        requestPersone.fail(errore);
        requestPersone.done(function(persons){
            //console.log(persons);
            //_tabStudenti.html("");
            _tabStudenti.empty();
            for (const person of persons) {
                let tr = $("<tr>").appendTo(_tabStudenti);
                for (const key in person) {
                    $("<td>").appendTo(tr).html(person[key]);
                }
                let td = $("<td>").appendTo(tr);
                $("<button>").appendTo(td).prop("persona",person).html("dettagli").on("click",visualizzaDettagli);
                td = $("<td>").appendTo(tr);
                $("<button>").appendTo(td).prop("persona",person).html("elimina").on("click",elimina);
            }
        });

    }

    function visualizzaDettagli()
    {
        let persona = $(this).prop("persona").name;
        let requestDettagli = inviaRichiesta("GET", "/api/dettagli",{"persona":persona});
        requestDettagli.fail(errore);
        requestDettagli.done(function(dettagli){
           console.log(dettagli);
            _divDettagli.show();

            $("<img>").prop("src",dettagli.img).appendTo(_divDettagli);
            $("<h5>").html(dettagli.name).appendTo(_divDettagli);
            $("<p>").text("<b>gender:</b>" + dettagli.gender);
        });
    }

    function elimina()
    {
        let persona = $(this).prop("persona").name;
        let requestElimina = inviaRichiesta("DELETE", "/api/elimina",{"persona":persona});
        requestElimina.fail(errore);
        requestElimina.done(function(data){
           console.log(data);
            _divDettagli.show();
            window.location.reload();
        });
    }

 
})
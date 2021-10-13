"use strict"
$(document).ready(function() {
    let _lstNazioni = $("#lstNazioni");
    let _tabStudenti = $("#tabStudenti");
    let _divDettagli = $("#divDettagli");
    let selectedNation;

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
        if($(this).text())
        {
            selectedNation = $(this).text();
        }
        let requestPersone = inviaRichiesta("GET", "/api/persone", {"nazione":selectedNation});
        requestPersone.fail(errore);
        requestPersone.done(function(persons){
            //console.log(persons);
            //_tabStudenti.html("");
            _tabStudenti.empty();
            _divDettagli.hide();
            for (const person of persons) {
                let tr = $("<tr>").appendTo(_tabStudenti);
                for (const key in person) {
                    $("<td>").appendTo(tr).html(person[key]);
                }
                let td = $("<td>").appendTo(tr);
                $("<button>").appendTo(td).prop("persona",person).html("dettagli").on("click",visualizzaDettagli);
                td = $("<td>").appendTo(tr);
                $("<button>").appendTo(td).prop("persona",person).html("elimina").addClass("elimina");
            }
        });

    }

    function visualizzaDettagli()
    {
        let persona = $(this).prop("persona").name;
        let requestDettagli = inviaRichiesta("PATCH", "/api/dettagli",{"persona":persona});
        requestDettagli.fail(errore);
        requestDettagli.done(function(dettagli){
           console.log(dettagli);
            _divDettagli.show(1000);

            $(".card-img-top").prop("src",dettagli.picture.thumbnail);
            $(".card-title").html(persona);
            let s = `<b>gender:</b> ${dettagli.gender}</br>`;
            s += `<b>address:</b> ${JSON.stringify(dettagli.location)}</br>`;
            s += `<b>email:</b> ${dettagli.email}</br>`;
            s += `<b>dob:</b> ${JSON.stringify(dettagli.dob)}</br>`;
            $(".card-text").html(s);
        });
    }

    /* Metodo alternativo con le classi 
    _tabStudenti.on("click","button.elimina",function(){

    })*/
    /* Pseudoselettore CSS che punta a tutti i button che contengono la parola elimina*/
    _tabStudenti.on("click","button:contains(elimina)",function(){
        let persona = $(this).prop("persona").name;
        let requestElimina = inviaRichiesta("DELETE", "/api/elimina",{"persona":persona});
        requestElimina.fail(errore);
        requestElimina.done(function(message){
           alert(message);
            visualizzaPersone();
            window.location.reload();
        });
    });
})
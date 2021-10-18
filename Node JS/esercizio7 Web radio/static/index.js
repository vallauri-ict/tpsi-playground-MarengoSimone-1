"use strict"

$(document).ready(function() {
    let _lstRegioni = $("#lstRegioni");
    let _tbody = $("#tbody");
    let _dettagli = $("#dettagli");

    let request = inviaRichiesta("GET","/api/update");
    request.fail(errore);
    request.done(function(data){
        console.log(data);
    });

    let requestElenco = inviaRichiesta("GET","/api/elenco");
    requestElenco.fail(errore);
    requestElenco.done(function(data){
        console.log(data);
        for (const regione of data) {
            $("<option>").appendTo(_lstRegioni).prop("values",regione.value)
            .text(regione.name + ` [ ${regione.stationcount} emittenti]`).prop("reigone",regione);
        }
    });

    _lstRegioni.on("change",function(){
        let regione = $(this).val().split("[")[0];
        console.log(regione);
        let requestRadios = inviaRichiesta("POST","/api/radios",{"regione":regione});
        requestRadios.fail(errore);
        requestRadios.done(function(data){
            console.log(data);
        })
    })
})

"use strict"

$(document).ready(function() {
    let _lstRegioni = $("#lstRegioni");
    let _tbody = $("#tbody");
    let _dettagli = $("#dettagli");
    _dettagli.hide();

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
            .text(regione.name + ` [ ${regione.stationcount} emittenti]`).prop("regione",regione);
        }
    });

    _lstRegioni.on("change",function(){
        let regione = $(this).val().split(" [")[0];
        let requestRadios = inviaRichiesta("POST","/api/radios",{"regione":regione});
        requestRadios.fail(errore);
        requestRadios.done(function(data){
            _tbody.empty();
            for (const radio of data) {
                let tr = $("<tr>");
                tr.appendTo(_tbody);

                let td = $("<td>").appendTo(tr);
                $("<img>").prop("src",radio.favicon).css("width","40px").appendTo(td);
                td = $("<td>").appendTo(tr).text(radio.name);
                td = $("<td>").appendTo(tr).text(radio.codec);
                td = $("<td>").appendTo(tr).text(radio.bitrate);
                td = $("<td>").appendTo(tr).text(radio.votes);
                td = $("<td>").appendTo(tr);
                $("<img>").prop("src","./like.jpg").prop("radio",radio).css({"width":"40px"})
                .appendTo(td).on("click",like);
            }
        })
    })

    function like()
    {
        let idRadio = $(this).prop("radio").id;
        let _this = $(this);
        let requestLike = inviaRichiesta("POST","/api/like",{"id":idRadio});
        requestLike.fail(errore);
        requestLike.done(function(data){
            _this.parent().prev().text(data);
        });
    }
})

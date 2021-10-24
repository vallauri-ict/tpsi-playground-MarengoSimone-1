"use strict"

$(document).ready(function() {
    let _divCategory = $("#categoryList");
    let _wrapper = $("#mainWrapper");
    let _btnAdd = $("#btnAdd");

    $("#newFact").val("");

    let requestCategories = inviaRichiesta("GET","/api/categories");
    requestCategories.fail(errore);
    requestCategories.done(function(data){
        console.log(data);
        let select = $("<select>").appendTo(_divCategory).prop("id","lstCategories")
        .on("change",requestFacts);
        for (const category of data) {
            $("<option>").appendTo(select).prop("value",category).text(category);
        }
        requestFacts();
    });

    _btnAdd.on("click",function(){
        let category = $("select").val();
        let value = $("#newFact").val();
        console.log(category + " " + value);
        let requestAdd = inviaRichiesta("POST","/api/add",{"category":category,"value":value});
        requestAdd.fail(errore);
        requestAdd.done(function(mex){
            alert(mex);
        })
    })

    function requestFacts()
    {
        let category = $("select").val();
        let wrapper = $("#mainWrapper");
        let requestFacts = inviaRichiesta("GET","/api/facts",{"category":category});
        requestFacts.fail(errore);
        requestFacts.done(function(data){
            wrapper.empty();
            console.log(data);
            //let facts = arraySort(data);
            $("<h2>").appendTo(wrapper).css("text-align","center").text("rate your favorite facts:");
            for (const fact of data) {
                $("<input type='checkbox'>").prop("value",fact.id).appendTo(wrapper);
                $("<span>").text(fact.value).appendTo(wrapper);
                $("<br>").appendTo(wrapper);
            }
            $("<button>").text("invia").prop("id","btnInvia").appendTo(wrapper)
            .on("click",inviaRates);
        })
    }

    function arraySort(data)
    {
        data.sort(function(record1, record2) {
            let str1 = record1.score.toUpperCase();
            let str2 = record2.score.toUpperCase();
            if (str1 < str2)
            return -1;
            else if (str1 > str2)
            return 1;
            else return 0;
        }); 
    }

    function inviaRates()
    {
        let vetId = [];
        $(":checkbox").each(function () {
            var ischecked = $(this).is(":checked");
            if (ischecked) {
                vetId.push($(this).prop("value"));
            }
        });
        let requestRate = inviaRichiesta("GET","/api/rate",{"ids":vetId});
        requestRate.fail(errore);
        requestRate.done(function(mex){
            alert(mex);
            requestFacts();
        });
    }
});

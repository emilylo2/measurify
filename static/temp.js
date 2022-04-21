function getDegF(){
    $(".degF").empty();
    let degC = document.getElementById("degC").value;
    let degF = 1.8*degC+32;
    let new_div = $("<div>");
    $(new_div).html(degF.toFixed(2) + "F");
    $(".degF").append(new_div);
}

function getDegC(){
    $(".degC2").empty();
    let degF = document.getElementById("degF2").value;
    let degC = (degF-32)*(5/9);
    let new_div = $("<div>");
    $(new_div).html(degC.toFixed(2) + "C");
    $(".degC2").append(new_div);
}


$(document).ready(function(){
    $("#degC").focus(function(){
        $("#degC").keypress(function(e){
            if(e.which == 13){
                getDegF();
            }
        })
    });
    $("#degF2").focus(function(){
        $("#degF2").keypress(function(e){
            if(e.which == 13){
                getDegC();
            }
        })
    });
})


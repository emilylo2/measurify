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

function makeprogressbar(news){
    if (news["start"]==1){
        //let statusbar=$("<div id='statusbar'></div>")
        $("#prog").progressbar({
            value: news["progress"]
        });
        let next_button=$("<button id='nextpage' class='button-6'>Take Quiz</button>")
        next_button.click(function(){
            newstatus={
                "start":news["start"],
                "progress":news["progress"]
            }
            location.href = '/quiz/1';
        })
        $("#next").append(next_button)
    } else {
        $("#prog").html("")
        $("#next").html("")
    }
}



$(document).ready(function(){
    makeprogressbar(news)
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


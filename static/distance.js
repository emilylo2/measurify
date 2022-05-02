let pvalue=0
$(document).ready(function() {
    makeprogressbar(news)
    updateprogress(pvalue)
    $("#increase").click(function(){
        if (pvalue+10<=100){
            pvalue=pvalue+10
            updateprogress(pvalue)
        }
    })
    $("#decrease").click(function(){
        if (pvalue-10>=0){
            pvalue=pvalue-10
            updateprogress(pvalue)
        }
    })
});

function makeprogressbar(news){
    if (news["start"]==1){
        let new_div=$("<div class='col-md-2' id='progreport'></div>")
        let new_span=$("<span class='progrepclass'>Progress: "+news["progress"]+"%</span>")
        new_div.append(new_span)

        let new_div1=$("<div class='col-md-8'></div>")
        let new_prog=$("<div id='prog'></div>")
        new_div1.append(new_prog)

        $("#progrow").append(new_div)
        $("#progrow").append(new_div1)
        $("#prog").progressbar({
            value: news["progress"]
        });
        let next_button=$("<button id='nextpage' class='button-6'>Next</button>")
        next_button.click(function(){
            newstatus={
                "start":news["start"],
                "progress":news["progress"]
            }
            gotoquiz(newstatus)
        })
        $("#next").append(next_button)
    } else {
        $("#prog").html("")
        $("#next").html("")
    }
}

function gotoquiz(newstatus){
    console.log(newstatus)
    $.ajax({
        type: "POST",
        url: "/learn",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(newstatus),
        success: function(result){
            location.href = '/quiz/1';
            newstatus=result
        },
    
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function updateprogress(pvalue){
    updatedistance(pvalue)
    $( "#progressbar" ).progressbar({
        value: pvalue
      });
}

function updatedistance(pvalue){
    let kmvalue=Math.round(pvalue*3.6)
    let milevalue=Math.round(pvalue*2.2)
    let text=kmvalue.toString()+" Kilometers= "+milevalue.toString() +" Miles"
    $( "#dist" ).html(text)
}
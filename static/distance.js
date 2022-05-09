let pvalue=0
let previousvalue=0
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
        let next_button=$("<button id='nextpage' class='nextbutton'>Take Quiz</button>")
        next_button.click(function(){
            let quizscore={
                "quizscore":0,
                "question":0
            }
            console.log(quizscore)
            newquiz(quizscore)
        })
        $("#next").append(next_button)
    } else {
        $("#prog").html("")
        $("#next").html("")
    }
}

function newquiz(newdata){
    console.log(newdata)
    $.ajax({
        type: "POST",
        url: "/answer",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(newdata),
        success: function(result){
            quiz=result
            console.log('/quiz/'+result["quizs"]["question"])
            location.href = '/quiz/'+result["quizs"]["question"]
            $("#score").html((quiz["quizs"]["quizscore"]).toString()+"/4")
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
      $( "#progressvalue1" ).animate({
          'width':700*(pvalue/100)-5
      },140)
      if (pvalue!=0){
        $({counter: previousvalue}).animate({counter: pvalue},{
            duration: 140,
            step :function(){
              $( "#progressvalue1" ).text(Math.round(pvalue*3.6)+ ' KM')
            }
        })
      }
      $( "#progressvalue2" ).animate({
        'width':700*(pvalue/100)-5
    },140)
    if (pvalue!=0){
      $({counter: previousvalue}).animate({counter: pvalue},{
          duration: 140,
          step :function(){
            $( "#progressvalue2" ).text(Math.round(pvalue*2.2)+ ' Miles')
          }
      })
    }

      previousvalue=pvalue
}

function updatedistance(pvalue){
    let kmvalue=Math.round(pvalue*3.6)
    let milevalue=Math.round(pvalue*2.2)
    let text=kmvalue.toString()+" Kilometers= "+milevalue.toString() +" Miles"
    $( "#dist" ).html(text)
}

$(document).ready(function(){
    console.log(quiz)
    createoptions()
})

function createoptions(){
    disableoptions(false)
    let new_button = $("<button class='button-6' id='op1'></button>")
    new_button.html(details["op1"])
    new_button.click(function(){
        if (checkcorrect(new_button.html(),details["correct"])==true){
            console.log("Correct")
            correct()
        } else {
            console.log("Wrong")
            incorrect()
        }
    })
    
    let new_button1 = $("<button class='button-6' id='op2'></button>")
    new_button1.html(details["op2"])
    new_button1.click(function(){
        if (checkcorrect(new_button1.html(),details["correct"])==true){
            console.log("Correct")
            correct()
        } else {
            console.log("Wrong")
            incorrect()
        }
    })

    let new_button2 = $("<button class='button-6' id='op3'></button>")
    new_button2.html(details["op3"])
    new_button2.click(function(){
        if (checkcorrect(new_button2.html(),details["correct"])==true){
            console.log("Correct")
            correct()
        } else {
            console.log("Wrong")
            incorrect()
        }
    })

    let new_button3 = $("<button class='button-6' id='op4'></button>")
    new_button3.html(details["op4"])
    new_button3.click(function(){
        if (checkcorrect(new_button3.html(),details["correct"])==true){
            console.log("Correct")
            correct()
        } else {
            console.log("Wrong")
            incorrect()
        }
    })
    $("#options").append(new_button)
    $("#options").append(new_button1)
    $("#options").append(new_button2)
    $("#options").append(new_button3)

}

function checkcorrect(op,ans){
    console.log(op,ans)
    if (op===ans){
        return true
    } else {
        return false
    }
    
}

function disableoptions(op){
    $("#op1").prop('disabled', op)
    $("#op2").prop('disabled', op)
    $("#op3").prop('disabled', op)
    $("#op4").prop('disabled', op)
}

function correct(){
    disableoptions(true)
    $("#message1").remove()
    $(".review").empty()
    newscore=quiz["quizscore"]+1
    newdata={
        "quizscore":newscore,
        "question":quiz["question"]
    }
    console.log(newdata)
    answer(newdata)

    let new_div = $("<div id='message1'>")
    let new_div1=$("<div class='correct'>You have the right answer</div>");

    nextquestion=parseInt(details["id"])+1;
    let new_button=$("<button class='nextbutton'>Next Question</button>")


    new_button.click(function(){
        taketo(nextquestion.toString())
    })
    

    new_div.append(new_div1)
    new_div.append(new_button)

    $("#message").append(new_div);
    console.log(nextquestion)
    if(nextquestion==5){
        answer(newdata)
        console.log("why")
        new_button.html("End Quiz")
        new_button.click(function(){
            location.href = "/end";
        })
    }
    
}

function incorrect(){
    disableoptions(true)
    $("#message1").remove()
    $(".review").empty()
    let review_btn = $("<button id='review' class='button-6'>Review</button>")
    newdata={
        "quizscore":quiz["quizscore"],
        "question":quiz["question"]
    }
    answer(newdata)
    
    let new_div = $("<div id='message1'>")
    let new_div1=$("<div class='incorrect'>You got the wrong answer</div>");

    nextquestion=parseInt(details["id"])+1;

    let new_button=$("<button class='nextbutton'>Next Question</button>")

    new_button.click(function(){
        taketo(nextquestion.toString())
    })
    

    new_div.append(new_div1)
    new_div.append(review_btn)
    new_div.append(new_button)
    
    $("#message").append(new_div);
    openReview(details["topic"])

    console.log(nextquestion)
    if(nextquestion==5){
        newdata={
            "quizscore":quiz["quizscore"],
            "question":0
        }
        answer(newdata)
        new_button.html("End Quiz")
        new_button.click(function(){
            location.href = "/end";
        })
    }
}

function taketo(str){
    location.href = '/quiz/'+str;
}

function openReview(page){
    $("#review").click(function(){
        let start={
            "start":0,
            "progress":0
        }
        let pageRoute = "/"+page
        console.log(pageRoute)
        newwindowlinks(start,pageRoute)
    })
}

function answer(newdata){
    console.log(newdata)
    $.ajax({
        type: "POST",
        url: "/answer",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(newdata),
        success: function(result){
            quiz=result
            $("#quizscoreup").html((quiz["quizs"]["quizscore"]).toString())
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function newwindowlinks(start,ext){
    $.ajax({
        type: "POST",
        url: "/learn",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(start),
        success: function(result){
            window.open(ext);
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
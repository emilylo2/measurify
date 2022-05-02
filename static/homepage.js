$(document).ready(function(){
    $("#learnall").click(function(){
        let start={
            "start":1,
            "progress":0
        }
        console.log("yes")
        startlearnall(start)
    })
    
    $("#height").click(function(){
        let start={
            "start":0,
            "progress":0
        }
        links(start,'/height')
    })
    $("#weight").click(function(){
        let start={
            "start":0,
            "progress":0
        }
        links(start,'/weight')
    })
    $("#temp").click(function(){
        let start={
            "start":0,
            "progress":0
        }
        links(start,'/temp')
    })
    $("#distance").click(function(){
        let start={
            "start":0,
            "progress":0
        }
        links(start,'/distance')
    })
    $("#quizbutton").click(function(){
        let quizscore={
            "quizscore":0,
            "question":0
        }
        console.log(quizscore)
        newquiz(quizscore)
    })
    


})

function links(start,ext){
    $.ajax({
        type: "POST",
        url: "/learn",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(start),
        success: function(result){
            location.href = ext;
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

function startlearnall(start){
    $.ajax({
        type: "POST",
        url: "/learn",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(start),
        success: function(result){
            location.href = '/height';
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

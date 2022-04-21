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

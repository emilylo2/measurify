let item = [
    {
        "item": "Brick",
        "weight": "4"
    }
]
let feet = [
    "Foot measurement",
]

let height=[]
const total=7
let counter=0
function makeitem(item){
    $("#item").empty()
    $("#item_label").html("<span class='pad'>Drag the brick from here</span>")
    $.each(item, function(index,value){
        let new_div = $("<div>")
        $(new_div).addClass("border")
        $(new_div).draggable({
            cursor:"move",
            revert: true,
            start: function( event, ui ) {
                $("#height_label").droppable({
                    activeClass: "ui-state-highlight",
                    disabled: false
                })
                $("#heightdrop").droppable({
                    activeClass: "ui-state-highlight1",
                    disabled: false
                })
                $("#item_label").droppable({
                    activeClass: "ui-no-colour",
                    disabled: true
                })
           }
        })
        $(new_div).css("cursor","move")
        $("#item").append(new_div)
    });
}

function heightcalcultor(totalheight){
    $("#heightcalculator").empty()
    if (totalheight!=0){
        totalheight*=4;
        totalkg=totalheight*0.45;
        caltext=totalheight+" Pounds= "+totalkg.toString()+" Kg"
        let new_span = $("<span>")
        new_span.html(caltext)
        $("#heightcalculator").append(new_span)
    }

}

function makeheight(height){
    heightcalcultor(height.length)
    $("#height").empty()
    $("#blankheight").html("")
    //$("#height_label").html("<span class='pad'>Height</span>")
    $("#blankdiv").remove()
    $.each(height,function(index,value){
        let new_div = $("<div>")
        $(new_div).addClass("border")
        $(new_div).draggable({
            cursor:"move",
            revert: true,
            start: function( event, ui ) {
                $("#item_label").html("<span class='pad'>Remove the weight here</span>")
                $("#item_label").droppable({
                    activeClass: "ui-state-highlight",
                    disabled: false,
                })
                $("#height_label").droppable({
                    activeClass: "ui-no-colour",
                    disabled: true
                })
                $("#heightdrop").droppable({
                    activeClass: "ui-no-colour",
                    disabled: true
                })
           }
        })
        $(new_div).css("cursor","move")
        let blankheight=((total-height.length)*66)+38;
        let strbh="height: "+blankheight.toString() + "px"
        let divstring="<div id='blankdiv' style='"+strbh+"'></div>"
        console.log(divstring)
        let new_blank_div=$(divstring)
        $("#blankdiv").remove()
        $("#blankheight").append(new_blank_div);
        $("#height").append(new_div)
        
    })
}

function makeprogressbar(news){
    if (news["start"]==1){
        //let statusbar=$("<div id='statusbar'></div>")
        $("#prog").progressbar({
            value: news["progress"]
        });
        let next_button=$("<button id='nextpage' class='button-6'>Next</button>")
        next_button.click(function(){
            newstatus={
                "start":news["start"],
                "progress":news["progress"]
            }
            gotodistance(newstatus)
        })
        $("#next").append(next_button)
    } else {
        $("#prog").html("")
        $("#next").html("")
    }
}

function gotodistance(newstatus){
    console.log(newstatus)
    $.ajax({
        type: "POST",
        url: "/learn",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(newstatus),
        success: function(result){
            location.href = '/distance';
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

$(document).ready(function(){
    console.log(news)
    makeitem(item)
    makeheight(height)
    makeprogressbar(news)
    $("#height_label").droppable({
        drop: function(event,ui){
            counter=counter+1
            if (counter<=total){
                let strcounter=counter.toString()+" Pounds"
                height.unshift(strcounter)
                makeheight(height)
            }
           // $("#height_label").html("<span class='pad'>Height</span>")
        }
    })

    $("#heightdrop").droppable({
        drop: function(event,ui){
            counter=counter+1
            if (counter<=total){
                let strcounter=counter.toString()+" Pounds"
                height.unshift(strcounter)
                makeheight(height)
            }
           // $("#height_label").html("<span class='pad'>Height</span>")
        }
    })
    $("#item_label").droppable({
        drop: function(event,ui){
            counter=counter-1
            if (counter>=0){
                height.shift()
                makeheight(height)
            }
            $("#item_label").html("<span class='pad'>Drag the brick from here</span>")
        }
    })

})
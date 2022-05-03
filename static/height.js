let feet = [
    "Foot measurement",
]

let height=[]
const total=7
let counter=0
function makefeet(feet){
    $("#feet").empty()
    $("#feet_label").html("<span class='pad'>Drag the height from here</span>")
    $.each(feet, function(index,value){
        let new_div = $("<div>")
        $(new_div).addClass("border")
        $(new_div).html(value)
        $(new_div).draggable({
            cursor:"move",
            revert: true,
            start: function( event, ui ) {
                $("#height_label").html("<span class='pad'>Drop the height here</span>")
                $("#height_label").droppable({
                    activeClass: "ui-state-highlight",
                    disabled: false
                })
                $("#heightdrop").droppable({
                    activeClass: "ui-state-highlight1",
                    disabled: false
                })
                $("#feet_label").droppable({
                    activeClass: "ui-no-colour",
                    disabled: true
                })
           }
        })
        $(new_div).css("cursor","move")
        $("#feet").append(new_div)
    });
}

function heightcalcultor(totalheight){
    $("#heightcalculator").empty()
    if (totalheight!=0){
        totalmeters=totalheight*0.305;
        caltext=totalheight+" Feet= "+totalmeters.toString()+" Meters"
        let new_span = $("<span>")
        new_span.html(caltext)
        $("#heightcalculator").append(new_span)
    }

}

function makeheight(height){
    heightcalcultor(height.length)
    $("#height").empty()
    $("#blankheight").html("")
    $("#height_label").html("<span class='pad'>Height</span>")
    $("#blankdiv").remove()

    $("#meterheight").empty()
    $("#blankheight1").html("")
    $("#height_label1").html("<span class='pad'>Height in Meters</span>")
    $("#blankdiv1").remove()



    $.each(height,function(index,value){
        let new_div = $("<div>")
        $(new_div).addClass("border")
        $(new_div).html(value)
        $(new_div).draggable({
            cursor:"move",
            revert: true,
            start: function( event, ui ) {
                $("#feet_label").html("<span class='pad'>Remove the height here</span>")
                $("#feet_label").droppable({
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

        let new_blank_div=$(divstring)
        $("#blankdiv").remove()
        $("#blankheight").append(new_blank_div);
        $("#height").append(new_div)
        
    })

    $.each(height,function(index,value){
        spt=value.split("")
        meterv=parseInt(spt[0])*0.305
        console.log(meterv)
        value1=meterv+" Meters"
        let new_div1 = $("<div>")
        $(new_div1).addClass("border")
        $(new_div1).html(value1)
        $(new_div1).draggable({
            cursor:"move",
            revert: true,
            start: function( event, ui ) {
                $("#feet_label").html("<span class='pad'>Remove the height here</span>")
                $("#feet_label").droppable({
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
        $(new_div1).css("cursor","move")
        let blankheight=((total-height.length)*66)+38;
        let strbh="height: "+blankheight.toString() + "px"
        let divstring="<div id='blankdiv1' style='"+strbh+"'></div>"
        let new_blank_div1=$(divstring)
        $("#blankdiv1").remove()
        $("#blankheight1").append(new_blank_div1);
        $("#meterheight").append(new_div1)
        
    })

}

function makeprogressbar(news){
    if (news["start"]==1){
        //let statusbar=$("<div id='statusbar'></div>")
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
            gotoweight(newstatus)
        })
        $("#next").append(next_button)
    } else {
        $("#progrow").html("")
        $("#prog").html("")
        $("#next").html("")
    }
}

function gotoweight(newstatus){
    console.log(newstatus)
    $.ajax({
        type: "POST",
        url: "/learn",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(newstatus),
        success: function(result){
            location.href = '/weight';
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
    makefeet(feet)
    makeheight(height)
    makeprogressbar(news)
    $("#height_label").droppable({
        drop: function(event,ui){
            counter=counter+1
            if (counter<=total){
                let strcounter=counter.toString()+" Feet"
                height.unshift(strcounter)
                makeheight(height)
            }
            $("#height_label").html("<span class='pad'>Height</span>")
        }
    })

    $("#heightdrop").droppable({
        drop: function(event,ui){
            counter=counter+1
            let strcounter
            if (counter<=total){
                if(counter ==1){
                   strcounter= "1 Foot"
                }
                else{
                    strcounter=counter.toString()+" Feet"
                }
                height.unshift(strcounter)
                makeheight(height)
            }
            $("#height_label").html("<span class='pad'>Height</span>")
        }
    })
    $("#feet_label").droppable({
        drop: function(event,ui){
            counter=counter-1
            if (counter>=0){
                height.shift()
                makeheight(height)
            }
            $("#feet_label").html("<span class='pad'>Drag the Height from here</span>")
        }
    })

})
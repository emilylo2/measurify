let feet = [
    "Foot measurement",
]

let height=[]
const total=7
let counter=0
function makefeet(feet){
    $("#feet").empty()
    $("#feet_label").html("<span class='pad'>Drag the weight from here</span>")
    $.each(feet, function(index,value){
        let new_div = $("<div>")
        $(new_div).addClass("border")
        $(new_div).html(value)
        $(new_div).draggable({
            cursor:"move",
            revert: true,
            start: function( event, ui ) {
                $("#height_label").html("<span class='pad'>Drop the weight here</span>")
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
    $.each(height,function(index,value){
        let new_div = $("<div>")
        $(new_div).addClass("border")
        $(new_div).html(value)
        $(new_div).draggable({
            cursor:"move",
            revert: true,
            start: function( event, ui ) {
                $("#feet_label").html("<span class='pad'>Remove the weight here</span>")
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
        console.log(divstring)
        let new_blank_div=$(divstring)
        $("#blankdiv").remove()
        $("#blankheight").append(new_blank_div);
        $("#height").append(new_div)
        
    })
}

$(document).ready(function(){
    makefeet(feet)
    makeheight(height)
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
            if (counter<=total){
                let strcounter=counter.toString()+" Feet"
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
            $("#feet_label").html("<span class='pad'>Drag the weight from here</span>")
        }
    })

})
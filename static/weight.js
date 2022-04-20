let item = [
    {
        "item": "Brick",
        "link": "https://purepng.com/public/uploads/large/purepng.com-brickbuilding-materialbrickconstructionconcrete-materials-1421526461118aspkp.png",
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
        //$(new_div).addClass("border")
        $(new_div).html("<img class='brick' src='"+ value.link + "'>")
        $(new_div).draggable({
            cursor:"move",
            revert: true,
            start: function( event, ui ) {
                //").html("<span class='pad'>Drop the weight here</span>")
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
        $(new_div).html(value)
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

$(document).ready(function(){
    makeitem(item)
    makeheight(height)
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
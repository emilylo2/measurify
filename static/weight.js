
let item = [
    {
        "item": "Brick",
        "weight": "4"
    }
]
let weight = [
    "Pound measurement",
]
let temp=1
let height=[]
const total=7
let counter=0
function makeitem(item){
    $("#item").empty()
    $("#item_label").html("<span class='pad'>Drag the brick from here</span>")
    $.each(weight, function(index,value){
        let new_div = $("<div>")
        $(new_div).addClass("border")
        $(new_div).html(value)
        $(new_div).draggable({
            cursor:"move",
            revert: true,
            start: function( event, ui ) {
                $("#height_label").droppable({
                    activeClass: "ui-state-highlightF",
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
        totalheight+=1;
        totalheight-=1
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
    $("#blankdiv").remove()

    $("#meterheight").empty()
    $("#blankheight1").html("")
    $("#height_label1").html("<span class='pad'>Weight in Kilograms</span>")
    $("#blankdiv1").remove()

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
                    activeClass: "ui-state-highlightF",
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

    $.each(height,function(index,value){
        spt=value.split("")
        console.log("this" + spt[0])
        meterv=parseInt(spt[0])*0.45
        console.log(meterv)
        value1=meterv+" Kilograms"
        let new_div1 = $("<div>")
        $(new_div1).addClass("border")
        $(new_div1).html(value1)
        $(new_div1).draggable({
            cursor:"move",
            revert: true,
            start: function( event, ui ) {
                $("#item_label").html("<span class='pad'>Remove the height here</span>")
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
        let next_button=$("<button id='nextpage' class='nextbutton'>Next</button>")
        //let next_button=$("<div style='cursor: pointer'><img src='https://www.downloadclipart.net/large/10802-icon-next-blue-light-braun-design.png' style='width:80px;height:80px'></div>")
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
                let strcounter
                let num = counter
                strcounter=num.toString()+" Pounds"
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
let employees = [ "1 Meter", "1 Mile", "1 Kilogram"]
let list2 = [];
let correct = [];
let wrong =[];
let QandA = new Map()
QandA.set("1 Meter", "3.2 Feet");
QandA.set("1 Mile", "1.6 Kilometers");
QandA.set("1 Kilogram", "2.2 Pounds");

let indexing = new Map()
indexing.set("1 Meter", "1");
indexing.set("1 Mile", "2");
indexing.set("1 Kilogram", "3");

zindex=10;
function makeNames(names){
    $(".names").empty()
    $.each(names, function(index, value){
        let num = index+1;
        let tag = "index"+index
        $(".names").append("<div class='row name " + tag + "'>"+ value + "</div>");
        let tagClass = "."+tag
        $(tagClass).draggable({ revert: "invalid" });
        hov();
    })
}

function ppcNames(names, divID){
    let divName = "."+ divID  
    console.log("added")
    $(divName).empty()
    $.each(names, function(index, value){
        let num = index+1;
        let tag = "index"+index
        $(divName).append("<div class='row ppcname " + tag + "'>"+ value + "</div>");
        let tagClass = "."+tag
        $(tagClass).draggable({ revert: "invalid" });
    })
}

function makeDrop(id){
    let idName = "."+ id 
    $(idName).droppable({
        accept: ".name",
        classes: {
            "ui-droppable-hover": "darker"
          },
          activeClass: "ui-state-highlight",
                    disabled: false,
        drop: function(event, ui){
            let index=0;
            let value = (ui.draggable).text()
            let answerID = "answer" + id.substring(id.length-1)
            if(QandA.get(value)==document.getElementById(answerID).textContent){
                correct.push(id.substring(id.length-1));
            }
            else{
                wrong.push(id.substring(id.length-1));
            }
            console.log("correct list: "+ correct)
            let list=[]
            list = {value}
            console.log(value)
            for(let i=0; i<employees.length; i++){
                console.log("length "+ employees.length)
                if(employees[i]==value){
                    index=i;
                    break;
                }
            }
            employees.splice(index, 1);
            list2.push(value);
            console.log("list2 " + list2)
            makeNames(employees);
            ppcNames(list,id);
        },
 
    })
}

function submit(correct, wrong){
    $(".next").empty()
    $.each(correct, function(index, value){
        console.log("there are correct " + value)
        let id = "r" +value
        console.log("this is the: " + id)
        document.getElementById(id).classList.remove("drop")
        document.getElementById(id).classList.add("correctDD")
    })
    $.each(wrong, function(index, value){
        console.log("there are correct " + value)
        let id = "r" +value
        console.log("this is the: " + id)
        document.getElementById(id).classList.remove("drop")
        document.getElementById(id).classList.add("wrongDD")
    })

    let new_button=$("<button class='button-6'>Next Question</button>")


    new_button.click(function(){
        location.href = "/end";
    })
    $(".next").append(new_button)

}

function hov(){
    console.log("rannn")
    $(".name").hover(
        function () {
          $(this).addClass("hover");
          $(this).removeClass("wb");
          $(this).css("z-index",zindex++);
        },
        function () {
          $(this).removeClass("hover");
          $(this).addClass("wb");
        }
      );
     
}

$(document).ready(function(){
    makeNames(employees);
    makeDrop("drop1")
    makeDrop("drop2")
    makeDrop("drop3")
    $(".non").droppable({
        accept: ".ppcname",
        classes: {
            "ui-droppable-hover": "darker"
          },
          activeClass: "ui-state-highlight",
                    disabled: false,
        drop: function(event, ui){
            let index;
            let value = (ui.draggable).text();
            let clearName = ".drop" + indexing.get(value)
            $(clearName).empty()
            for(let i=0; i<employees.length; i++){
                if(employees[i]==value){
                    index=i;
                    break;
                }
            }
            // let value = fields[1];
            list2.splice(index, 1);
            employees.push(value);
            console.log("list2 " + list2)
            makeNames(employees);
            ppcNames(list2); 
        },
    })

    $(".submit").click(function(){   
        console.log("bro")             
        submit(correct, wrong)
    })

   

})
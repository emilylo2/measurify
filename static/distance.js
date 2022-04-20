let pvalue=0
$(document).ready(function() {
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

function updateprogress(pvalue){
    updatedistance(pvalue)
    $( "#progressbar" ).progressbar({
        value: pvalue
      });
}

function updatedistance(pvalue){
    let kmvalue=Math.round(pvalue*3.6)
    let milevalue=Math.round(pvalue*2.2)
    let text=kmvalue.toString()+" Kilometers= "+milevalue.toString() +" Miles"
    $( "#dist" ).html(text)
}
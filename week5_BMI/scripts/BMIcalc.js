function calculateBMI(){
    var height = document.frmNewRecordForm.txtHeight.value
    var weight = document.frmNewRecordForm.txtWeight.value
    
    if(weight > 0 && height > 0){
        var finalBmi = (weight/(height*height))*703;
        document.frmNewRecordForm.bmi.value = new Number(finalBmi).toFixed(2)
        
    }else{
        alert ("Please fill in all fields.")
    }
}
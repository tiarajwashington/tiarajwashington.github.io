function commitData() {
  // Declair and initialize the variables
  var eleId;
  var eleDat;
  var loanName=document.form1.name.value;
  var loanAmount=document.form1.amount.value;           
  var intRate=document.form1.rate.value;            
  var numPay=document.form1.numPay.value;
  var loopNum;
  var tagNum;
  var tagNam;
  
  document.write("<table>");
  document.write("<tr><td><table id='datTab'>");
  document.write("<tr><td id='amtLab'>Loan Amount: </td><td id='lamount'></td></tr>");
  document.write("<tr><td id='intLab'>Interest Rate: </td><td id='irate'></td></tr>");
  document.write("<tr><td id='numLab'>Number of Payments:   </td><td id='numPmt'></td></tr>");
  document.write("<tr><td id='monLab'>Monthly Payment: </td><td id='monPmt'></td></tr>");
  document.write("</table></td>");      
  
  document.write("<td><table border="+"1"+" id='pmtTab'><tr style='background-color:DeepSkyBlue'><td id='numHead'>Payment Number</td><td id='oldBal'>Previous Balance</td><td id='pt'>Payment</td><td id='oil'>Interest Paid</td><td id='newBal'>New Balance</td><td id='til'>Total Interest</td></tr>");
  for(var i=1;i<=numPay;i++) {
    loopNum=i;
    tagNam="n"+loopNum.toString(10);
    document.write("<tr style='background-color:LightSkyBlue'><td id=tagNam>"+i+"</td>");
    tagNam="b"+loopNum.toString(10);
    document.write("<td id="+tagNam+"></td>");
    tagNam="p"+loopNum.toString(10);
    document.write("<td id="+tagNam+"></td>")  
    tagNam="oi"+loopNum.toString(10);
    document.write("<td id="+tagNam+"></td>");
    tagNam="nb"+loopNum.toString(10);
    document.write("<td id="+tagNam+"></td>");
    tagNam="ti"+loopNum.toString(10);
    document.write("<td id="+tagNam+"></td></tr>");
  }
  
  document.write("</table></td></tr></table>");
  
  
  displayTableField("lamount",loanAmount);
  displayTableField("irate",intRate);
  displayTableField("numPmt",numPay);
  //Calculate and display the monthly payment amount
  var monPmt=calcMonthly(loanAmount,numPay,intRate);
  displayTableField("monPmt",monPmt);
  // Call the amortization routine
  amortizePmts(loanAmount,intRate,numPay,monPmt);
  return;
}
 
function amortizePmts(loanAmount,intRate,numPay,monPmt) {
  var oldBalance=loanAmount;
  var newBalance=loanAmount;                
  intRate=(intRate/100)/12;             
  var monthly=monPmt;
  var owedInterest=0;
  var totalInterestPd=0;
  var tagNam;
  var dispInt
  // The for loop performs the amortization
  for(var i=1;i<=numPay;i++) {
    var loopNum=i;
    owedInterest=newBalance*intRate;
    dispInt=twoDecimal(owedInterest);
    totalInterestPd=totalInterestPd+owedInterest;
    // Test for the final payment
    if (i<numPay) {
      monthly=twoDecimal(monPmt-dispInt);
      oldBalance=newBalance;
      newBalance=twoDecimal(oldBalance-monthly);
    }
    else {
      monthly=(oldBalance-monthly)+owedInterest;
      oldBalance=newBalance;
      newBalance=0;
      monthly=twoDecimal(monthly);
    }
    tagNam="b"+loopNum.toString(10);
    displayTableField(tagNam,oldBalance);
    tagNam="p"+loopNum.toString(10);
    displayTableField(tagNam,monthly);
    tagNam="oi"+loopNum.toString(10);
    displayTableField(tagNam,dispInt);
    tagNam="nb"+loopNum.toString(10);
    displayTableField(tagNam,newBalance);
    tagNam="ti"+loopNum.toString(10);
    displayTableField(tagNam,twoDecimal(totalInterestPd));
  }
  return;
}
 
function displayTableField(eleId,eleDat) {
  document.getElementById(eleId).innerHTML=eleDat;
  return;
}
 
function calcMonthly(principal,numPay,intRate) {
  var monthly;
  var intRate=(intRate/100)/12;
  var principal;
  // The accounting formula to calculate the monthly payment is
  //    M = P * ((I + 1)^N) * I / (((I + 1)^N)-1)
  // The following code  transforms this accounting formula into JavaScript to calculate the monthly payment
  monthly=(principal*(Math.pow((1+intRate),numPay))*intRate/(Math.pow((1+intRate),numPay)-1));
  return twoDecimal(monthly);
}
 
function twoDecimal(chgVar) {
  var chgVar;
  var twoDec=chgVar.toFixed(2);
  return twoDec;
}
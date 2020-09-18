var handler = function() {
	var rnd = function(n) {
  	return Math.round(n * 100) / 100; // round to 2 digits
  };
	//console.log("The button was clicked.");
  //var principal = document.getElementById('principal').value;
  var principal = Number(document.getElementById('principal').value);
  var interest = Number(document.getElementById('interest').value);
  var months = Number(document.getElementById('months').value);
  //console.log('principal = ', principal);
  //console.log('interest = ', interest);
  //console.log('months = ', months);
  var i = interest / 100.0 / 12;
  var payment = rnd(principal * (i + i / (Math.pow(1+i, months) -1 )));
  console.log('payment = ', payment);
  
  var tabledata = '';
  var m;
  var balance = principal;
  var totalinterest = 0;
  for (m = 1; m < months; m++) {
  	var tointerest = rnd(balance * i);
		// rounding errors accumulate when using floating point numbers
    // 
		totalinterest = rnd(totalinterest + tointerest);    
    var toprincipal = rnd(payment - tointerest);
    balance = rnd(balance - toprincipal);
    
    var row = '<tr>';
    row += '<td>' + m + '</td>';
    row += '<td>$' + toprincipal.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g,"$1,") + '</td>';    
    row += '<td>' + tointerest.toFixed(2) + '%</td>';    
    row += '<td>$' + balance.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g,"$1,") + '</td>';    
    row += '</tr>';
    
    tabledata += row;
    document.getElementById('tbl_result').className = 'show';
  }
	// grab the data or send the html data to the #tbl_body
	document.getElementById('tbl_body').innerHTML = tabledata;
  console.log("Total interest is", totalinterest);
  
  
  return false; // suppress default function
}
document.getElementById('btn_calculate').onclick = handler;

var default_values = function() {
	document.getElementById('principal').value = '21000';
	document.getElementById('interest').value = '0.9';  
	document.getElementById('months').value = '60';  
}
document.getElementById('btn_default').onclick = default_values;
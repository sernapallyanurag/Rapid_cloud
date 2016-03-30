 $(function(){   
 
        $.getJSON('http://127.0.0.1:8082/?callback=?', function(results) {		
		
		//alert(results);
		var array = results.split('~');		
		var array1=array[0].split(',');
		var array2=array[1].split(',');	
		var array3=array[2].split(',');
		var array4=array[3].split(',');
		var array5=array[4].split(',');
		var array6=array[5].split(',');
		var array7=array[6].split(',');
		var len=array1.length;				
		var tr;
        for (var i = 0; i < len; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + array1[i] + "</td>");
			tr.append("<td>" + array2[i] + "</td>");  
			tr.append("<td>" + array3[i] + "</td>");
			tr.append("<td>" + array4[i] + "</td>");
			tr.append("<td>" + array5[i] + "</td>");
			tr.append("<td>" + array6[i] + "</td>");
			tr.append("<td>" + array7[i] + "</td>");
			tr.append("<td><input type='radio' name='select'onclick='test(this)';></input></td>");
            $('table').append(tr);
        } 


    });
    });
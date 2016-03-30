$(function(){        
        $.getJSON('http://127.0.0.1:8081/?callback=?', function(results) {
		
		 var array = results.split('~');
		 var region = array[0].split(',');
		 var os = array[1].split(',');	
			var testDdl = $('#region');
			var testDd2 = $('#os');
			
			for (var i = 0; i < region.length; i++) {
			   var option = $("<option/>");
			   option.attr("value", region[i]).text(region[i]);
			   option.attr("id", region[i]).text(region[i]);
			   testDdl.append(option);
			}
		
		   for (var i = 0; i < os.length; i++) {
			   var option = $("<option/>");
			   option.attr("value", os[i]).text(os[i]);
			   testDd2.append(option);
			}
    });
});
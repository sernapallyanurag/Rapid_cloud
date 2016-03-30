var p_name;
var op;
var arr=[];
function provider(name){
	p_name=name;	
	var data = {};
   data.pname = p_name;
   $.ajax({
     type: 'POST',
	 jsonpCallback: "callback",
     datatype: 'jsonp',
     data: data,	 
     url: 'http://172.29.59.65:3000/temp_region',
     success: function(results) { 
    	 alert(results.length);
	     $('#region1').empty();	   
	   var testDdl = $('#region1');
	   for (var i = 0; i < results.length; i++) {
			   var option = $("<option/>");
			   option.attr("value", results[i]).text(results[i]);
			   option.attr("id", results[i]).text(results[i]);
			   testDdl.append(option);
			}
     },
	 error: function (xhr, status, error){
        console.log('Failure');
		alert("failure");
		},
   });
}	

function node_details(){
		var prov_name=document.getElementById("Provider").value;
		var region1=document.getElementById("region1").value;
		var data = {};
   		data.pname = prov_name;
		data.region=region1;
			$.ajax({
			     type: 'POST',
				 jsonpCallback: "callback",
			     datatype: 'jsonp',
			     data: data,	 
			     url: 'http://172.29.59.65:3000/filter',
			     success: function(results) {				    
				        var len = results.length;	
					 	var tr;
					 	 $('tbody').empty(); 
				        for (var i = 0; i < len; i++) {
				            tr = $('<tr/>');
				            tr.append("<td>" + results[i].inst_type+ "</td>");	
				            tr.append("<td>" + results[i].vcpu+ "</td>");
				            tr.append("<td>" + results[i].memory_gib+ "</td>");
				            tr.append("<td>" + results[i].storage+ "</td>");           
				            tr.append("<td>" + results[i].clock_spd+ "</td>");
				            //tr.append("<td><select style='width: 100px'><option>--Select--</option><option>Data Base</option><option>Web Server</option><option>App Server</option></select></td>");
				            //tr.append("<td><select id='image1' name='image1' class='image1' style='width: 270px'/></td>");
							tr.append("<td><input type='checkbox' name='select'></input></td>");
				            $('table').append(tr);
				        } 
			     },
				 error: function (xhr, status, error){
			        console.log('Failure');
					alert("failure");
					},
  			 }); 
}

 function image2(os){  			
  			 var e = document.getElementById("region1");
			 var region = e.options[e.selectedIndex].value;
			 var data = {};
			   		data.pname = p_name;
					data.os=os;
					data.region=region;
					$.ajax({
						     type: 'POST',
							 jsonpCallback: "callback",
						     datatype: 'jsonp',
						     data: data,	 
						     url: 'http://172.29.59.65:3000/temp_image',
						     success: function(results) {	  
							     $('select#image1').empty();	
							    //alert(results);
							   var testDd2 = $('select#image1');
						
							   for (var i = 0; i < results.length; i++) {
							   
							   			if(results[i] != null)
							   			{
										   var option = $("<option/>");
										   option.attr("value", results[i]).text(results[i]);
										   option.attr("id", results[i]).text(results[i]);
										   testDd2.append(option);
									   }
									}
						     },
							 error: function (xhr, status, error){
						        console.log('Failure');
								alert("failure");
								},
			  			 });
}

function myFunction() {	
	 var values = new Array();
	 var results = new Array();
	 var nodes=[];
	 var j=0;
	 
	 var pv_name = document.getElementById("Provider").value;
	 var rg_name = document.getElementById("region1").value;
	 var img_name = document.getElementById("image1").value;
	 var img_role = document.getElementById("i_roles").value;
	 //alert(img_name);
			$.each($("input[name='select']:checked").closest("td").siblings("td"),
             function () {
                  values.push($(this).text());
              });            
			//alert(values[5]);
			var len=values.length;			
			for(var i=0;i<len;i++)
			{
				if(i % 7 == 0)
				{
					nodes[j]=values[i];
					j++;
				}
			}
			var size=nodes.length;
			if(size != 0)
			{
				alert("You have selected "+size+" nodes");
			}
			else{
					alert("Select the nodes");
				}			
			 document.getElementById("pv_name").innerHTML = pv_name;
			 document.getElementById("pv_region").innerHTML = rg_name;			 			 
			 document.getElementById("inst_name").innerHTML = values[0];
			 document.getElementById("img_role").innerHTML = img_role;
			 document.getElementById("img_name").innerHTML = img_name;
			 
			 var info = {};				
				info.node = values[0];
				info.img_role = img_role;
				info.img_name = img_name;
				arr.push(info);				
}

function saveFunction(){
	
	var info_len=arr.length;
	 var pv_name = document.getElementById("Provider").value;
	 var t_name = document.getElementById("T_name").value;
	 var desc = document.getElementById("desc").value;
	 var date1 = document.getElementById("date").value
	 var rg_name = document.getElementById("region1").value;
		
	 var details=[];
	 details.push(pv_name);
	 details.push(t_name);
	 details.push(desc);
	 details.push(date1);
	 details.push(info_len);
	 details.push(rg_name);
	 var arr1=JSON.stringify(arr);
		$.ajax({
		     type: 'POST',
			 jsonpCallback: "callback",
		     datatype: 'jsonp',
		     data: "d1="+arr1+"&d2="+details,
		     //data: arr,
		     url: 'http://172.29.59.65:3000/temp_store',
		     success: function(results) {
		    	 alert("inserted Successfully");		    
		     },
			 error: function (xhr, status, error){
		        console.log('Failure');
				alert("failure");
				},
			 });

					
}

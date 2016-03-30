




function newfun(el){
	id1 = $(el).closest("tr").find('td:eq(0)').text();
	var id2 = $(el).closest("tr").find('td:eq(1)').text();
	//alert(id2);
	showPopup(id1,id2); 
}




function envbtn(el){
	//alert(el);
	$('#center_right').show();
	var rowCount = $('#deplytable1 tr').length;
	//alert(rowCount);
}

function myFunction(el){
id1 = $(el).closest("tr").find('td:eq(0)').text();		
	//alert(id1);
	data = {};
	data.id = id1;
    $.ajax({
        type: 'POST',
   	 jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
   	 //contentType: 'application/json',
        url: 'http://172.29.59.65:3000/filter_env',
        success: function(data, textStatus) {
        	$('table.center_left_table2 tbody').empty(); 
        var a = [], b = [], prev,newsort= [];
       // alert(b);
        var temp_array = data.split('~');
        var t_id=temp_array[0].split(',');
        var t_name=temp_array[1].split(',');
        var inst_role=temp_array[2].split(',');
        var inst_type=temp_array[3].split(',');
        var inst_id=temp_array[4].split(',');
        var status=temp_array[5].split(',');
        var provider = temp_array[6].split(',');
        var vpc = temp_array[7].split(',');
        var onename;
        onename = t_name.filter(function(elem, pos) {
			return t_name.indexOf(elem) == pos;
		});
        var oneprov;
        oneprov = provider.filter(function(elem, pos) {
			return provider.indexOf(elem) == pos;
		});
        var onevpc;
        onevpc = vpc.filter(function(elem, pos) {
			return vpc.indexOf(elem) == pos;
		});
        var onestatus;
        onestatus = status.filter(function(elem, pos) {
			return status.indexOf(elem) == pos;
		});
		//alert(t_name);
        var newsort = t_name.sort();
        //alert(newsort);
        for ( var i = 0; i < newsort.length; i++ ) {
            if ( newsort[i] !== prev ) {
                a.push(newsort[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = newsort[i];
        }
	//alert(b);
        $('tr#proj_name td.prname').text(id1);
        $('tr#cloud td.cloud').text(oneprov);
        
		var full_len=onename.length;
		//alert(full_len);				
		var tr_new;
		//for (var i=0;i<full_len)
        for (var i = 0; i < full_len; i++) {
           tr_new = $('<tr onClick="newfun(this)"/>');
            tr_new.append("<td>" + onename[i] + "</td>");
            tr_new.append("<td>" + onevpc + "</td>");
            tr_new.append("<td>" + b[i] + "</td>");
            tr_new.append("<td>" + onestatus + "</td>");
            $('table.center_left_table2').append(tr_new);
		
          
        }
        
        
        
        },
   	 error: function (xhr, status, error){
           console.log('Failure');
   		alert("failure");
   		},
      });
    $('#envtog').closest("tr").next().toggle();
}

function tognodes(el){
	
	//alert(el);
	$('div#node_info').hide();
	$('tr.env_row').css("background", "#d9d9d9");
	$('tr#'+el).css("background", "#b3d9ff");
	var newid = el + 1;
	//alert(newid);
	var nele = $(el);
	console.log(nele);
	var $newele = $(el);
	var data = {};
	data.tname = el;
    $.ajax({
        type: 'POST',
   	 jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
   	 //contentType: 'application/json',
        url: 'http://172.29.59.65:3000/popup_nodes',
        success: function(data, textStatus) {
        //alert('success');
        	console.log(data);
        	$('tr#' + newid +" "+ 'td' +" "+ 'div.trnodes').empty();
        	$('tr#' + newid +" "+ 'td' +" "+ 'div.trnodes' +" "+ 'div#app_server').empty();
        	$('tr#' + newid +" "+ 'td' +" "+ 'div.trnodes' +" "+ 'div#web_server').empty();
        	$('tr#' + newid +" "+ 'td' +" "+ 'div.trnodes' +" "+ 'div#data_base').empty();
        	
        	 var temp_array = data.split('~');
             var pinst=temp_array[0].split(',');
             var prole=temp_array[1].split(',');
             var ptype=temp_array[2].split(',');
             var pstatus=temp_array[3].split(',');
             var ptemp=temp_array[4].split(',');
             var onerole;
             onerole = prole.filter(function(elem, pos) {
     			return prole.indexOf(elem) == pos;
     		});
            // alert(onerole.length);
            // var olen = onerole.length;
             //alert(onerole.length);
             for (var i=0;i<onerole.length;i++){
          		var role_id = onerole[i];
          		var div = $('<div class="role_node"></div>');
          		//alert(div);
          		div.attr("id", role_id).text(role_id);
          		$('tr#' + newid +" "+ 'td' +" "+ 'div.trnodes').append(div);
             }
             
             for (var i=0;i<ptemp.length;i=i+4){
         		
         		if(ptemp[i] == "app_server"){
         			//alert(ptemp[i]);
         			var div1 = $('<div class="nodes" onClick="dynode(id)"></div>');
         			var m = i + 2;
         			div1.attr("id", ptemp[m]); 
         			var r = i+3;
         			if(ptemp[r] == "running"){
         				var newattr = div1.attr("id",ptemp[m]);
         				newattr.css('background','green');
         			}
         			else if(ptemp[r] == "stopped"){
         				//alert("stopped");
         				var newattr = div1.attr("id",ptemp[m]);
         				newattr.css('background','#ffdb1a');
         			}
         			else{
         				//alert("terminated");
         				var newattr = div1.attr("id",ptemp[m]);
         				newattr.css('background','#e63900');
         			}
         			$('tr#' + newid +" "+ 'td' +" "+ 'div.trnodes' +" "+ 'div#app_server').append(div1);
         		}
         		else if(ptemp[i] == "web_server"){
         			//alert(ptemp[i]);
         			var div1 = $('<div class="nodes" onClick="dynode(id)"></div>');
         			var m = i + 2;
         			div1.attr("id", ptemp[m]);
         			var r = i+3;
         			if(ptemp[r] == "running"){
         				var newattr = div1.attr("id",ptemp[m]);
         				newattr.css('background','green');
         			}
         			else if(ptemp[r] == "stopped"){
         				//alert("stopped");
         				var newattr = div1.attr("id",ptemp[m]);
         				newattr.css('background','#ffdb1a');
         			}
         			else{
         				//alert("terminated");
         				var newattr = div1.attr("id",ptemp[m]);
         				newattr.css('background','#e63900');
         			}
         			$('tr#' + newid +" "+ 'td' +" "+ 'div.trnodes' +" "+ 'div#web_server').append(div1);
         		}
         		
         		else {
         			//alert(ptemp[i]);
         			var div1 = $('<div  class="nodes" onClick="dynode(id)"></div>');
         			var m = i + 2;
         			div1.attr("id", ptemp[m]);
         			var r = i+3;
         			if(ptemp[r] == "running"){
         				var newattr = div1.attr("id",ptemp[m]);
         				newattr.css('background','green');
         			}
         			else if(ptemp[r] == "stopped"){
         				//alert("stopped");
         				var newattr = div1.attr("id",ptemp[m]);
         				newattr.css('background','#ffdb1a');
         			}
         			else{
         				//alert("terminated");
         				var newattr = div1.attr("id",ptemp[m]);
         				newattr.css('background','#e63900');
         			}
         			$('tr#' + newid +" "+ 'td' +" "+ 'div.trnodes' +" "+ 'div#data_base').append(div1);
         		}
         	}

       		//div.appendTo('#asn_role');
       	
            
        },
      	 error: function (xhr, status, error){
             console.log('Failure');
     		alert("failure");
     		},
        });


	// $('#'+newid).find("div").css("background", "white");
    $('tr#' + newid +" "+ 'td' +" "+ 'div.trnodes').css("background", "#d9d9d9");
     $('#'+newid).find("div").text("Hi");
     //$('tr#'+el ).next().find("div").slideToggle();
     $('tr#' + newid +" "+ 'td' +" "+ 'div.trnodes').slideToggle();
		
	 
}

var instid; 
function dynode(el){
	//alert(el);
	instid = el;
	$('div.nodes').css("boxShadow", "none");
	$('div#' + el).css("boxShadow", "0 0 0 2px black");
	$('div#node_info').show();
	var data={};
	data.nid = el;
    $.ajax({
        type: 'POST',
   	 jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
   	 //contentType: 'application/json',
        url: 'http://172.29.59.65:3000/node_details',
        success: function(data, textStatus) {
        var node_info = JSON.parse(data);
        console.log(node_info[0].inst_type);	
        $('td#inst_type').text(node_info[0].inst_type);
        $('td#role').text(node_info[0].role);
        $('td#cloud').text(node_info[0].prov_id);
        $('td#vpc').text(node_info[0].vpc_name);
        $('td#status').text(node_info[0].status);
        
        if(node_info[0].status == "running")
        {
        	document.getElementById("start").disabled = true;
        	document.getElementById("stop").disabled = false;
        	document.getElementById("terminate").disabled = false;
        	document.getElementById("reboot").disabled = false;
        }
        else if(node_info[0].status == "stopped"){
        	document.getElementById("stop").disabled = true;
        	document.getElementById("start").disabled = false;
        	document.getElementById("terminate").disabled = false;
        	document.getElementById("reboot").disabled = false;
        	
        }
        else{
        	document.getElementById("terminate").disabled = true;
        	document.getElementById("reboot").disabled = true;
        	document.getElementById("start").disabled = true;
        	document.getElementById("stop").disabled = true;
        }
   	   
        },
   	 error: function (xhr, status, error){
           console.log('Failure');
   		alert("failure");
   		},
      });
}

function node_action(el){
	console.log(el);
	console.log(instid);
	if(el == "start"){
		console.log("start");
		var data = {};
		data.instid = instid;
		data.action = "start";
	}	  
	else if(el == "stop"){
		console.log("stop");
		var data = {};
		data.instid = instid;
		data.action = "stop";
	}
	else if(el == "reboot"){
		console.log("reboot");
		var data = {};
		data.instid = instid;
		data.action = "reboot";
	}
	else{
		console.log("terminate");
		var data = {};
		data.instid = instid;
		data.action = "terminate";
	}
	$.ajax({
        type: 'POST',
   	 jsonpCallback: "callback",
        datatype: 'jsonp',
        data: data,
   	 //contentType: 'application/json',
        url: 'http://172.29.59.65:3000/manage_env_nodes',
        success: function(data, textStatus){
        	},
        	 error: function (xhr, status, error){
                 console.log('Failure');
         		alert("failure");
         		},
            });	
        
}
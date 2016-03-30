var roles=[];
jQuery(document).ready(function() {	 	 
	 document.getElementById("create_button").disabled = true; 
	 var url = document.location.href,
     params = url.split('?')[1].split('&'),
     data = {}, tmp;
	  for (var i = 0, l = params.length; i < l; i++) {
	       tmp = params[i].split('=');
	       data[tmp[0]] = tmp[1];
	  }
	  var str = data.data;
	  var store1 = str.replace(/%22/g, ""); 
	  var template={};
	  template.tname=store1;
	  $.ajax({
		     type: 'POST',
			 jsonpCallback: "callback",
		     datatype: 'jsonp',
		     data: template,	 
		     url: 'http://172.29.59.65:3000/pvd_template',
		     success: function(results) { 			   
		    	 roles=results[0].Template_Role;		    	
		    	 display_roles();
		    	 },
			 error: function (xhr, status, error){
		        console.log('Failure');
				alert("failure");
				},
		   });
	  
	
	  jQuery(".content1").hide();
	  jQuery(".content2").hide();
	  jQuery(".content").hide();
	  jQuery(".node_details").hide();
	  jQuery("#btns").hide();
	  jQuery("#brief_info").hide();		  
	  
	  $('.pname').click(function(){
		    $(this).parent().find('.pname').css('background-color','none');
		    $(this).css('background-color','#87CEFA');
		});
	  $(document).on('click', '.pname', function(){ 
		  $(this).parent().find('.pname').css('background-color','none');
		    $(this).css('background-color','#87CEFA');
		 });
	  $(document).on('click', 'tr.node1', function(){ 
		  $(this).parent().find('tr.node1').css('background-color','none');
		    $(this).css('background-color','#808080');
		 });
	  $(document).on('click', '.role', function(){ 
		  $(this).parent().find('.role').css('boxShadow','none');
		    $(this).css('boxShadow','4px 4px 4px 4px #87CEFA');
		 });
	  
	  
	  jQuery(".heading").click(function()
			  {
			    jQuery(this).next(".content1").slideToggle(500);
			  });
	  
	  jQuery(".heading").click(function()
			  {
			    jQuery(this).next(".content2").slideToggle(500);
			  });
	  jQuery(".heading").click(function()
			  {
			    jQuery(this).next(".content").slideToggle(500);
			  });
	});
var p_name;
function region_function(name){	
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
	     $('#content2').empty();	   
	   var testDdl = $('#content2');
	   for (var i = 0; i < results.length; i++) {
			   var option = $('<p class="pname" onclick="function_region(this.id)"/>');
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
function display_roles()
{		
	for(var i=0;i<roles.length;i++)
		{		
			if(roles[i].role == "Database")
				{					
					var div = $('<div class="role" onclick="assign_node(this.id)"></div>');
					div.attr("id", roles[i].role).text(roles[i].role); 
					div.appendTo('#Selected_role');	
					document.getElementById(roles[i].role).style.backgroundImage="url(/images/Database.jpg)";
				}else if(roles[i].role == "WebServer"){
					var div = $('<div class="role" onclick="assign_node(this.id)"></div>');
					div.attr("id", roles[i].role).text(roles[i].role); 
					div.appendTo('#Selected_role');	
					document.getElementById(roles[i].role).style.backgroundImage="url(/images/web.jpg)";
				}else if(roles[i].role == "ApplicationServer"){
					var div = $('<div class="role" onclick="assign_node(this.id)"></div>');
					div.attr("id", roles[i].role).text(roles[i].role); 
					div.appendTo('#Selected_role');	
					document.getElementById(roles[i].role).style.backgroundImage="url(/images/app-2.jpg)";
				}else{
					var div = $('<div class="role" onclick="assign_node(this.id)"></div>');
					div.attr("id", roles[i].role).text(roles[i].role); 
					div.appendTo('#Selected_role');	
					document.getElementById(roles[i].role).style.backgroundImage="url(/images/other.png)";
				}
		}	
}
//window.onload=display_roles;
var node_role;
function assign_node(role){
	
			for(var i=0;i<temp_info.length;i++)
				{					
					if(temp_info[i].role==role)
						{
							if (confirm('Role is configured.You want to change?')) {
								 jQuery("#brief_info").hide();
								temp_info.splice(i,1);								
							    continue;
							} else {
							    return;
							}							
						}					
				}
			node_role = role;
		   $('#assign_role').show();	
		   $('td#role').text(role);
		   //$('#ram_size').empty();
		   //$('#disk').empty();
		   //jQuery(".node_details").hide();
		   var img_info = [];
		   for(var j=0;j<roles.length;j++)			   {	
			   		
			   		if(roles[j].role == role)
			   			{			   				
			   				 img_info[j]= roles[j];			   				
			   				 display_image(img_info.length);
					   		$('td#os').text(roles[j].os);
					   		$('td#version').text(roles[j].version);
					   		$('td#attribute').text(roles[j].attribute);
			   			}			   		
			   }
		   document.getElementById(role).style.boxShadow = "4px 4px 4px 4px #87CEFA";

}

function display_image(img_len){
	var img=img_len-1;	
	var os=roles[img].os;
	var version = roles[img].version;
	var attribute = roles[img].attribute;
	if(p_name)
	var img_data = {};
	img_data.os = os;
	img_data.version = version;
	img_data.attribute = attribute;
	img_data.region = reg_name;
	img_data.provider = p_name;
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: img_data,	 
	     url: 'http://172.29.59.65:3000/temp_image',
	     success: function(results) {   	
		     //alert(results);
		     $('#sel_image').empty();	   
			   var testDdl = $('#sel_image');
			   select_clear(testDdl);
			   for (var i = 0; i < results.length; i++) {
					   var option = $('<option/>');
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
function select_clear(el){
	var testDdl = $(el);
 	var option = $("<option/>");
	   option.attr("value", "").text("--Select--");
	   option.attr("id", "").text("--Select--");
	   testDdl.append(option);
}

var nodes=[];
var reg_name;
function function_region(rg_name){	
	reg_name = rg_name;	
	 var data={};
	data.pname=p_name;
	data.region=reg_name;
	var arr1=[];
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: data,	 
	     url: 'http://172.29.59.65:3000/filter',
	     success: function(results) {
	    	 nodes=results;
	    	 var len=results.length;
	    	 var vcpu=[];
	    	 for(var i=0;i<len;i++)
	    		 {
	    		 	vcpu[i]=results[i].vcpu;
	    		 }
	    	 	arr1 = vcpu.filter(function(elem, pos) {
					return vcpu.indexOf(elem) == pos;
				})			
				$('select#cpu').empty();
	    	 	var testDdl = $('select#cpu');
	    	 	select_clear(testDdl);	    	 
				for(var j=0;j<arr1.length;j++)
					{
						var option = $("<option/>");
					   option.attr("value", arr1[j]).text(arr1[j]);
					   option.attr("id", arr1[j]).text(arr1[j]);
					   testDdl.append(option);					
					}				
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
		 });	
}

var cpu;
function function_core(core){	
	cpu=core;
	var ram=[];
	var arr2=[];
	$('select#ram_size').empty();
 	var testDd2 = $('select#ram_size');
 	select_clear(testDd2);
	for(var j=0;j<nodes.length;j++)
		{
			if(nodes[j].vcpu == core)
				{
					ram[j] = nodes[j].memory_gib;						
				}					
		}
	arr2 = ram.filter(function(elem, pos) {
		return ram.indexOf(elem) == pos;
		})
		for(var k=0;k<arr2.length;k++)
		{
			var option = $("<option/>");
			option.attr("value", arr2[k]).text(arr2[k]);
			option.attr("id", arr2[k]).text(arr2[k]);
			testDd2.append(option);
		}
	
}
var ram_size;
function function_ram(size){
	ram_size=size;
	$('select#disk').empty();
 	var testDd2 = $('select#disk');
 	select_clear(testDd2);
	for(var i=0;i<nodes.length;i++)
		{
			if(nodes[i].vcpu == cpu && nodes[i].memory_gib == ram_size)
				{
					
					var option = $("<option/>");
					option.attr("value", nodes[i].storage).text(nodes[i].storage);
					option.attr("id", nodes[i].storage).text(nodes[i].storage);
					testDd2.append(option);
				}
		}
}

function function_disk(disk_size){
	 $('#node_details').show();
	 var disk = disk_size;
	 var final_nodes=[];	
	 $('#node_table tbody').empty();	 
	 for(var i=0;i<nodes.length;i++)
		{
			if(nodes[i].vcpu == cpu && nodes[i].memory_gib == ram_size && nodes[i].storage == disk)
				{					
					tr = $('<tr class="node1" onclick="get_nodes(this.id)"/>');
					tr.attr("id", "row"+i);
		            tr.append("<td>" + nodes[i].inst_type+ "</td>");	
		            tr.append("<td>" + nodes[i].vcpu+ "</td>");
		            tr.append("<td>" + nodes[i].memory_gib+ "</td>");
		            tr.append("<td>" + nodes[i].storage+ "</td>");	            
		            $('table#node_table').append(tr);					 
				}
		}	 
}
var sel_img;
function get_image(img){
	sel_img = img;
}
var node;
function get_nodes(el){		
	 node = $('tr#'+el).closest("tr").find('td:eq(0)').text(); 
}
var temp_info=[];
var count=0;
function save_info(){
	
			var role_info={};
			role_info.node=node;
			role_info.image=sel_img;
			role_info.role=node_role;			
			temp_info.push(role_info);
			alert("Configuration saved");			
			if(roles.length == temp_info.length)
			{
				$('#btns').show();
			}		
						assign_node(roles[count+1].role);	
						count++;
						if(count > temp_info.length)
							{
								count=0;
							}
							
}

function view_function(){	
	if (document.getElementById('assign_role')) {

        if (document.getElementById('assign_role').style.display == 'none') {
            document.getElementById('assign_role').style.display = 'block';
            document.getElementById('brief_info').style.display = 'none';
        }
        else {
            document.getElementById('assign_role').style.display = 'none';
            document.getElementById('brief_info').style.display = 'block';
        }
    }
    $('#template_info_table tbody').empty();
	for(var i=0;i<temp_info.length;i++)
		{
		tr = $('<tr/>');
        tr.append("<td>" + temp_info[i].role+ "</td>");	
        tr.append("<td>" + temp_info[i].node+ "</td>");
        tr.append("<td>" + temp_info[i].image+ "</td>");      	            
        $('table#template_info_table').append(tr);			
		}
}

function save_all_info(){
	var arr1=JSON.stringify(temp_info);
	var tname=document.getElementById('t_name').value;	
	var arr2=[];
	arr2.push(p_name);
	arr2.push(reg_name);
	arr2.push(length);
	arr2.push(tname);
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: "d1="+arr1+"&d2="+arr2,	     
	     url: 'http://172.29.59.65:3000/temp_store',
	     success: function(results) {
	    	 var msg = "Template Saved";
	    	 showPopup(msg);
	    	 //location.reload();
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
		 });	
}

function pvd_name_check(name){
	$.getJSON("http://172.29.59.65:3000/pvd_check", function(data){
		for(var i=0;i<data.length;i++)
			{
				if(name != data[i].Template_name)
					{
					$('#create_button').prop('disabled', false);
					}
				else {
					var msg1="Template Name Already Exists";					
					showPopup(msg1);
					//form.template.focus();
					$('#create_button').prop('disabled', true);
				}
			}
	});
}
function showPopup(te_name){	
	var data = {};
	data.tname = te_name;
	
  $("#popup").dialog({
                width: 300,
                height: 250,
                open: function(){
                
                   $(this).find("p.tname").html(te_name)
                }
            });
    

}











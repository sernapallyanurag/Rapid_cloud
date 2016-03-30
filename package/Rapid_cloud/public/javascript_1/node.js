var qu1 = document.querySelector("[role='template1']");
var myTemplate_images1 = [];
var inst_type = [];
var cloud = [];
var vcpu= [];
var ram = [];
var storage = [];
$('#Node').click(function(){
	$("#view_temp").hide();
	$("#single_node").show();
	$("[role='template1']").show();
	$.getJSON( "http://172.29.59.65:3000/all_nodes", function( data ) {		
		for(var i=0;i<data.length;i++)
			{
				inst_type[i] = data[i].inst_type;
				cloud[i] = data[i].prov_id;
				vcpu[i] = data[i].vcpu;
				ram[i] = data[i].memory_gib;
				storage[i] = data[i].storage;
			}		
		 for(var j=0;j<inst_type.length;j++)
		 {
		    if(cloud[j] == "AWS")
		    	{
		    		myTemplate_images1.push("AWS_Logo.png");
		    	}
		    else
		    	{
		    		myTemplate_images1.push("Windows_Azure_Logo.png");
		    	}
		 }		
			show_nodes();
	});		
});

function show_nodes(){	
	$(qu1).empty();
	for(var i=0;i<=inst_type.length-1;i++){		
	qu1.innerHTML+=
	            "<div  id='node_div' class='col-xs-12 col-sm-4 col-md-4 col-lg-3 "+cloud[i]+" '>"
				+"<article class='flip'>"
				+"<div class='card'>"
				+"<div class='face front'>"
				+"<figure><img src='images_1/"+ myTemplate_images1[i] +"' /></figure>"
				+"<summary>"+ inst_type[i] +"</summary>"
				+"<ul>"
				+"<li>Cloud: "+cloud[i]+"</li>"				
				+"<li>Type: <span>"+inst_type[i]+"</span></li>"				
				+"</ul></div>"
				+"<div class='face back' id='"+inst_type[i]+"'><span class='"
				+"glyphicon glyphicon-remove-circle closeTemplate'></span>Node:<input class='inPut' value='"+inst_type[i]+"' type='text' disabled='disabled' /><br><br><b>Node Deatails</b><br>" 
				+"<table>"
				+"<tr><th>VCPU:</th><td> "+vcpu[i]+"</td></tr>"				
				+"<tr><th>RAM:</th><td> "+ram[i]+" </td></tr>"
				+"<tr><th>Storage:</th><td> "+storage[i]+" </td></tr>"
				+"</table>"
				+"<br><input type='button' name='Node_deploy' value='Deploy' onclick='nodeDeploy_function("+ inst_type[i] +")' />"
				+"</div></div></article>";
	}
	var i=1;
	$('.flip').click(function(event){
		//console.log(this);
		event.stopPropagation();
		$(this).css({"z-index":i++});
		$('.card').removeClass('flipped');
		$(this).find('.card').addClass('flipped');
		//return false;
	});
	$(".closeTemplate").click(function(event){
		//console.log(this);
		event.stopPropagation();
		$('.card').removeClass('flipped');
		//$(".card").removeClass();
	})
}
$('input#search1').keyup(function() {
    
	var filter1 = $(this).val();	
	var count = 0;
	$('div#node_div').each(function(){
		var style1 = $(this).css('display');
		if(style1 == "block")
		{		
			count++;
			if ($(this).text().search(new RegExp(filter1, "i")) < 0) {        	
	            $(this).fadeOut();
	        } else {        	
	            	$(this).show();            
	        		}
		}		
    });	
});

function nodeDeploy_function(value){
	alert(value);
}
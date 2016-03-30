jQuery(document).ready(function() {
	  jQuery(".layer1").hide();
	  jQuery("#show_gen_info").hide();
	  jQuery("#show_my_info").hide();	  
	  jQuery("#detais").hide();	 
	  jQuery(".template").click(function()
			  {
			    jQuery(this).next(".layer1").slideToggle(500);
			  });
	  $(document).on('click', '.gen_temp_details', function(){ 
		  $(this).parent().find('.gen_temp_details').css('boxShadow','none');
		    $(this).css('boxShadow','4px 4px 4px 4px #87CEFA');
		 });
	  $(document).on('click', '.my_temp_details', function(){ 
		  $(this).parent().find('.my_temp_details').css('boxShadow','none');
		    $(this).css('boxShadow','4px 4px 4px 4px #87CEFA');
		 });
});

	



function mytemp(el){
	$('#view_template').hide();
	jQuery("#show_gen_info").hide();
	jQuery("#show_my_info").hide();
	if(document.getElementById("cretemp").value=="+")
		{
	document.getElementById("cretemp").value="-";
	$('#gen_temp').show();
	$('#pro_temp').show();
		}
	else {
		document.getElementById("cretemp").value="+";
		$('#gen_temp').hide();
		$('#pro_temp').hide();
		$('#upt').hide();
		$('select_attr').hide();
	}
}



function test_name(value){ 	
	$.getJSON("http://172.29.59.65:3000/name_check", function(data){
		for(var i=0;i<data.length;i++)
			{
				if(value != data[i].Template_name)
					{
					$('.sbtn').prop('disabled', false);
					}
				else {
					alert("Template Name Already Exists");
					form.template.focus();
					$('.sbtn').prop('disabled', true);
				}
			}
	});
	
}


function nodes(el){
	document.getElementById("btn").value
	$('#ndisp').show();
}
var my_template=[];
var gen_template=[];
function view_temp(){
	$('#view_template').show();
	$('.select_attr').hide();
	$('#gen_temp').hide();

	$('#my_temp_info').empty();
	$.getJSON( "http://172.29.59.65:3000/my_view", function( data ) {	
		my_template = data;
		for(var i=0;i<data.length;i++)
			{
			var div = $('<div class="my_temp_details" onclick="my_temp_info(this.id)"></div>');
			div.attr("id", data[i].Template_name).text(data[i].Template_name); 
			div.appendTo('#my_temp_info');
			}
	 });


	$('#gn_temp_info').empty();
	$.getJSON( "http://172.29.59.65:3000/gen_view", function( data1 ) {
		gen_template = data1;
		for(var i=0;i<data1.length;i++)
			{
			var div = $('<div class="gen_temp_details" onclick="gen_temp_info(this.id)"></div>');
			div.attr("id", data1[i].Template_name).text(data1[i].Template_name); 
			div.appendTo('#gn_temp_info');
			}
		  });	
}
var temp;
function gen_temp_info(value){
	temp=value;	
	$("#show_my_info").hide();
	$('#show_gen_info').show();
	$('.table_gen_info tbody tr td').empty();	
	var td;
	var tr;
	for(var i =0;i<gen_template.length;i++)
		{				
			if(temp == gen_template[i].Template_name)
				{						
				 	td = $('<td/>');
					td.attr("id", gen_template[i].Template_name).text(gen_template[i].Template_name);
		            $('tr.gen_role_info	').append(td);
					var te_roles = gen_template[i].Template_Role;
					$('.table_gen_nodes tbody').empty();
					for(var j=0;j<te_roles.length;j++)
						{
						 	tr = $('<tr/>');
				            tr.append("<td>" + te_roles[j].role + "</td>");
				            tr.append("<td>" + te_roles[j].os + "</td>");
				            tr.append("<td>" + te_roles[j].attribute + "</td>");
				            tr.append("<td>" + te_roles[j].version + "</td>");
				            $('.table_gen_nodes').append(tr);
							
						}					
				}
		}	
}

function create_pvd_temp(){
	location.href="//172.29.59.65:3000/create_template2"+"?data="+temp;
}
var temp1;
function my_temp_info(value1){
	temp1=value1;
	$("#detais").hide();
	$("#show_gen_info").hide();
	$("#show_my_info").show();
	
	$('.table_my_info tbody tr td').empty();	
	 var td1,td2,td3;		
		for(var i =0;i<my_template.length;i++)
			{			
				if(temp1 == my_template[i].Template_name)
					{					    
					 	td1 = $('<td/>');
						td1.attr("id", my_template[i].Template_name).text(my_template[i].Template_name);
			            $('tr.my_role_info1').append(td1);
			            td2 = $('<td/>');
						td2.attr("id", my_template[i].Cloud).text(my_template[i].Cloud);
			            $('tr.my_role_info2').append(td2);	
			            td3 = $('<td/>');
						td3.attr("id", my_template[i].Region).text(my_template[i].Region);
			            $('tr.my_role_info3').append(td3);
			            var te_nodes = my_template[i].Instances;
						$('.table_my_nodes tbody').empty();
						for(var j=0;j<te_nodes.length;j++)
							{
							 	tr = $('<tr/>');
					            tr.append("<td>" + te_nodes[j].node + "</td>");
					            tr.append("<td>" + te_nodes[j].role + "</td>");
					            tr.append("<td>" + te_nodes[j].image + "</td>");
					            $('.table_my_nodes').append(tr);
								
							}
					}
			}	
}

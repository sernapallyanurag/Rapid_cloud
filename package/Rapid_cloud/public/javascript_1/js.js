

function isIE () {	
  var myNav = navigator.userAgent.toLowerCase();
  ieVer = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  if(ieVer){
	  (function populateStorage() {
		  localStorage.setItem('bgcolor', '#DDDDDD');
		  localStorage.setItem('font', 'Segoe UI');
		}());
		currentColor = localStorage.getItem('bgcolor');
		document.getElementById("bg").style.backgroundColor = currentColor;
  }
}

$('#Templates').click(function(){
	$("#view_temp").show();
	//$("#single_node").hide();
});
var tempName = [];
var region = [];
var tempType = [];
var nodes = [];
var cloud = [];
var myTemplate_images = [];
$.getJSON( "http://172.29.59.65:3000/my_view", function( data ) {	
               result=data;              
		for(var j=0;j<data.length;j++)
			{		
				tempName[j] = data[j].Template_name;
				region[j] = data[j].Region;
				tempType[j] = data[j].Template_type;
				nodes[j] = (data[j].Instances).length;
				cloud[j] = data[j].Cloud;					
			}
		
		 for(var j=0;j<cloud.length;j++)
		 {
		    if(cloud[j] == "AWS")
		    	{
		    		myTemplate_images.push("AWS_Logo.png");
		    	}
		    else
		    	{
		    		myTemplate_images.push("Windows_Azure_Logo.png");
		    	}
		 }		 
		assign_myTemplate();
		myTemp_details();
	});

$.getJSON( "http://172.29.59.65:3000/gen_view", function( data ) {	
	result1=data;
	tempName.splice(0,tempName.length);
	region.splice(0,region.length);
	tempType.splice(0,tempType);
	nodes.splice(0,nodes.length);
	for(var j=0;j<data.length;j++)
		{		
			tempName[j] = data[j].Template_name;
			region[j] = data[j].Region;
			tempType[j] = data[j].Template_type;
			nodes[j] = (data[j].Template_Role).length;	
		}
	assign_generic();
	generic_details();
});


function assign_myTemplate(){
	var qu = document.querySelector("[role='template']");
	for(var i=0;i<=tempName.length-1;i++){		
	qu.innerHTML+=
	            "<div id='gen_div' class='col-xs-12 col-sm-4 col-md-4 col-lg-3 "+tempType[i]+" '>"
				+"<article class='flip'>"
				+"<div class='card'>"
				+"<div class='face front'>"
				+"<figure><img src='images_1/"+ myTemplate_images[i] +"' /></figure>"
				+"<summary>"+ tempName[i] +"</summary>"
				+"<ul>"
				+"<li>Cloud: "+cloud[i]+"</li>"
				+"<li>Region: "+region[i]+"</li>"
				+"<li>Type: <span>"+tempType[i]+"</span></li>"
				+"<li>Node: "+nodes[i]+"</li>"
				+"</ul></div>"
				+"<div class='face back' id='"+tempName[i]+"'><span class='"
				+"glyphicon glyphicon-remove-circle closeTemplate'></span>Nodes:<input class='inPut' value='"+nodes[i]+"' type='text' disabled='disabled' /><br><br><b>Role Deatails</b>" +
						"<table border='0' class='my_info'><thead><tr><th>Node </th><th>Role </th></tr></thead><tbody></tbody></table>"
				+"<br><input type='button' value='Modify'/>&nbsp;<input type='button' value='Deploy' onclick='pvdSpec_function("+tempName[i]+")' />"
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
$('#Templates').click(function(){
	$("[role='template']").show();
});

function pvdSpec_function(myT){	
	var template = myT.id;
	//alert("Disabled the functions....!");
	location.href="//172.29.59.65:3000/deployTemplate"+"?data="+template;
}

$('#manageEnv').click(function(){
	location.href="//172.29.59.65:3000/manageEnv";
})


function myTemp_details(){
	for (var i=0;i<result.length;i++)
	{	
		var tr;
		var tag=result[i].Template_name;
		var te_nodes1=result[i].Instances;
		for(var k=0;k<te_nodes1.length;k++)
			{				
				tr = $('<tr/>');
	            tr.append("<td>" + te_nodes1[k].node + "</td>");
	            tr.append("<td>" + te_nodes1[k].role + "</td>");			           
	            $('div#'+tag+" "+'table.my_info').append(tr);
			}
	}
}

function assign_generic(){
	var qu1 = document.querySelector("[role='template']");
	//console.log(tempName);
	var img=["generic_Template.png"];		
	
	for(var i=0;i<=tempName.length-1;i++){
		qu1.innerHTML+=
		            "<div id='gen_div' class='col-xs-12 col-sm-4 col-md-4 col-lg-3 "+tempType[i]+" '>"
					+"<article class='flip'>"
					+"<div class='card'>"
					+"<div class='face front'>"
					+"<figure><img src='images_1/"+ img[0] +"' /></figure>"
					+"<summary>"+ tempName[i] +"</summary>"
					+"<ul>"
					+"<li>Type: <span>"+tempType[i]+"</span></li>"
					+"<li>Roles: "+nodes[i]+"</li>"
					+"</ul></div>"
					+"<div class='face back' id='"+tempName[i]+"'><span class='"
					+"glyphicon glyphicon-remove-circle closeTemplate'></span>Roles:<input class='inPut' value='"+nodes[i]+"' type='text' disabled='disabled'/><br><br><b>Role Details</b>"+
					"<table border='0' class='gen_info'><thead><tr><th>Role </th></tr></thead><tbody></tbody></table>"
					+"<br><input type='button' value='Modify' />&nbsp;<input type='button' onclick='genereic_function("+tempName[i]+")' value='Deploy' />"
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

function genereic_function(genT){
	//alert("Disabled the functions....!");
	var genTemplate = genT.id
	location.href ="http://172.29.59.65:3000/assignNode"+"?data="+genTemplate;
}

function generic_details(){
	for (var i=0;i<result1.length;i++)
	{	
		var tr;
		var tag=result1[i].Template_name;
		var te_nodes1=result1[i].Template_Role;
		for(var k=0;k<te_nodes1.length;k++)
			{				
				tr = $('<tr/>');	           
	            tr.append("<td>" + te_nodes1[k].role + "</td>");			           
	            $('div#'+tag+" "+'table.gen_info').append(tr);
			}
	}
}

$('input#search').keyup(function() {
 
	var filter = $(this).val();
	var count = 0;
	$('div#gen_div').each(function(){		
		var style = $(this).css('display');
		if(style == "block")
		{						
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {        	
	            $(this).fadeOut();
	        } else {        	
	            $(this).show();            
	        }
		}     
    });	
});

$('button#create_temp').click(function(){
	location.href="http://172.29.59.65:3000/create_template"
});

var fadeSpped="speed";

function aTemp(){
	document.getElementById("search").value="";
	var showThis = document.querySelectorAll(".My, .Generic, .System");
	$(showThis).stop().show(fadeSpped);
}

function mTemp(){
	document.getElementById("search").value="";
	var hideThis = document.querySelectorAll(".Generic, .System");
	var showThis = document.querySelectorAll(".My");
	$(hideThis).stop().hide(fadeSpped);
	$(showThis).stop().show(fadeSpped);
}
function gTemp(){
	document.getElementById("search").value="";
	var hideThis = document.querySelectorAll(".My, .System");
	var showThis = document.querySelectorAll(".Generic");
	$(hideThis).stop().hide(fadeSpped);
	$(showThis).stop().show(fadeSpped);
}

function sTemp(){
	document.getElementById("search").value="";
	var hideThis = document.querySelectorAll(".My, .Generic");
	var showThis = document.querySelectorAll(".System");
	$(hideThis).stop().hide(fadeSpped);
	$(showThis).stop().show(fadeSpped);
}
function aTemp1(){
	document.getElementById("search1").value="";
	var showThis = document.querySelectorAll(".AWS, .Azure");
	$(showThis).stop().show(fadeSpped);
}

function mTemp1(){
	document.getElementById("search1").value="";
	var hideThis = document.querySelectorAll(".Azure");
	var showThis = document.querySelectorAll(".AWS");
	$(hideThis).stop().hide(fadeSpped);
	$(showThis).stop().show(fadeSpped);
}
function gTemp1(){
	document.getElementById("search1").value="";
	var hideThis = document.querySelectorAll(".AWS");
	var showThis = document.querySelectorAll(".Azure");
	$(hideThis).stop().hide(fadeSpped);
	$(showThis).stop().show(fadeSpped);
}

$(document).ready(function(){	
	$("#single_node").hide();	
	$("[name='filter']").parent().addClass("normalOp");
	$("[value='ATemplates']").parent().addClass("selectedOp");
	$("[name='filter']").click(function(){
		$(".selectedOp").removeClass().addClass("normalOp");
		$(this).parent().addClass("selectedOp");
		var valu = $(this).val();
		console.log(valu);
		valu == "ATemplates"?aTemp():false;
		valu == "MTemplates"?mTemp():false;
		valu == "GTemplates"?gTemp():false;
		valu == "STemplates"?sTemp():false;
	});	
	$("[name='filter1']").parent().addClass("normalOp");
	$("[value='ATemplates']").parent().addClass("selectedOp");
	$("[name='filter1']").click(function(){
		$(".selectedOp").removeClass().addClass("normalOp");
		$(this).parent().addClass("selectedOp");
		var valu = $(this).val();
		console.log(valu);
		valu == "ATemplates"?aTemp1():false;
		valu == "MTemplates"?mTemp1():false;
		valu == "GTemplates"?gTemp1():false;		
	});
});














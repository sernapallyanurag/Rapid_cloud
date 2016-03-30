window.onload = function(){
	getTemplateName();
	
}
var templates = [];
var os= []
var img =["aws_logo.png"]
function getTemplateName(){
	$(function(){	
		var url = document.location.href,
	     params = url.split('?')[1].split('&'),
	     data = {}, tmp;
		  for (var i = 0, l = params.length; i < l; i++) {
		       tmp = params[i].split('=');
		       data[tmp[0]] = tmp[1];
		  }
		  var str = data.data;
		  var template={};
		  template.tname=str;
		  $.ajax({
			     type: 'POST',
				 jsonpCallback: "callback",
			     datatype: 'jsonp',
			     data: template,	 
			     url: 'http://172.29.59.65:3000/gen_template',
			     success: function(results) {
			    	 templates = results[0].Template_Role;
			    	 os = results[0].os
			    	 //console.log(templates[0].role);
			    	 tr = $('<tr/>');	
			            tr.append("<td><span style='font-size:18px;font-weight:bold;'><span class='deploytempNa'>Name : </span>"+results[0].Template_name+"</span></td>");
			            $('table.temp_info1').append(tr);
			    	 
			    	 templateDetails();
			    	 },
				 error: function (xhr, status, error){
			        console.log('Failure');
					alert("failure");
					},
			   });		  
	});

}

function templateDetails(){
	var id = document.getElementById("assign");
	for(var i=0;i<=templates.length-1;i++){	
		id.innerHTML+=
					"<table class='borderspace'>"
					+"<tr>"
					+"<td class='tdBackground' style=''vertical-align:middle;'>"
					+"<img src='images_1/"+templates[i].role+".png'/>"
					+"</td>"
					+"<td rowspan='2' class='nodeconfigBg'>"
					+"<table>"
					+"<tr>"
					+"<td><b>Node Configuration</b></td>"
					+"</tr>"
					+"<tr><td>"
					+"<div id='noDEpullL' class='pull-left'><span></span><label id='' class='labelTemp'><span>CPU</span></label><div id='sel"+i+"' class='clickRole forWid'><span>Select</span><ul id='sels"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div>"
					+"</td></tr>"
					+"<tr><td>"
					+"<div id='noDEpullL' class='pull-left'><span></span><label id='' class='labelTemp'><span>RAM(GB)</span></label><div id='sell"+i+"' class='clickRole forWid'><span>Select</span><ul id='sells"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div>"
					+"</td></tr>"
					+"</table></td>"
					+"<td rowspan='2' class='selectNode'>"
					+"<table><tr>"
					+"<td><b>Select Node</b></td>"
					+"</tr>"
					+"<tr><td><table class='nodeSel' id='nodeSel"+i+"'><tr><th>Inst_Name</th><th>VCPU</th><th>RAM</th><th>Storage</th></tr><tr><td>--</td><td>--</td><td>--</td><td>--</td></tr></table></td></tr>"
					+"<tr><td>"
					+"<div id='noDEpullL' class='pull-left'><span></span><label id='' class='labelTemp'><span>Image</span></label><div id='selll"+i+"' class='clickRole forWid'><span>Select</span><ul id='sellls"+i+"' class='dropDown'></ul><span id='' class='glyphicon glyphicon-chevron-down pull-right'><span></span></span></div></div>"
					//+"<button class='buttonSm' onclick='submit_fun("+i+" )'style='margin-top: 35px;margin-left:10px;'>Submit</button>"
					+"</td></tr></table>"
					+"</td></tr>"
					+"<tr>"
					+"<td class='tdBeBackground'>Role : "+templates[i].role+"<br/>OS: "+templates[i].os+" </td>"
					+"</tr></table>"
					+"<div style='clear:both;'>&nbsp;</div>"
	}
	$(".clickRole").click(function(){		
		$(this).find(".dropDown").slideToggle();
		//$(".card").removeClass();
	})
}
$('#Templates2').click(function(){
	location.href="http://172.29.59.65:3000/master_2"
});
	$(document).ready(function(){
	$(".alert").hide();	
	$("[role='profileLinks']").hide();
	$("[role='aboutProject']").click(function(){
		$(".arrowRed").toggleClass('rotate', 1000).promise().done(function(){
			$("[role='profileLinks']").stop().slideToggle();
		});
	});
	
	$("[role='naviGation'] ul li dl").hide();
	$("[role='naviGation'] ul li:first-child dl").addClass("show").show();
	
	$("[role='naviGation'] ul li").click(function(event){
		event.stopPropagation();
		//closeOldmenu();
		console.log("Li clicked");
		$(this).children("dl").stop().slideToggle();
		$(this).children("a").toggleClass("activeTab");
		$(this).children("a").find(".arrowGray").toggleClass("rotateGray");
		$(this).children("dl").toggleClass("show");
	});
	function closeOldmenu(){
		$(".arrowGray").removeClass("rotateGray");
		$(".show").stop().slideUp();
		$(".show").removeClass();
		$(".activeTab").removeClass();
		console.log("Closed Tab");
	}
	
	$("[role='naviGation'] ul li dl dt").click(function(event){
		event.stopPropagation();
		$("[role='naviGation'] ul li dl dt").removeClass("activeLink");
		$(this).addClass("activeLink");
	});
	
	$(".warning").click(function(){
		$(".alertS div.alert").stop().slideUp();
	});
});

/* Create Template */
$(document).ready(function(){
	var i =0;
	/*$(".clickRole").click(function(){		
		$(this).find(".dropDown").slideToggle();
		//$(".card").removeClass();
	})*/
	  $(document).on('click', 'tr.node1', function(){ 
		  $(this).parent().find('tr.node1').css('background-color','none');
		    $(this).css('background-color','#eee');
		 });
})

function DropdownConst(createEle,addId,addClass,appendTo,labName,createCon,imageArray,dataSt){
	this.createEle=createEle;
	this.addId=addId;
	this.appendTo=appendTo;
	this.labName=labName;
	this.imageArray=imageArray;
	this.dataSt=dataSt;
	this.createCon = function(){
		var apch = document.getElementById(appendTo);
		var creAl = document.createElement(createEle);
		creAl.innerHTML="<span>"+labName+"</span>";
		//creAl.innerHTML="<span style='color: red' > * </span >";
		creAl.id=addId;
		creAl.className=addClass;
		apch.appendChild(creAl);
	}
};


var roLee=["AWS","Azure","OpenStack","Helion","SoftLayer"];
var roleAt=[];

DropdownConst.prototype.appendData = function(name,appentoWhat){	
	var epn = document.getElementById(appentoWhat);
	//console.log(epn);
	epn.innerHTML="";
	for(var i=0;i<=name.length-1;i++){
		var epn;
		epn.innerHTML+="<li onclick='selectOpt(this,"+i+")' class='"+name[i]+"'>"
						+"<dl>"
						+"<dt></dt>"
						+"<dd class='va'>"+name[i]+"</dd>"
						+"</dl>"
						+"</li>"
	}
	epn.write = epn;
	//console.log(epn);
}

DropdownConst.prototype.cre = function(){
	var re = document.getElementById(this.addId);
	re.innerHTML+="<ul id='"+this.addId+"s' class='dropDown'>"
				+"</ul>"
	var ulI = document.getElementById(this.addId+"s");
	for(var i=0;i<=this.dataSt.length-1;i++){
		ulI.innerHTML +="<li onclick='selectOpt(this,"+i+")' class='"+this.dataSt[i]+"'>"
						+"<dl>"
						+"<dt></dt>"
						+"<dd class='va'>"+this.dataSt[i]+"</dd>"
						+"</dl>"
						+"</li>"
						
	}
};
DropdownConst.prototype.preView = function(){
	var prId = document.getElementById("previewTemp")
	prId.innerHTML+="<li class='templateConta"+i+"'><div class='preImages'>"
				 +"<span class='firstIcon'><img src='images/' /></span><span>+</span>"
				 +"<span class='secondIcon'><img src='images/' /></span>"
				 +"</div>"
				 +"<div class='preData'><ul>"
				 +"<li>Role:<span class='rolePre'></span> </li>"
				 +"<li>Role Attribute: <span class='roleAt'></span></li>"
				 +"<li>OS: <span class='os'></span></li>"
				 +"</ul></div></li>";
}
var provider;
var cpu;
function selectOpt(ev, idn){
	
	var aImage = ev.getElementsByTagName("dt")[0].innerHTML;
	var aTex = ev.getElementsByTagName("dd")[0].innerText;
	 var v = ev.parentNode;
	 var vb = v.parentNode;
	 var idd = vb.id
	 console.log(idd);	 
	 if(idd == "sel")
		 {
		 	provider = aTex;
		 	region_fun(aTex);	 	
		 }
	 if(idd == "sell"){
		 node_filetr(provider,aTex);			 
		 }
	 for(var i=0;i<templates.length;i++)
		 {
		 	if(idd == "sel"+i+"")
		 		{	cpu=aTex;	 			
		 			ramsize_fun(aTex,"sells"+i+"");
		 		}else if(idd == "sell"+i+"")
		 			{		 				
		 				showNode_fun(aTex,i);
		 			}
		 }
	 document.getElementById(idd).style.border="none";
	 $("#"+idd+" span:first").html(aImage+aTex);
	 $("#"+idd+" span img").css("width", "25px");
}

function region_fun(reg){	
	var p_name=reg;	
	var data = {};
    data.pname = p_name;
    var region_name1=[];
	   $.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: data,	 
	     url: 'http://172.29.59.65:3000/temp_region',
	     success: function(results) {
	    	 for(var i=0;i<results.length;i++)
				{
					region_name1[i]=results[i].region_name;											
				}
	    	 var appendD = new DropdownConst();
	    	 appendD.appendData(region_name1,"sells");
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
	   });   
}
var images = [];
var nodes = [];
var region;
function node_filetr(pvd,reg){	
	region = reg;	
	var data={};
	data.pname=pvd;
	data.region=region;
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
				console.log(arr1);
	    	 	for(var k=0;k<templates.length;k++)
	    	 		{
	    	 			var appendD = new DropdownConst();
	    	 			appendD.appendData(arr1,"sels"+k+"");
	    	 		}
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
		 });
	
}
function ramsize_fun(data,appendToWhat){
	//console.log(appendToWhat);
	var ram=[];
	var arr2=[]; 	
	for(var j=0;j<nodes.length;j++)
		{
			if(nodes[j].vcpu == data)
				{
					ram[j] = nodes[j].memory_gib;						
				}					
		}
		arr2 = ram.filter(function(elem, pos) {
		return ram.indexOf(elem) == pos;
		})
		var appendD = new DropdownConst();
			appendD.appendData(arr2, appendToWhat);		
}
function showNode_fun(ram,appendTo){
	//alert(cpu+a+b);
	var id=appendTo;
	$('table#nodeSel'+id+' tbody tr td').empty();
	for(var i=0;i<nodes.length;i++)
	{
		if(nodes[i].vcpu == cpu && nodes[i].memory_gib == ram)
			{							
				tr = $('<tr class="node1" onclick="get_nodes(this.id)"/>');
				tr.attr("id", "row"+i);
	            tr.append("<td>" + nodes[i].inst_type+ "</td>");	
	            tr.append("<td>" + nodes[i].vcpu+ "</td>");
	            tr.append("<td>" + nodes[i].memory_gib+ "</td>");
	            tr.append("<td>" + nodes[i].storage+ "</td>");	            
	            $('table#nodeSel'+id+' tbody').append(tr);					 
			}
	}
	show_images(id);
}

var node;
function get_nodes(el){		
	 node = $('tr#'+el).closest("tr").find('td:eq(0)').text();
	 console.log(node);
}

function show_images(id){
	//alert(os[id]+region);
		var pvd_name = provider;
		var img_data = {};
		img_data.provider = pvd_name;
		img_data.os = templates[id].os;
		$.ajax({
		     type: 'POST',
			 jsonpCallback: "callback",
		     datatype: 'jsonp',
		     data: img_data,	 
		     url: 'http://172.29.59.65:3000/temp_image',
		     success: function(results) {		    		 
			    	 	var appendD = new DropdownConst();
			    	 	appendD.appendData(results,"sellls"+id);
		    		 
		     },
			 error: function (xhr, status, error){
		        console.log('Failure');
				alert("failure");
				},
		   });	
}
var save_info =[];

$(".saveInfo").click(function(){
	//var arr1=JSON.stringify(save_info);
	//console.log(arr1);
	var tm_name = document.getElementById("t_name").value;
	var str1="Select";
	var expTname = /^\w+$/;
	
	for(var i=0;i<templates.length;i++)
	{	
		var node_role = templates[i].role;
		var x = document.getElementById("sel"+i+"").innerText;
		var y = document.getElementById("sell"+i+"").innerText;
		var z = document.getElementById("selll"+i+"").innerText;
		
		if(x == str1)
			{
			document.getElementById("sel"+i+"").style.border="thin dashed #E24B4B";
			return;
			}else if(y == str1)
				{
				document.getElementById("sell"+i+"").style.border="thin dashed #E24B4B";
				return;
				}
			else if(z == str1)
				{
				document.getElementById("selll"+i+"").style.border="thin dashed #E24B4B";
				return;
				}
	}
	if(!expTname.test(tm_name)){
		$(".alert-warning").stop().slideDown();
		document.getElementById("t_name").focus();
		return;
	}
	saveInformation(tm_name);
})

function saveInformation(tm_name){

	for(var i=0;i<templates.length;i++)
	{	
		var node_role = templates[i].role;
		var x = document.getElementById("sel"+i+"").innerText;
		var y = document.getElementById("sell"+i+"").innerText;
		var z = document.getElementById("selll"+i+"").innerText;
		var role_info={};
		role_info.node=node;
		role_info.image=z;
		role_info.role=node_role;			
		save_info.push(role_info);
		console.log(save_info.length);
		console.log(provider);
	}
	var arr1=JSON.stringify(save_info);
	//console.log(arr1);	
	var a = Math.floor(100000 + Math.random() * 900000)
	a = a.toString().substring(0, 3);
	var t_name = tm_name+"_"+a;
	var arr2=[];
	arr2.push(provider);
	arr2.push(region);
	arr2.push(save_info.length);
	arr2.push(t_name);
	console.log(arr2);
	console.log(save_info);
	$.ajax({
	     type: 'POST',
		 jsonpCallback: "callback",
	     datatype: 'jsonp',
	     data: "d1="+arr1+"&d2="+arr2,	     
	     url: 'http://172.29.59.65:3000/temp_store',
	     success: function(results) {
	     	 $(".alert-success").stop().slideDown();
	    	 location.href="//172.29.59.65:3000/deployTemplate"+"?data="+t_name;
	     },
		 error: function (xhr, status, error){
	        console.log('Failure');
			alert("failure");
			},
		 });
	
}



/* Provider */
var provider = new DropdownConst("div","nodeId","","assignNode","","","");
provider.createCon();
var provider = new DropdownConst("div","noDEpullL","pull-left","nodeId","","","").createCon();
var provider = new DropdownConst("label","","labelTemp","noDEpullL","Provider *","","").createCon();
var provider = new DropdownConst("div","sel","clickRole forWid","noDEpullL","Select","","",roLee);
provider.createCon();
provider.cre();
//role.preView();
var provider = new DropdownConst("span","","glyphicon glyphicon-chevron-down pull-right","sel","","","").createCon();


/* Region */
var region = new DropdownConst("div","nodeAtID","","assignNode","","","");
region.createCon();
var region = new DropdownConst("div","noDpullLi","pull-left","nodeAtID","","","").createCon();
var region = new DropdownConst("label","","labelTemp","noDpullLi","Region *","","").createCon();
var region = new DropdownConst("div","sell","clickRole forWid","noDpullLi","Select ","","",roleAt);
region.createCon();
region.cre();
var region = new DropdownConst("span","","glyphicon glyphicon-chevron-down pull-right","sell","","","").createCon();
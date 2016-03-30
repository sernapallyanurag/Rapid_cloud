var _ip = "http://172.29.59.65:3000";
$(document).ready(function(){
	var i =0;
	$(".clickRole").click(function(){
		$(this).find(".dropDown").slideToggle();
	})
});
window.onclick=function(){
	$(".popUpHide").hide();
}
$(".closeAlert").click(function(){
	$(".alertS div.alert").stop().slideUp();
})
function disPlayPop(a){
	var popHeight = $(a).parent().children("div").children("div.popover").height();
	var topPost=-popHeight/2 - 8;
	$(".popover").css({'top':topPost+'px'});

	//$(a).hide(); // Getting hide this a element only
	//$("."+a.className).hide(); // Getting hide all a class elements in a document

	$(".popUpHide").hide();
	var cl  = $(a).parent().children("div").children("div.popover");
	cl.show();
	cl.addClass("popUpHide");
}

/* ---------------------------------------------
		These common actions(Hide, Show, Hide and Show toggle) we can use all pages.
	------------------------------------------------*/
	function HideAndShow_Constructor(clickedElement,hideAndShowElement){
		this.clickedElement=clickedElement;
		this.hideAndShowElement=hideAndShowElement;
	}	
	HideAndShow_Constructor.prototype.defaultHide = function(){
			var adv = $("."+this.hideAndShowElement);
				adv.hide();
	}
	HideAndShow_Constructor.prototype.showActionOnly = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideDown();
			});
	}
	HideAndShow_Constructor.prototype.hideActionOnly = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideUp();
			});		
	}
	HideAndShow_Constructor.prototype.toggleHandS = function(){
		var sho = $("."+this.hideAndShowElement);
			var ad = $("."+this.clickedElement);
				ad.click(function(e){
				 e.preventDefault();
				 sho.slideToggle();
			});
	}
var manageAct = new HideAndShow_Constructor("liNkaction1","action1");
		manageAct.defaultHide();
		manageAct.toggleHandS();
/* ---------------------END------------------------*/
		/*---------- Table ------------------*/
			function Projects(){
				  $(function(){
				   $.getJSON( _ip + '/manage_env', function (data){
						//console.log("1st Url Data  : "+data);
							manage.createTableData(data);
							//console.log("DATA:::::::::"+data);
						});
					});				
			}
			
			Projects.prototype.getEnvironments = function(self, id){
				event.preventDefault();
				this.id = id;
				var sel = this;
				createEle(id, sel)
				function createEle(id, sel){
					function insertAfter(referenceNode, newNode) {
						referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
				}
				var getExis = document.getElementById("dataOf"+id);
				if(getExis){
					getExis.parentNode.removeChild(getExis);
					//getExis.innerHTML="";
					//getExis.id="";
					return false;
				}
					var manageTable = document.getElementById(id);
					var crTr = document.createElement("tr");
						crTr.id ="dataOf"+id;
						
						insertAfter(manageTable, crTr);
					crTr.innerHTML+="<table><tr class='action1'>\
										</tr>\
												<tr class='action1'>\
													<td style='padding:5px 0px;' colspan='7'>\
														<table style='width:100%;'>\
															<tr>\
																<td style='padding:0px;width:250px;vertical-align: top;background-color: #666666;'>\
																	<nav role='tempLates'>\
																		<ul>\
																			<li class='naee'><a href='#'>Environments</a>\
																			  <dl id='envir_"+manageTable.id+"'>\
																			  </dl>\
																			</li>\
																		</ul>\
																	</nav>\
																</td>\
																<td style='padding:0px;width:250px;vertical-align:top;background-color: #DDDDDD;'>\
																	<nav role='noDes'>\
																		<ul>\
																			<li class='naee'><a href='#'>Nodes</a>\
																				<dl id='node_"+manageTable.id+"'>\
																				</dl>\
																			</li>\
																		</ul>\
																	</nav>\
																</td>\
																<td style='padding:0px;width:250px;vertical-align:top;background-color:#EEEEEE;'>\
																	<table id='nodeDetails_"+manageTable.id+"'>\
																	</table>\
																</td>\
															</tr>\
														</table>\
													</td>\
												</tr>\
										</tr></table>";
					sel.getJsonDataOfEnviro(id);
				}
			}
			Projects.prototype.getJsonDataOfEnviro = function(requestId){
					var data = {};	data.id = requestId;
					var self = this;
					 $.ajax({
						type: 'POST',
						jsonpCallback: "callback",
						datatype: 'jsonp',
						data: data,
						url: _ip +'/filter_env',
						success: function(data, textStatus){
							console.log(data);
							self.environmentList(data, requestId);
							//self.createPopupStatus(data, requestId);
						},
						error: function (xhr, status, error){
						   console.log('Failure');
						},
					  });
			}
			Projects.prototype.environmentList = function(requestData, requestId){
				var elId = document.getElementById('envir_'+requestId);
					//console.log(requestId);
					//elId ? f(requestId) : elId;
					//console.log(requestData);
					//console.log("Inside fun"+requestId);
					
					for(var enTem = 0; enTem < requestData.length;enTem++){
						//console.log(requestData.length);
					var dt = document.createElement("dt");
					var temesArr = requestData[enTem].env_name;
						elId.innerHTML+='<dt id="EnvntID_'+enTem+'" onclick="manage.getNodes(this, '+requestId+')">'+temesArr+'</dt>';						
				  }
				  var elId = document.getElementById('EnvntID_'+0);
				  this.getNodes(elId, requestId);
			}
			Projects.prototype.getNodes = function(env_name, project_id){
				//console.log(env_name.innerText+"  "+project_id);
				//var envText = env_name.innerText;
				var elId = document.getElementById('envir_'+project_id);
				var liArray = elId.getElementsByTagName("dt");
							for (var i = 0; i < liArray.length; i++)
								{
									liArray[i].className = "";
									env_name.className ="activeLink";
								}
				
				var data = {};
				data.env_name = env_name.innerText ;
				data.proj_id = project_id ;
				var self =  this;
				//console.log(data);
				 $.ajax({
						type: 'POST',
						jsonpCallback: "callback",
						datatype: 'jsonp',
						data: data,
						url: _ip+'/node_details',
						success: function(data, textStatus) {
							//console.log(data);
							
							manage._init(data);
							var el = document.getElementById('node_'+project_id);
							el.innerHTML="";
							var nodeDat = [];
							for(var i = 0; i < data.length; i++){
								var dt = document.createElement("dt"),
									typeInst = data[i].inst_type,
									nodeNa = data[i].role,
									cloud = data[i].prov_id,
									vpcNa = data[i].vpc_name;

									//var dd = JSON.stringify(nodeDat);
									
									el.innerHTML+='<dt onclick="manage.getNodeDetails(this, '+i+', '+project_id+')">'+nodeNa+'</dt>';
									
									//el.innerHTML+='<dt name="'+dd+'" onclick="manage.getNodeDetails(this, '+project_id+', '+nodeNa+')">'+nodeNa+'</dt>';
									self.getNodeDetails("", 0, project_id);
							}
					 },
					 error: function (xhr, status, error){
						   console.log('Failure');
						},
					  });
			}
			Projects.prototype._init = function(daaa){
				this.dataOfNd = daaa; // [object Object] i dont know why??
			}
			Projects.prototype.getNodeDetails = function(ev, clickedData, project_id){
				
				var elId = document.getElementById('node_'+project_id);
				var liArray = elId.getElementsByTagName("dt");
							for (var i = 0; i < liArray.length; i++)
								{
									liArray[i].className = "";
									ev.className ="activeLink";
								}


				var nodeDe = document.getElementById('nodeDetails_'+project_id);

				//console.log("getNodeDetails:::::"+this.dataOfNd);
				console.log(this.dataOfNd);
				var ifNull ="--"
				var clodSer = this.dataOfNd[clickedData].cloud_service ? this.dataOfNd[clickedData].cloud_service : ifNull ;
							nodeDe.innerHTML='<tr>\
									<td><img src="images_1/'+this.dataOfNd[clickedData].prov_id+'_Logo.png" /></td>\
									<td>\
										<table>\
											<tr>\
												<td>Type:</td>\
												<td>'+this.dataOfNd[clickedData].inst_type+'</td>\
											</tr>\
											<tr>\
												<td>Role:</td>\
												<td>'+this.dataOfNd[clickedData].role+'</td>\
											</tr>\
											<tr>\
												<td>VPC: </td>\
												<td>'+this.dataOfNd[clickedData].vpc_name+'</td>\
											</tr>\
											<tr>\
											<td>Region: </td>\
											<td>'+this.dataOfNd[clickedData].region+'</td>\
										</tr>\
										</table>\
									</td>\
								</tr>\
								<tr>\
									<td colspan="2" style="text-align:center;">\
									  <p class="statusOfNode">\
										<span class="st">Status: </span>\
										<span class="statusText">&nbsp;&nbsp;<span class="'+this.dataOfNd[clickedData].status+'"></span>'+this.dataOfNd[clickedData].status+'</span>\
									  </p>\
									</td>\
								</tr>\
								<tr>\
									<td colspan="2">\
										<div class="nodeBuT">\
						  <button class="redButton" id="this_Start_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+','+this.dataOfNd[clickedData].region+','+this.dataOfNd[clickedData].prov_id+','+this.dataOfNd[clickedData].cloud_name+','+this.dataOfNd[clickedData].role+'" onclick="manage.nodeServerEngine(this)">Start</button>\
						  \
						  <button class="redButton" id="this_Stop_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+','+this.dataOfNd[clickedData].region+','+this.dataOfNd[clickedData].prov_id+','+this.dataOfNd[clickedData].cloud_name+','+this.dataOfNd[clickedData].role+'" onclick="manage.nodeServerEngine(this)">Stop</button>\
						  \
						  <button class="redButton" id="this_Terminate_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+','+this.dataOfNd[clickedData].region+','+this.dataOfNd[clickedData].prov_id+','+this.dataOfNd[clickedData].cloud_name+','+this.dataOfNd[clickedData].role+'" onclick="manage.nodeServerEngine(this)">Terminate</button>\
						  \
						  <button class="redButton" id="this_Reboot_'+this.dataOfNd[clickedData].inst_id+'"  value="'+this.dataOfNd[clickedData].inst_id+','+this.dataOfNd[clickedData].region+','+this.dataOfNd[clickedData].prov_id+','+this.dataOfNd[clickedData].cloud_name+','+this.dataOfNd[clickedData].role+'" onclick="manage.nodeServerEngine(this)">Reboot</button>\
										</div>\
									</td>\
								</tr>';
					var _StatusOfNode = this.dataOfNd[clickedData].status;
					if(_StatusOfNode == "stopped"){						
						var _start = document.getElementById("this_Start_"+this.dataOfNd[clickedData].inst_id);
						var _stop = document.getElementById("this_Stop_"+this.dataOfNd[clickedData].inst_id).disabled = true;
						var _termi = document.getElementById("this_Terminate_"+this.dataOfNd[clickedData].inst_id);
						var _reboot = document.getElementById("this_Reboot_"+this.dataOfNd[clickedData].inst_id).disabled = true;
						
					}else if(_StatusOfNode == "running"){
						var _start = document.getElementById("this_Start_"+this.dataOfNd[clickedData].inst_id).disabled = true;
						var _stop = document.getElementById("this_Stop_"+this.dataOfNd[clickedData].inst_id);
						var _termi = document.getElementById("this_Terminate_"+this.dataOfNd[clickedData].inst_id);
						var _reboot = document.getElementById("this_Reboot_"+this.dataOfNd[clickedData].inst_id);
						
					}else if(_StatusOfNode == "terminated"){						
						var _start = document.getElementById("this_Start_"+this.dataOfNd[clickedData].inst_id).disabled = true;
						var _stop = document.getElementById("this_Stop_"+this.dataOfNd[clickedData].inst_id).disabled = true;
						var _termi = document.getElementById("this_Terminate_"+this.dataOfNd[clickedData].inst_id).disabled = true;
						var _reboot = document.getElementById("this_Reboot_"+this.dataOfNd[clickedData].inst_id).disabled = true;
					}

				//console.log("re::::"+ JSON.stringify(re));
				//console.log("nodeNa++++  "+nodeNa);
			}
			Projects.prototype.nodeServerEngine = function(wichOne){
				console.log(wichOne.value, wichOne.innerHTML);
				var inst_id = wichOne.value;
				var arr =inst_id.split(",");
				var action = wichOne.innerHTML;
				console.log(arr[0]+arr[1]+arr[2]+arr[3]+arr[4]+action);
				var data = {};
				data.inst_id = arr[0];
				data.action = action;
				data.region = arr[1];
				data.pvd = arr[2];
				data.cldsrvc = arr[3];
				data.role = arr[4];
				
				$.ajax({
			        type: 'POST',
			   	 	jsonpCallback: "callback",
			        datatype: 'jsonp',
			        data: data,
			        url: _ip+'/manage_env_nodes',
			        success: function(data, textStatus){
			        	//alert(data);
			        	if(data != "Success"){$(".alert-warning").stop().slideDown();}
			        	else{$(".alert-success").stop().slideDown();}
			        	},
			        	 error: function (xhr, status, error){
			                 console.log('Failure');
			         		alert("failure");
			         		},
			            });
			}
			Projects.prototype.createTableData = function(dataSource){
				//console.log("createTableData:::"+dataSource);
					var manageTable = document.getElementById("manageTable");
					for(var j=0;j<=dataSource.length-1;j++){
						var createTr = document.createElement("tr");						
							createTr.id = dataSource[j].p_id;
							manageTable.appendChild(createTr);
						var manageTr = document.getElementById(dataSource[j].p_id);
						manageTr.innerHTML+='<td>'+dataSource[j].p_name+'</td>'
										   +'<td>'+dataSource[j].technology+'</td>'
										   +'<td>'+dataSource[j].start_date+'</td>'
										   //+'<td>'+dataSource[j].team_size+'</td>'
										   +'<td><a href="#" onmouseover="disPlayPop(this)" class="redLinks">Status</a>'
										   +'<div style="position:relative">'
											+'<div id="Status_'+dataSource[j].p_id+'" class="popover fade right in" role="tooltip" style="left:48px;">'
												+'<div class="arrow" style="top:50%;"></div>'
													+'<h3 class="popover-title statusOfNodeH3 tempBg">Status of Nodes</h3>'
													
													+'</div>'
												+'</div>'
										   +'</td>'
										   +'<td><a href="#" onclick="manage.getEnvironments(this,'+dataSource[j].p_id+')" class="redLinks">Actions</a></td>';
							this.dataStore_For_Popup(dataSource[j].p_id);
							//manage.getEnvironments("",dataSource[j].p_id); //it is for default display of all data.
							}
				//this.createPopupStatus(dataSource);
			}
			Projects.prototype.dataStore_For_Popup = function(project_Id){
				
				//console.log(JSON.stringify("dataStore_For_Popup: "+project_Id));

				var data = {};	data.id = project_Id;
					var self = this;
					 $.ajax({
						type: 'POST',
						jsonpCallback: "callback",
						datatype: 'jsonp',
						data: data,
						url: _ip+'/filter_env',
						success: function(data, textStatus){
							//console.log("AJAX :::::::::"+JSON.stringify(data));
							
							if(data == ""){
								//console.log("IF ____"+data);
								var statusPo = document.getElementById("Status_"+project_Id);
									statusPo.innerHTML+='<div class="arrow" style="top:50%;"></div>'
														+'<div style="padding:10px">No Environments Data</div>';
														
									//statusPo.style.display = 'none';
							}
							else{
								//console.log("else ____"+data);
								self.createPopupStatus(data, project_Id)
							}
						},
						error: function (xhr, status, error){
						   console.log('Failure');
						},
					  });
			}
			Projects.prototype.createPopupStatus = function(dataSource, project_Id){
				//console.log("Popup Prototype:::"+dataSource);
				//console.log(JSON.stringify(dataSource));
				
					//console.log("Project ID Outside :::::::::"+project_Id);
				
				for(var j=0; j<=dataSource.length-1; j++){

					//console.log("Project ID in for loop :::::::::"+project_Id);

					var _template_Name = dataSource[j].env_name;

					var statusPo = document.getElementById("Status_"+project_Id);

					//console.log("Project Name in for loop :::::::::"+_template_Name);

					statusPo.innerHTML+='<h3 class="popover-title">Template: <b>'+_template_Name+'</b></h3>'
										+'<div class="popover-content">'
										 +'<ul class="statusNodes" id="Sta_Temp_'+_template_Name+'">'
											
										  +'</ul>'
										+'</div>';
				  this.createPopupStatusNodes(_template_Name, project_Id, j);
				}
			}
			Projects.prototype.createPopupStatusNodes = function(_template_Name, project_Id, j){
				//console.log(_template_Name+":::::::::"+project_Id);
				var data = {};
				data.env_name = _template_Name ;
				data.proj_id = project_Id ;
				var self =  this;
				//console.log(data);
				 $.ajax({
						type: 'POST',
						jsonpCallback: "callback",
						datatype: 'jsonp',
						data: data,
						url: _ip+'/node_details',
						success: function(data, textStatus){
							//console.log("Node Status:::::::::"+data);
							//manage._init(data);

							/* var el = document.getElementById('node_'+project_Id);
							el.innerHTML="";
							var nodeDat = []; */
							for(var i = 0; i < data.length; i++){
								var dt = document.createElement("dt"),
									_roLe = data[i].role,
									_StaTus = data[i].status;
									//console.log("Node Status:::::::::"+_StaTus);
					var statusN = document.getElementById("Sta_Temp_"+_template_Name);
					statusN.innerHTML+='<li><span class="'+_StaTus+'"></span>'+_roLe+'</li>';
						}
					 },
					 error: function (xhr, status, error){
						   console.log('Failure');
						},
					  });
			}

		var manage = new Projects();
			//manage.appendMyData();
			//console.log(m);

	/*-----------------------------End Table---------------------------------------------*/















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
});
$(document).ready(function() {
	$('.center').hover(function() {
		$('.circle').css({"top":"0%","margin":"100 0 0 -100","border-style":"solid","border-color":"white"});
		$(".upper").slideUp("slow");
		$(".lower").fadeOut("slow");
		$(".middle").delay(1000).fadeIn("slow");
	});
});

$(document).ready(function() {
	$('.data_p').hover(function() {
		$('.data_p').css({"opacity":"1","font-size":"15px"});
		$(".upper").slideUp("slow");
		$(".lower").fadeOut("slow");
		$(".middle").delay(1000).fadeIn("slow");
	});
});

$(document).ready(function() {
	$('.circle').hover(function() {
		$('.inner_data h1').fadeOut(2000);
		$('.inner_data img').fadeIn(2000);
		setTimeout(function(){
		$('.inner_data h1').fadeIn(2000);
		$('.inner_data img').fadeOut(2000);
		},4000);	
	});	
});


$(document).ready(function () {
if ($(window).width() < 480) {
	$('.center').click(function() {
		$('.circle').css({"top":"0%","margin":"100 0 0 -50","border-style":"solid","border-color":"white"});
		$(".upper").slideUp("slow");
		$(".lower").fadeOut("slow");
		$(".middle").delay(1000).fadeIn("slow");
	});
 
}
});


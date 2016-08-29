/* Content toggle */
function updateToggleLinks(element) {
	$(element).each(function () {
		$(this).toggleClass('show-content');
	});
}
$("document").ready( function(){

	updateToggleLinks($('.toggle-content'));

	$(".toggle-content").click(function () {
		var toggleClass = $(this).data('content-toggle');
		updateToggleLinks($(this));
		$("." + toggleClass).toggle();
	});
	
});


/* Tabs */
function activateTab(tab){
	$(".link-tabs").ready(function () {
		tabLink = $(".link-tabs li a[data-tab='" + tab + "']");
		$(".link-tabs li.active").removeClass('active');
		tabLink.parent('li').addClass('active');
	});
}

$(".link-tabs").ready(function () {
	$(".link-tabs li a").click(function (event){
		event.preventDefault();
		activateTab($(this).data('tab'));
		$("#tab-content").css('opacity', '.15');
		window.location.href = $(this).prop('href');
	});
});


/* Help texts */
$("document").ready( function(){
	$("a.help-text-toggle").click(function (event) {
		event.preventDefault();
		var toggleButton = $(this);
		var helpTextId = $(this).data("help-text-id");
		$("#" + helpTextId).toggle();
		if ($("#" + helpTextId).hasClass('active')) {
			$("#" + helpTextId).removeClass('active');
			toggleButton.removeClass('active');
		} else {
			$("#" + helpTextId).addClass('active');
			toggleButton.addClass('active');
		}
	});
});
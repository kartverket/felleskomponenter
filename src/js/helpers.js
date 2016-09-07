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


/* Dynamic "add to cart" buttons*/
function updateAllCartButtons(storedOrderItems) {
	$('.add-to-cart-btn').each(function () {
		var uuid = $(this).attr('itemuuid');
		if ($.inArray(uuid, storedOrderItems) > -1) {
			$(this).addClass('disabled');
			$(this).attr('title', 'Allerede lagt til i kurv');
			$(this).children('.button-text').text(' Lagt i kurv');
		}
	});
}

function updateCartButton(element) {
	var uuid = $(element).attr('itemuuid');
	$('.add-to-cart-btn[itemuuid="' + uuid + '"]').each(function () {
		$(this).addClass('disabled');
		$(this).attr('data-original-title', 'Allerede lagt til i kurv');
		$(this).children('.button-text').text(' Lagt i kurv');
	});
}



/* Loading animation */
function showLoadingAnimation(loadingMessage){
	$("#loading-animation").html(loadingMessage);
	$("#loading-animation").show();
}
function hideLoadingAnimation(){
	$("#loading-animation").html('');
	$("#loading-animation").hide();
}

function notOpeningInNewTab(event){
	if ( event.ctrlKey || event.shiftKey || event.metaKey || (event.button && event.button == 1)){
		return false;
	}else{
		return true;
	}
}

showLoadingAnimation('Laster innhold');

$(document).ready(function (){
	hideLoadingAnimation();

	$(".show-loading-animation").click(function(event){
		if (notOpeningInNewTab(event)){
			var loadingMessage = $(this).data('loading-message') != undefined ? $(this).data('loading-message') : '';
			showLoadingAnimation(loadingMessage);
		}
	});
});
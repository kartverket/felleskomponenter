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
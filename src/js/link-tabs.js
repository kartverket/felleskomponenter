function activateTab(tab){
	$(".link-tabs").ready(function () {
		console.log(tab);
		tabLink = $(".link-tabs li a[data-tab='" + tab + "']");
		console.log(tabLink);
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
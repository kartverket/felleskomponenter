function setActiveTab(tabLink){
	var tab = tabLink.data('tab');
	localStorage.setItem("metadata-tab", tab);
	$(".localstorage-tabs li.active").removeClass('active');
	tabLink.parent('li').addClass('active');
}
function getActiveTab(){
	var tab = localStorage.getItem("metadata-tab");
	var tabLink = $(".localstorage-tabs li a[data-tab='" + tab + "']");
	setActiveTab(tabLink);
}
$(".localstorage-tabs").ready(function () {
	getActiveTab();
	$(".localstorage-tabs li a").click(function (event){
		event.preventDefault();
		setActiveTab($(this));
		window.location.href = $(this).prop('href');
	});
});
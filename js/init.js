var applicationEnvironment = (applicationEnvironment === undefined) ? "" : applicationEnvironment;

$(window).load(function () {
    var options = {
        disable_search_threshold: 10,
        search_contains: true
    };
    $(".chosen-select").chosen(options);
    $('[data-toggle="tooltip"]').tooltip();

    // Get useragent
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
});

$("document").ready( function(){
	if ($("#geonorge-logo a img").length){ 
		$("#geonorge-logo a img").prop("src", "/Content/bower_components/kartverket-felleskomponenter/assets/images/geonorge_" + applicationEnvironment + "logo.jpg");
	}    
});
var applicationEnvironment = (applicationEnvironment === undefined) ? "" : applicationEnvironment;
var supportsLogin = false;
var authenticationData = (authenticationData === undefined) ? {} : authenticationData;
if (authenticationData !== {}) {
    supportsLogin = (authenticationData.supportsLogin === undefined) ? false : authenticationData.supportsLogin;
    authenticationData.isAuthenticated = (authenticationData.isAuthenticated === undefined) ? false : authenticationData.isAuthenticated;
    authenticationData.urlActionSignIn = (authenticationData.urlActionSignIn === undefined) ? "" : authenticationData.urlActionSignIn;
    authenticationData.urlActionSignOut = (authenticationData.urlActionSignOut === undefined) ? "" : authenticationData.urlActionSignOut;
    authenticationData.userName = (authenticationData.userName === undefined) ? "" : authenticationData.userName;
}


var geonorgeUrl = (applicationEnvironment === "") ? "https://www.test.geonorge.no/" : "https://www.geonorge.no/";


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
	if ($("#geonorge-logo").length){ 
		$("#geonorge-logo a").prop("href", geonorgeUrl);
		$("#geonorge-logo a img").prop("src", "/Content/bower_components/kartverket-felleskomponenter/assets/images/svg/geonorge_" + applicationEnvironment + "logo.svg");
	}
	if (supportsLogin && $("#container-login").length){
		$("#container-login").append("<ul></ul>");
		$("#container-login ul").append("<li><a href='" + geonorgeUrl + "kartdata/oppslagsverk/Brukernavn-og-passord/'>Ny bruker</a></li>");
		if (authenticationData.isAuthenticated){
			$("#container-login ul").append("<li id='login'><a href='" + authenticationData.urlActionSignOut + "' class='geonorge-aut' title='Logg ut " + authenticationData.userName + "'> Logg ut</a></li>");
		}else{
			$("#container-login ul").append("<li id='login'><a href='" + authenticationData.urlActionSignIn + "' class='geonorge-aut'> Logg inn</a></li>");
		}
	}
});


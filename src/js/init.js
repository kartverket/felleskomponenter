var applicationEnvironment = (applicationEnvironment === undefined) ? "" : applicationEnvironment;
var applicationVersionNumber = (applicationVersionNumber === undefined) ? "" : applicationVersionNumber;
var supportsLogin = false;
var authenticationData = (authenticationData === undefined) ? {} : authenticationData;
if (authenticationData !== {}) {
    supportsLogin = (authenticationData.supportsLogin === undefined) ? false : authenticationData.supportsLogin;
    authenticationData.isAuthenticated = (authenticationData.isAuthenticated === undefined) ? false : authenticationData.isAuthenticated;
    authenticationData.urlActionSignIn = (authenticationData.urlActionSignIn === undefined) ? "" : authenticationData.urlActionSignIn;
    authenticationData.urlActionSignOut = (authenticationData.urlActionSignOut === undefined) ? "" : authenticationData.urlActionSignOut;
    authenticationData.userName = (authenticationData.userName === undefined) ? "" : authenticationData.userName;
}


var geonorgeUrl = (applicationEnvironment === "") ? "https://www.geonorge.no/" : "https://www.test.geonorge.no/";


/* Loading animation */
function showLoadingAnimation(loadingMessage) {
    $("#loading-animation").html(loadingMessage);
    $("#loading-animation").show();
}

function hideLoadingAnimation() {
    $("#loading-animation").html('');
    $("#loading-animation").hide();
}

function notOpeningInNewTab(event) {
    if (event.ctrlKey || event.shiftKey || event.metaKey || (event.button && event.button == 1)) {
        return false;
    } else {
        return true;
    }
}

function addDefaultLoadingAnimation(element) {
    element.addClass('show-loading-animation');
    element.data('loading-message', 'Henter innhold');
}

showLoadingAnimation('Laster innhold');
/* ----------------------------- */


$(document).ready(function() {

    // Loading animation
    hideLoadingAnimation();

    $(document).on("click", ".show-loading-animation", function(event) {
        if (notOpeningInNewTab(event)) {
            var loadingMessage = $(this).data('loading-message') !== undefined ? $(this).data('loading-message') : '';
            showLoadingAnimation(loadingMessage);
        }
    });


    // Geonorge logo
    if ($("#geonorge-logo").length) {
        $("#geonorge-logo a").prop("href", geonorgeUrl);
        $("#geonorge-logo a img").prop("src", "/Content/bower_components/kartverket-felleskomponenter/assets/images/svg/geonorge_" + applicationEnvironment + "logo.svg");
    }


    //Version number
    if ($("#applicationVersionNumber").length && applicationVersionNumber !== "") {
        $("#applicationVersionNumber").html("Versjon " + applicationVersionNumber);
    }


    // Shopping cart
    var downloadUrl = "https://kartkatalog.geonorge.no/nedlasting";
    if (applicationEnvironment !== "") {
        downloadUrl = "https://kartkatalog." + applicationEnvironment + ".geonorge.no/nedlasting";
    }
    $("#shopping-cart-url").prop("href", downloadUrl);


    // Login
    if (supportsLogin && $("#container-login").length) {
        $("#container-login").append("<ul></ul>");
        $("#container-login ul").append("<li><a href='" + geonorgeUrl + "kartdata/oppslagsverk/Brukernavn-og-passord/'>Ny bruker</a></li>");
        if (authenticationData.isAuthenticated) {
            $("#container-login ul").append("<li id='login'><a href='" + authenticationData.urlActionSignOut + "' class='geonorge-aut' title='Logg ut " + authenticationData.userName + "'> Logg ut</a></li>");
        } else {
            $("#container-login ul").append("<li id='login'><a href='" + authenticationData.urlActionSignIn + "' class='geonorge-aut'> Logg inn</a></li>");
        }
    }
});

$(window).load(function() {
    var options = {
        disable_search_threshold: 10,
        search_contains: true
    };
    $(".chosen-select").chosen(options);
    $("[data-toggle='tooltip']").tooltip({
        trigger: 'hover'
    });
    $("li.has-error[data-toggle='tooltip']").tooltip("option", "position", { my: "center", at: "center bottom+30" });
    $("li[data-toggle='tooltip']").mouseleave(function() {
        $(".ui-helper-hidden-accessible").remove();
    });

    $(".ui-tooltip-element[data-toggle='tooltip']").tooltip("option", "position", { my: "center", at: "center bottom+25" });
    $(".ui-tooltip-element[data-toggle='tooltip']").mouseleave(function() {
        $(".ui-helper-hidden-accessible").remove();
    });

    // Get useragent
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
});


function setMainSearchApiUrl(apiUrl, environment){
    environmentIsSet = false;
    if (typeof environment !== 'undefined'){
        if (environment == 'dev' || environment == 'test' || environment == 'prod'){
            environmentIsSet = true;
        }else{
            console.error("incorrect value for environment. Use 'dev', 'test' or 'prod'");
        }
    }
    if (environmentIsSet){
        searchOptionsArray[environment].api = apiUrl;
    }else{
        searchOptionsArray.dev.api = apiUrl;
        searchOptionsArray.test.api = apiUrl;
        searchOptionsArray.prod.api = apiUrl;
    }
}
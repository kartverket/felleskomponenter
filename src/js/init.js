var applicationEnvironment = (applicationEnvironment === undefined) ? "" : applicationEnvironment;
var applicationVersionNumber = (applicationVersionNumber === undefined) ? "" : applicationVersionNumber;
var supportsLogin = false;
var supportsMultiCulture = false;

var authenticationData = (authenticationData === undefined) ? {} : authenticationData;
if (authenticationData !== {}) {
    supportsLogin = (authenticationData.supportsLogin === undefined) ? false : authenticationData.supportsLogin;
    authenticationData.isAuthenticated = authenticationData.isAuthenticated === undefined ? false : authenticationData.isAuthenticated;
    authenticationData.urlActionSignIn = authenticationData.urlActionSignIn === undefined ? "" : authenticationData.urlActionSignIn;
    authenticationData.urlActionSignOut = authenticationData.urlActionSignOut === undefined ? "" : authenticationData.urlActionSignOut;
    authenticationData.userName = authenticationData.userName === undefined ? "" : authenticationData.userName;
}

var cultureData = (cultureData === undefined) ? {} : cultureData;
if (cultureData !== {}) {
    supportsMultiCulture = cultureData.supportsMultiCulture === undefined ? false : cultureData.supportsMultiCulture;
    cultureData.urlSetCulture = cultureData.urlSetCulture === undefined ? "" : cultureData.urlSetCulture;
    cultureData.urlSetCultureNorwegian = cultureData.urlSetCultureNorwegian === undefined ? "" : cultureData.urlSetCultureNorwegian;
    cultureData.currentCulture = cultureData.currentCulture === undefined ? "" : cultureData.currentCulture;
}

function environmentIsProduction() {
    var productionEnvironment = "";
    return applicationEnvironment === productionEnvironment;
}

var geonorgeUrl = environmentIsProduction() ? "https://www.geonorge.no/" : "https://www.test.geonorge.no/";
if (cultureData !== {}) {
    if (cultureData.currentCulture == 'en'){
        geonorgeUrl += 'en';
    }
}

// Check if string contains parameters
function containsParameters(string) {
    return string.length && string.indexOf("?") > -1 ? true : false;
}

// Check active URL contains parameters
function urlContainsParameters() {
    return containsParameters(window.location.search);
}


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


    // MultiCulture
    if (supportsMultiCulture && $("#container-user-menu").length) {
        if (cultureData.currentCulture == "nb-NO" || cultureData.currentCulture == "nn-NO" || cultureData.currentCulture == "no") {
            $("#container-user-menu").append("<a href='" + cultureData.urlSetCulture + "' class='geonorge-culture' title='English'> English</a>");
        } else {
            $("#container-user-menu").append("<a href='" + cultureData.urlSetCultureNorwegian + "' class='geonorge-culture'> Norsk</a>");
        }
    }

    // Login
    if (supportsLogin && $("#container-user-menu").length) {
        $("#container-user-menu").append("<a href='" + geonorgeUrl + "kartdata/oppslagsverk/Brukernavn-og-passord/'>Ny bruker</a>");
        if (authenticationData.isAuthenticated) {
            $("#container-user-menu").append("<a href='" + authenticationData.urlActionSignOut + "' title='Logg ut " + authenticationData.userName + "'> Logg ut</a>");
        } else {
            $("#container-user-menu").append("<a href='" + authenticationData.urlActionSignIn + "'> Logg inn</a>");
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

function setMainSearchUrl(urlSlug, environment){
    environmentIsSet = false;
    var environmentSlug = '';
    if (typeof environment !== 'undefined'){
        if (environment == 'dev' || environment == 'test' || environment == 'prod'){
            environmentIsSet = true;
            environmentSlug = environment == 'prod' ? '' : '.' + environment;
        }else{
            console.error("incorrect value for environment. Use 'dev', 'test' or 'prod'");
        }
    }
    if (environmentIsSet){
        searchOptionsArray[environment].url = "//kartkatalog" + environmentSlug + ".geonorge.no/" + urlSlug;
    }else{
        searchOptionsArray.dev.url = "//kartkatalog.dev.geonorge.no/" + urlSlug;
        searchOptionsArray.test.url = "//kartkatalog.test.geonorge.no/" + urlSlug;
        searchOptionsArray.prod.url = "//kartkatalog.geonorge.no/" + urlSlug;
    }
}

function setMainSearchApiUrl(urlSlug, environment){
    environmentIsSet = false;
    var environmentSlug = '';
    if (typeof environment !== 'undefined'){
        if (environment == 'dev' || environment == 'test' || environment == 'prod'){
            environmentIsSet = true;
            environmentSlug = environment == 'prod' ? '' : '.' + environment;
        }else{
            console.error("incorrect value for environment. Use 'dev', 'test' or 'prod'");
        }
    }
    if (environmentIsSet){
        searchOptionsArray[environment].api = "//kartkatalog" + environmentSlug + ".geonorge.no/api/" + urlSlug;
    }else{
        searchOptionsArray.dev.api = "//kartkatalog.dev.geonorge.no/api/" + urlSlug;
        searchOptionsArray.test.api = "//kartkatalog.test.geonorge.no/api/" + urlSlug;
        searchOptionsArray.prod.api = "//kartkatalog.geonorge.no/api/" + urlSlug;
    }
}

function setMainSearchPlaceholder(placeholder, environment) { 
    environmentIsSet = false; 
    var environmentSlug = ''; 
    if (typeof environment !== 'undefined') { 
        if (environment == 'dev' || environment == 'test' || environment == 'prod') { 
            environmentIsSet = true; 
        } else { 
            console.error("incorrect value for environment. Use 'dev', 'test' or 'prod'"); 
        } 
    } 
    if (environmentIsSet) { 
        searchOptionsArray[environment].searchPlaceholder = placeholder; 
    } else { 
        searchOptionsArray.dev.searchPlaceholder = placeholder; 
        searchOptionsArray.test.searchPlaceholder = placeholder; 
        searchOptionsArray.prod.searchPlaceholder = placeholder; 
    } 
} 

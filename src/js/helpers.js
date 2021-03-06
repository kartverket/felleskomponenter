/* Content toggle */
function updateToggleLinks(element) {
  $(element).each(function() {
    $(this).toggleClass('show-content');
  });
}
$("document").ready(function() {

  updateToggleLinks($('.toggle-content'));

  $(".toggle-content").click(function() {
    var toggleClass = $(this).data('content-toggle');
    updateToggleLinks($(this));
    $("." + toggleClass).toggle();
  });

});


/* Tabs */
function activateTab(tab) {
  $(".link-tabs").ready(function() {
    tabLink = $(".link-tabs li a[data-tab='" + tab + "']");
    $(".link-tabs li.active").removeClass('active');
    tabLink.parent('li').addClass('active');
  });
}

$(".link-tabs").ready(function() {
  $(".link-tabs li a").click(function(event) {
    event.preventDefault();
    activateTab($(this).data('tab'));
    $("#tab-content").css('opacity', '.15');
    window.location.href = $(this).prop('href');
  });
});


/* Help texts */
$("document").ready(function() {
  $("a.help-text-toggle").click(function(event) {
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
  $('.add-to-cart-btn').each(function() {
    var uuid = $(this).attr('itemuuid');
    if ($.inArray(uuid, storedOrderItems) > -1) {
      $(this).addClass('added');
      $(this).attr('title', 'Allerede lagt til i kurv');
      $(this).children('.button-text').text(' Lagt i kurv');
    }
  });
}

function updateCartButton(element, storedOrderItems) {
  var uuid = $(element).attr('itemuuid');
  if ($.inArray(uuid, storedOrderItems) > -1) {
    $('.add-to-cart-btn[itemuuid="' + uuid + '"]').each(function() {
      var itemname = $(this).attr('itemname') !== undefined ? ' ' + $(this).attr('itemname') + ' ' : '';
      $(this).addClass('added');
      $(this).attr('data-original-title', 'Fjern' + itemname + 'fra kurv');
      $(this).children('.button-text').text(' Fjern fra kurv');
    });
  } else {
    $('.add-to-cart-btn[itemuuid="' + uuid + '"]').each(function() {
      var itemname = $(this).attr('itemname') !== undefined ? ' ' + $(this).attr('itemname') + ' ' : '';
      $(this).removeClass('added');
      $(this).attr('data-original-title', 'Legg til' + itemname + 'i kurv');
      $(this).children('.button-text').text(' Legg i kurv');
    });
  }
}


/* Check if href is the same as current url */
function notCurrentUrl(url) {
  if (url == window.location.href || url == window.location.pathname) {
    return true;
  } else if (url == window.location.href + "/" || url == window.location.pathname + "/") {
    return true;
  }
}


/* Loading animation for pagination */

$("document").ready(function() {
  $("ul.pagination a, ul.breadcrumbs a").each(function() {
    if (!$(this).closest('li').hasClass('active')) {
      addDefaultLoadingAnimation($(this));
    }
  });
});


/* Remove loading animation from links same as current url */
$("document").ready(function() {
  $("body").on("click", "a", function() {
    if (notCurrentUrl($(this).attr("href"))) {
      $(this).removeClass("show-loading-animation");
    }
  });
});


/* Breadcrumbs */
function disableLastBreadcrumb() {
  if ($("ul.breadcrumbs li").last().has('a').length) {
    var lastBreadcrumbText = ($("ul.breadcrumbs li").last().text());
    $("ul.breadcrumbs li").last().html(lastBreadcrumbText);
  }
}
$("document").ready(function() {
  disableLastBreadcrumb();
});


/* Alerts */
function showAlert(message, colorClass) {
  $('#feedback-alert').attr('class', 'alert alert-dismissible alert-' + colorClass);
  $('#feedback-alert .message').html($('#feedback-alert .message').html() + message + "<br/>");
  $('#feedback-alert').show();
}

function clearAlertMessage() {
  $('#feedback-alert .message').html("");
}

function hideAlert() {
  $('#feedback-alert').hide();
}

// Get URL parameters
function getParameterByName(name) {
  var url = location.search.toLowerCase();
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(url);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Remove URL parameters from string
function removeParameterByName(name, urlParameters) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "([^&#]*)"),
  results = regex.exec(urlParameters);
  urlParameters = urlParameters.replace(results[0], "");
  return urlParameters;
}

// Remove URL parameters from url field
function removeParameterByNameFromUrl(name) {
  var urlParameters = location.search.toLowerCase();
  urlParameters = removeParameterByName(name, urlParameters);
  var newRelativeUrl = location.pathname + urlParameters;
  window.history.replaceState({ path: newRelativeUrl }, null, newRelativeUrl);
}
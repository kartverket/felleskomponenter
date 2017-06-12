$(document).on('focus', '.custom-select-list-input', function() {
  var customSelectListElement = $(this).closest('.custom-select-list');
  var dropdownElement = customSelectListElement.find('.custom-select-list-dropdown-container');
  dropdownElement.addClass('active');
});

$(document).on('click', '.custom-select-list-input-container', function() {
  $(this).find('.custom-select-list-input').focus();
});

function filterDropdownList(inputElement, selectListElement){
  var dropdownListElements = selectListElement.find('.custom-select-list-options');
  var filter = inputElement.val().toUpperCase();
  for (var listIndex = 0; listIndex < dropdownListElements.length; listIndex++) {
    var listItems = dropdownListElements[listIndex].getElementsByTagName('li');
    var hasResults = false;
    for (var i = 0; i < listItems.length; i++) {
      if (listItems[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
        listItems[i].style.display = "";
        hasResults = true;
      } else {
        listItems[i].style.display = "none";
      }
    }

    var optionGroupNameElement = $(dropdownListElements[listIndex]).closest("div").find(".custom-select-list-option-group-name");
    if (!hasResults) {
      optionGroupNameElement.hide();
    } else {
      optionGroupNameElement.show();
    }
  }
}

$(document).on('keyup', '.custom-select-list', function(){
  var inputElement = $(this).find('.custom-select-list-input');
  filterDropdownList(inputElement, $(this));
});

$("document").ready(function () {
  if ($('.custom-select-list').length){
    $(document).on('click', function(e){
      var insideContainer = false;
      var activeSelectListKey = null;
      $('.custom-select-list').each(function(key, selectList){
        var target = e.target;
        while (target && target.parentNode) {
          target = target.parentNode; 
          if(target && target == selectList) { 
            insideContainer = true;
            activeSelectListKey = key;
          } 

        }
      });
      $('.custom-select-list').each(function(key, selectList){
        if (key !== activeSelectListKey){
          $(this).find('.custom-select-list-dropdown-container').removeClass('active');
          var inputElement = $(this).find('.custom-select-list-input');
          inputElement.val('');
          filterDropdownList(inputElement, $(this));
        }
      });
    });
  }
});


$(document).on('focus', '.custom-select-list-input', function() {
    var customSelectListElement = $(this).closest('.custom-select-list');
    var dropdownElement = customSelectListElement.find('.custom-select-list-dropdown');
    dropdownElement.addClass('active');
    dropdownElement.removeClass('transparent');
})

$(document).on('blur', '.custom-select-list-input', function() {
    var inputElement = this;
    var customSelectListElement = $(this).closest('.custom-select-list');
    var dropdownElement = customSelectListElement.find('.custom-select-list-dropdown');
    dropdownElement.addClass("transparent")
    setTimeout(function() {
        if (inputElement !== document.activeElement) {
            dropdownElement.removeClass("active")
            dropdownElement.removeClass("transparent")
        }
    }, 1000);
})

$(document).on('click', '.custom-select-list-input-container', function() {
    $(this).find('.custom-select-list-input').focus();
})

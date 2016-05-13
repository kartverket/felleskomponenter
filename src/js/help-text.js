$("document").ready( function(){
    $("a.help-text-toggle").click(function (event) {
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
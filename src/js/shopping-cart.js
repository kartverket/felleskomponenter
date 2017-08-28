function addShoppingCartTooltip(elementsCount) {
    var element = $('#shopping-cart-url');
    var elementsCountText = elementsCount !== 0 ? elementsCount : 'ingen';
    var text = elementsCount == 1 ? 'Du har ' + elementsCountText + ' nedlasting i kurven din' : 'Du har ' + elementsCountText + ' nedlastinger i kurven din';
    element.attr('title', text);
    element.attr('data-original-title', text);
    element.data('toggle', 'tooltip');
    element.data('placement', 'bottom');
    element.tooltip();
}

function removeSingleItemFromArray(array, undesirableItem) {
    var index = array.indexOf(undesirableItem);
    if (index >= 0) {
        array.splice(index, 1);
    }
    return array;
}

function removeFromArray(array, undesirableItems) {
    var multiple = Array.isArray(undesirableItems);
    if (multiple) {
        undesirableItems.forEach(function (undesirableItem) {
            array = removeSingleItemFromArray(array, undesirableItem);
        });
    } else {
        array = removeSingleItemFromArray(array, undesirableItems);
    }
}

function removeBrokenOrderItems() {
    var orderItems = JSON.parse(localStorage.getItem("orderItems"));
    removeFromArray(orderItems, [null, undefined, "null", {}, ""]);
    localStorage.setItem('orderItems', JSON.stringify(orderItems));
}

function updateShoppingCart() {
    var shoppingCartElement = $('#orderitem-count');
    var orderItems = "";
    var orderItemsObj = {};
    var cookieName = "orderitems";
    var cookieValue = 0;
    var cookieDomain = ".geonorge.no";

    if (localStorage.getItem("orderItems") !== null) {
        orderItems = localStorage.getItem("orderItems");
    }
    
    if (orderItems !== "") {
        orderItemsObj = JSON.parse(orderItems);
        cookieValue = orderItemsObj.length;
        if (cookieValue > 0) {
            shoppingCartElement.css("display", "block");
            shoppingCartElement.html(cookieValue);
            addShoppingCartTooltip(cookieValue);
        } else {
            shoppingCartElement.css("display", "none");
            addShoppingCartTooltip(0);
        }
        
    } else if (Cookies.get(cookieName) !== undefined && Cookies.get(cookieName) !== 0 && Cookies.get(cookieName) !== "0") {
        cookieValue = Cookies.get(cookieName);
        shoppingCartElement.css("display", "block");
        shoppingCartElement.html(cookieValue);
        addShoppingCartTooltip(cookieValue);
    } else {
        shoppingCartElement.css("display", "none");
        addShoppingCartTooltip(0);
    }
    Cookies.set(cookieName, cookieValue, { expires: 7, path: '/', domain: cookieDomain });
}

function updateShoppingCartCookie() {
    var shoppingCartElement = $('#orderitem-count');
    var cookieName = "orderitems";
    var cookieDomain = ".geonorge.no";
    var cookieValue = 0;
    if (localStorage.getItem("orderItems") !== null && localStorage.getItem("orderItems") != "[]") {
        var orderItems = localStorage.getItem("orderItems");
        var orderItemsObj = JSON.parse(orderItems);
        cookieValue = orderItemsObj.length;
        shoppingCartElement.html(cookieValue);
        addShoppingCartTooltip(cookieValue);
    } else {
        cookieValue = 0;
        shoppingCartElement.css("display", "none");
        addShoppingCartTooltip(cookieValue);
    }
    Cookies.set(cookieName, cookieValue, { expires: 7, path: '/', domain: cookieDomain });
}


$(window).load(function () {
    removeBrokenOrderItems();
    updateShoppingCart();
});

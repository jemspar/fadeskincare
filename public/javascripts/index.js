function addToCart(prodId) {
    console.log(prodId);

    $.post({
        url: '/add-to-cart',
        data: {prodId: prodId}
    })
    .done(
        () => {
        console.log("success.");
        $.get({
            url: '/get-cart',
        })
        .done((cart) => {
            $('#cart_items').text(cart.totalQty);
            $('#cart_link').css('background-color' , '#000022')
            .animate({
                'background-color': 'rgba(0,0,0,0)'
            }, 800);
            $("#" + prodId + " > .description > .added").toggle(100, function() {
                setTimeout( () => {$(this).toggle("slow")},  1000);
            });

        });
    })
    .fail((err) => {
        console.error("error~~~~while adding item");
        console.error(err);
    })
    .always(() => {
        console.log("done.");
    });

};



function removeFromCart(prodId) {
    console.log(prodId);

    $.post({
        url: '/remove-from-cart',
        data: {prodId: prodId}
    })
    .done(
        () => {
        console.log("success.");
        $.get({
            url: '/get-cart',
        })
        .done((cart) => {
            $('#cart_items').text(cart.totalQty);
            $('#cart_link').css('background-color' , '#000022')
            .animate({
                'background-color': 'rgba(0,0,0,0)'
            }, 800);

        });
    })
    .fail((err) => {
        console.error("error~~~~while removing item" + err);
    })
    .always(() => {
        console.log("done.");
    });

};

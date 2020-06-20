function addToCart(prodId) {
    console.log(prodId);

    $.post({
        url: '/add-to-cart/' + prodId,
    })
    .done(
        () => {
        console.log("success.");
        $.get({
            url: '/get-cart',
        })
        .done((cart) => {
            $('#cart_items').text(cart.totalQty);
            $('#cart_link').css('background-color' , '#000022');
            $('#cart_link').animate({
                'background-color': 'rgba(0,0,0,0)'
            }, 800);
            
        });
    })
    .fail((err) => {
        console.error("error~~~~" + err);
    })
    .always(() => {
        console.log("done.");
    });

};
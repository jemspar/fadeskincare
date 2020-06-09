function addToCart(prodId) {
    console.log(prodId);

    $.post({
        url: '/add-to-cart/' + prodId,
    })
    .done(() => {
        console.log("success.");
    })
    .fail((err) => {
        console.error("error~~~~" + err);
    })
    .always(() => {
        console.log("done.");
    });

};
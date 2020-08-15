$('.index_product > a')
.hover(function() {
    $(this).children('.prod_img').addClass('hover');
},
function() {
    $(this).children('.prod_img').removeClass('hover');
});
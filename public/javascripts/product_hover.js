

$( window ).ready(function() {

    $( ".index_product a" ).hover(
        function() {
          $( this ).children( ".prod_img" ).addClass( "hover" );
          console.log('on hov');
        }, function() {
          $( this ).children( ".prod_img" ).removeClass( "hover" );
          console.log('off hov');
        }
      );

});


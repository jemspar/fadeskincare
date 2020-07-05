paypal.Buttons({
    createOrder: function() {
        return fetch('/handle-order', {
          method: 'post',
          headers: {
            'content-type': 'application/json'
          }
        }).then(function(res) {
          return res.json();
        }).then(function(data) {
          return data.orderID; // Use the same key name for order ID on the client and server
        });
      }, 
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          console.log(details);
          $('#paypal-button-container').detach();
          $('#right').append('\
            <h3>Thanks for your order!</h3>\
            <p>Your order ID is: ' + details.id +
          '. Check your email or Paypal account for order details.');
        });
      }
    }).render('#paypal-button-container'); // Display payment options on your web page
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
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }
    }).render('#paypal-button-container'); // Display payment options on your web page
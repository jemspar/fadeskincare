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
    },
    onShippingChange: function(data, actions) {
      console.log(data.shipping_address);
      if (data.shipping_address.city == "San Francisco") {
        console.log('so u live in the city!');
        
        return fetch('/get-cart')
        .then(function(cartResponse) {

          return cartResponse.json();

        })
        .then(function(c) {

        

          return actions.order.patch([
            {
                op: 'replace',
                path: '/purchase_units/@reference_id==\'default\'/amount',
                value: {
                    currency_code: 'USD',
                    value: c.totalPrice.toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: c.totalPrice.toFixed(2)
                        },
                        shipping: {
                            currency_code: 'USD',
                            value: '0.00'
                        },
                        tax: {
                          currency_code: 'USD',
                          value: '0.00'
                        }
                    }
                }
              }]);

        })
        .catch(err => console.log(err));
        
        
      }
    }
  }).render('#paypal-button-container'); // Display payment options on your web page
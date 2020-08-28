// 1. Set up your server to make calls to PayPal

// 1a. Import the SDK package
const paypal = require('@paypal/checkout-server-sdk');

// 1b. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
/**
 *
 * PayPal HTTP client dependency
 */
const payPalClient = require('./models/paypal');

const Cart = require('./models/cart');

// 2. Set up your server to receive a call from the client
module.exports = async function handleRequest(req, res) {

  var cart = new Cart(req.session.cart);
  var cartArr = cart.genPaypalArray();
  console.log(cartArr);
  var subtotal = cart.totalPrice;

  // 3. Call PayPal to set up a transaction
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: (subtotal+5).toFixed(2),
        breakdown: {
          item_total: {
            currency_code: 'USD',
            value: subtotal,
          },
          shipping: {
            currency_code: 'USD',
            value: '5.00',
          },
          tax_total: {
            currency_code: 'USD',
            value: '0.00',
          }
        },
      },
      items: cartArr,
    }],
  });

  let order;
  try {
    order = await payPalClient.client().execute(request);
  } catch (err) {

    // 4. Handle any errors from the call
    console.error(err);
    return res.send(500);
  }

  // 5. Return a successful response to the client with the order ID
  console.log(order.result.id);
  res.status(200).json({
    orderID: order.result.id
  });
}
// ----------------PAYPAL SETUP
const paypal = require('@paypal/checkout-server-sdk');

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

function environment() {

  return new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET
    );

}

// ----------------END

async function prettyPrint(jsonData, pre=""){
    let pretty = "";
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    for (let key in jsonData){
        if (jsonData.hasOwnProperty(key)){
            if (isNaN(key))
              pretty += pre + capitalize(key) + ": ";
            else
              pretty += pre + (parseInt(key) + 1) + ": ";
            if (typeof jsonData[key] === "object"){
                pretty += "\n";
                pretty += await prettyPrint(jsonData[key], pre + "    ");
            }
            else {
                pretty += jsonData[key] + "\n";
            }

        }
    }
    return pretty;
}

module.exports = {client: client, prettyPrint:prettyPrint};

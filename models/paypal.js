// ----------------PAYPAL SETUP
const paypal = require('@paypal/checkout-server-sdk');

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

function environment() {
  let clientId = "AT02gI6RH8phPj8RlVEXWYkMBrKwwMCg6Odi3R9xU_pW44dLZcjaeNLWkaYEMqeCShWNBXWwh5PBWDUt";
  let clientSecret = "EPHM4qu0Mi7L5vESeQ4dF14geiggSsT-SLvwW79C9-TFEM3mxNqfDkekug644ZR_GX4tk4HgTjOd_RlN";

  return new paypal.core.LiveEnvironment(
    clientId, clientSecret
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

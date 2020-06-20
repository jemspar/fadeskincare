// ----------------PAYPAL SETUP
const paypal = require('@paypal/checkout-server-sdk');

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

function environment() {
  let clientId = "AcW6eH0xbAOeytXMN0dNv4wfY78uWAi5adeNLTVLnBno0RSNONH2FsSvc9RLLrAWDDH1V7WX_PaRLcIp";
  let clientSecret = "EIcJTNQ2mMXdOZaPVanHgpFIqTDIZrPWJyxyCcEvq3-reZ2rZZsKH80_C5snXdtVAZ9earfz-2N4qJD6";

  return new paypal.core.SandboxEnvironment(
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

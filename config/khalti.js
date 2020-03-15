const KhaltiCheckout = require('khalti-web');

let config = {
    "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess(payload) {
            // hit merchant api for initiating verification
            console.log(payload);
        },
        // onError handler is optional
        onError(error) {
            // handle erros
            console.log(error);
        },
        onClose() {
            console.log('widgit is closing');
        }
    }
};

let checkout = new KhaltiCheckout(config);
let btn = document.getElementById('payment-button');
btn.onclick = function() {
    checkout.show({ amount: 1000 });
}
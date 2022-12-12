require('dotenv').config()

var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server(process.env.STELLAR_SERVER);

(async function () {

  let publickey = 'PUBLIC_KEY_OF_ACCOUNT';

// the JS SDK uses promises for most actions, such as retrieving an account
  const account = await server.loadAccount(publickey);
  console.log("Balances for account: " + publickey);
  account.balances.forEach(function (balance) {
    console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
  });
})();

require('dotenv').config()
const fetch = require('node-fetch');

var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server(process.env.STELLAR_SERVER);


(async function () {
  const account = await server.loadAccount('TEST123');

  let privatekey = pair.secret();
  let publickey = pair.publicKey();

  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(
        publickey,
      )}`,
    );
    const responseJSON = await response.json();
    console.log("SUCCESS! You have a new account :)\n", responseJSON);
  } catch (e) {
    console.error("ERROR!", e);
  }
})();


// (async function () {
//     let privatekey = 'SDEJTBAUJCAJZW5GMG4CL62RTUGJRPWEEYEPLZSUHS2U6XMGOK3IUMPE'
//
// // SDEJTBAUJCAJZW5GMG4CL62RTUGJRPWEEYEPLZSUHS2U6XMGOK3IUMPE
//     let publickey = 'GDWNHS224KD53UMPDPOOS6FFT5ZL3VTZNWRC4KY4TKDLQLTB4TNG65JX';
// // GDWNHS224KD53UMPDPOOS6FFT5ZL3VTZNWRC4KY4TKDLQLTB4TNG65JX
//
// // the JS SDK uses promises for most actions, such as retrieving an account
//     const account = await server.loadAccount(publickey);
//     console.log("Balances for account: " + publickey);
//     account.balances.forEach(function (balance) {
//         console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
//     });
// })();

// ACCOUNT ZA PRIMANJE
// PRIVATNI = SDOUSW7BYLLTCVL5M5WAILWN2IOLR7HSQTLZBKTQS2ZLP6DTQE6EOTOR
// JAVNI = GBND4FR5DJ5WFLOUIVVGLZWA6WPETLLLSJXU5YEHTX2KXV63ZANXEIBK

// ACCOUNT ZA SLANJE
// PRIVATNI = SDEJTBAUJCAJZW5GMG4CL62RTUGJRPWEEYEPLZSUHS2U6XMGOK3IUMPE
// JAVNI = GDWNHS224KD53UMPDPOOS6FFT5ZL3VTZNWRC4KY4TKDLQLTB4TNG65JX

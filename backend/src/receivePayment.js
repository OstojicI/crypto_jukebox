require('dotenv').config()
const StellarSdk = require("stellar-sdk");

const server = new StellarSdk.Server(process.env.STELLAR_SERVER);
const publicKey = process.env.RECEIVER_PUBLIC_KEY;

// Create an API call to query payments involving the account.
// var payments = server.payments().forAccount(accountId);


// If some payments have already been handled, start the results from the
// last seen payment. (See below in `handlePayment` where it gets saved.)
// var lastToken = loadLastPagingToken();
// if (lastToken) {
//     payments.cursor('now');
// }

// `stream` will send each recorded payment, one by one, then keep the
// connection open and continue to send you new payments as they occur.
// payments.stream({
//     onmessage: function (payment) {
//         // console.log(payment);
//         // Record the paging token so we can start from here next time.
//         savePagingToken(payment.paging_token);
//
//         // The payments stream includes both sent and received payments. We only
//         // want to process received payments here.
//         if (payment.to !== accountId) {
//             return;
//         }
//
//         // In Stellar’s API, Lumens are referred to as the “native” type. Other
//         // asset types have more detailed information.
//         var asset;
//         if (payment.asset_type === "native") {
//             asset = "lumens";
//         } else {
//             asset = payment.asset_code + ":" + payment.asset_issuer;
//         }
//         // callback(payment);
//         return payment.amount;
//         // console.log(payment.amount + " " + asset + " from " + payment.from);
//     },
//
//     onerror: function (error) {
//         console.error("Error in payment stream");
//     },
// });

function savePagingToken(token) {
    // In most cases, you should save this to a local database or file so that
    // you can load it next time you stream new payments.
}

function loadLastPagingToken() {
    // Get the last paging token from a local database or file
    return 'now';
}

function watchForPayments(onPayment, cursor = 'now') {
    const paymentsCallBuilder = server.payments().forAccount(publicKey);

    if (cursor) {
        paymentsCallBuilder.cursor(cursor);
    }

    return paymentsCallBuilder.stream({
        onmessage: async record => {
            console.log(record)
            if (record.to !== publicKey || record.asset_type !== "native") {
                return;
            }

            const transaction = await record.transaction();
            onPayment({
                memo: transaction.memo,
                amount: record.amount,
                createdAt: new Date(record.created_at),
                asset: record.asset_type,
                cursor: record.paging_token,
                to: record.to,
                from: record.from,
                hash: record.transaction_hash
            });
        },
        onerror: function (error) {
            console.log(error)
            console.error("Error in payment stream");
        },
    });
}

module.exports = watchForPayments;
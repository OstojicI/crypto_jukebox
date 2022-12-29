require('dotenv').config()
const StellarSdk = require("stellar-sdk");

const server = new StellarSdk.Server(process.env.STELLAR_SERVER);
const publicKey = process.env.RECEIVER_PUBLIC_KEY;

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

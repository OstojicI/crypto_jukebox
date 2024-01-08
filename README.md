# Crypto Jukebox

Crypto jukebox is a web application for ordering songs using cryptocurrencies (Stellar XLM).
This application was made for education purposes. First of all to learn about simplicity of crypto payments and secondly to get familiar with Stellar SDK.

[**Website**](https://crypto-jukebox.com/)

[**Medium article**](https://ivanostojic.medium.com/open-source-jukebox-accepting-crypto-payments-stellar-xlm-node-js-a0a00994cf90)

## Installation
Create .env files by copying .env.example inside `backend`, `frontend` and `stellar-operations` folders.
You will need two Stellar wallets. One for the application so it can play songs when there is a succesfull payment and one to send XLM to that wallet.
- [Create two Stellar wallets](https://laboratory.stellar.org/#account-creator?network=test). Select testnet, generate keypair and fund the account (just paste generated public key).

Paste public key of the first wallet inside:
- `backend`.env - RECEIVER_PUBLIC_KEY
- `frontend` .env - STELLAR_RECEIVER_ADDRESS
- `stellar-operations` .env - RECEIVER_PUBLIC_KEY

Paste public and private key of the second wallet inside `stellar-operations` .env:

- SENDING_PUBLIC_KEY
- SENDING_PRIVATE_KEY

Use Docker to start the application.
```bash
docker compose up
```
## Usage

Visit **localhost:3000** and select a song to start the payment process. In order to pay for the song we are going to use second wallet we've created.  Copy transaction MEMO code inside **stellar-operations/src/sendTransaction.js**, line 44. Now get inside stellar container and run the file
 ```bash
docker exec -it crypto_jukebox-stellar-service-1 /bin/bash
node sendTransaction.js
```
The payment should be completed in a few seconds and the song will start playing.
## Contributing

Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)

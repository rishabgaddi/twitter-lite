# Blockchain Twitter-Lite

This project demonstrates a simple version of Twitter with CRUD operations built using Solidity on Rinkeby Ethereum test network.

This project contains two smart contracts, tests for those contracts and a script to deploy the contract.

After cloning the project you must install all the dependencies using:

```shell
npm install
```

To compile, use the following command:

```shell
npm run compile
```

To test, use the following command:

```shell
npm test
```

In order to deploy, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Rinkeby node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, run the following command:

```shell
npm run deploy:rinkeby
```

To see the test coverage, run:

```shell
npm run coverage
```

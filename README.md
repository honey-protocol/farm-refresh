# Farm refresh - A script for crancking gem-farm 

## Tooling required

You will need recent version of the following tools:

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git): to clone the repository
- [node](https://nodejs.org/en/download/): JavaScript runtime
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable): package manager to install the required dependencies
- [ts-node](https://www.npmjs.com/package/ts-node#installation): TypeScript execution environment

```bash
git version
```

> **output:** _git version 2.35.1_

The latest LTS version of node is recommended:

```bash
node --version
```

> **output:** _v16.14.2_

```bash
yarn --version
```

> **output:** _1.22.18_

```bash
ts-node --version
```

> **output:** _v10.4.0_


## Installation

```bash
yarn
# or
npm install
```

## Usage
Create `.env` file from the  `.env.example`
```bash
cat .env.example >> .env
```
Change the values in  `.env` file to match the farm you are looking to update. Don't forget to point to the `payer` , make sure this wallet has some Sol balance in order to pay fees. 
```
RPC_URL='https://api.mainnet-beta.solana.com'
FARM_ADDRESS='ADD_FARM_ADDRESS PUBLIC KEY'
PAYER_WALLET_PATH='ADD_PATH_TO_PAYER_PRIVATE_KEY.json'
```


### Running the script
```bash
ts-node src/index.ts
```
const fs = require("fs");
import { GEM_FARM_PROG_ID } from "@gemworks/gem-farm-ts";
import { GemFarm } from "@gemworks/gem-farm-ts/dist/types/gem_farm";
import {
  clusterApiUrl,
  Connection,
  ConnectionConfig,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import farmIdl from "./idl.json";
import config from "../config";

// convert Anchor Big Number to decimal
const convert = (amount: anchor.BN, decimals: number = 6): number => {
  const wads = new anchor.BN(10).pow(new anchor.BN(decimals));

  const div = new anchor.BN(amount).div(wads).toNumber();
  const rem = new anchor.BN(amount).mod(wads).toNumber() / wads.toNumber();

  return div + rem;
};

const refreshPayer = anchor.web3.Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync(config.PAYER_WALLET_PATH, "utf8")))
);

const FARM_ADDRESS = new PublicKey(config.FARM_ADDRESS);

const RPC_URL = config.RPC_URL;

const fetchAllFarmerPDAs = async (farm: PublicKey) => {
  const farmProgram = getFarmProgram();
  const filters = [];

  if (farm) {
    filters.push({
      memcmp: {
        offset: 8,
        bytes: farm.toBase58(),
      },
    });
  }

  return farmProgram.account.farmer.all(filters);
};

const getFarmProgram = () => {
  const { connection, wallet } = getWallet();

  return new anchor.Program<GemFarm>(
    farmIdl as any,
    GEM_FARM_PROG_ID,
    new anchor.Provider(connection, new anchor.Wallet(wallet), {
      commitment: "confirmed",
    })
  );
};

const ConnectionConfigOb: ConnectionConfig = {
  commitment: "confirmed",
  confirmTransactionInitialTimeout: 120000,
};

const getWallet = () => {
  const connection = new Connection(RPC_URL, ConnectionConfigOb);
  const wallet = refreshPayer;
  return { connection, wallet };
};

export const saveAllAccountsAddresses = async () => {
  const accounts = await fetchAllFarmerPDAs(FARM_ADDRESS);
  const accountArray = [];
  accounts.map((account) => {
    accountArray.push(account.publicKey.toString());
  });
  // write to a new file named out.txt
  fs.writeFile("./AllAccountAddresses.json", JSON.stringify(accountArray), (err: any) => {
    // throws an error, you could also catch it here
    if (err) throw err;
    // success case, the file was saved
    console.log("Accounts saved!");
  });
};

const findAccount = async (pubKey: string) => {
    const accounts = await fetchAllFarmerPDAs(FARM_ADDRESS);
    // const accountArray = [];
    const foundAccount = accounts.map((account, index) => {
        console.log(account.account.rewardB)
      return account.publicKey.toString() === pubKey
    });
    console.log(foundAccount);
    // write to a new file named out.txt
    fs.writeFile("./output.json", JSON.stringify(accountArray), (err: any) => {
      // throws an error, you could also catch it here
      if (err) throw err;
      // success case, the file was saved
      console.log("Accounts saved!");
    });
  };

const findTodo = function (myTodos, title) {
  const titleReturned = myTodos.find(function (todo, index) {
    return todo.publicKey === new PublicKey(title);
  });
  return titleReturned;
};

// saveAllAccountsAddresses(); // use this to save a list of all accounts staking


const printAddress = async () => {
    const a = await findAccount("BN5WvboA6nGrgmksMQwyN3HrTsvZN1AMFpeP5nuSMhMU");
    // console.log(a);
  };
  
  printAddress();
  
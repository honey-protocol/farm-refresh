import * as anchor from "@project-serum/anchor";
import config from "../config";
const fs = require("fs");
import { Connection, ConnectionConfig, PublicKey } from "@solana/web3.js";

const refreshPayer = anchor.web3.Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync(config.PAYER_WALLET_PATH, "utf8")))
);

const FARM_ADDRESS = new PublicKey(config.FARM_ADDRESS);

const RPC_URL = config.RPC_URL;
const programId = new anchor.web3.PublicKey(
  "6VJpeYFy87Wuv4KvwqD5gyFBTkohqZTqs6LgbCJ8tDBA"
);

const getFarmProgram = async () => {
  const { connection, wallet } = getWallet();
  const idl = await anchor.Program.fetchIdl(
    programId,
    new anchor.Provider(connection, new anchor.Wallet(wallet), {
      commitment: "confirmed",
    })
  );

  return idl;
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

{
  async () => {
    const idl = await getFarmProgram();
    return console.log(idl.metadata.toString());
  };
}

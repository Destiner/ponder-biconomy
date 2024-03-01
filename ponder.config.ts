import { createConfig } from "@ponder/core";
import { http, parseAbiItem } from "viem";

import biconomyAccount2Abi from "./abis/biconomyAccount2";
import biconomyAccountFactory2Abi from "./abis/biconomyAccountFactory2";

const BICONOMY_ACCOUNT_FACTORY_2_ADDRESS =
  "0x000000a56aaca3e9a4c479ea6b6cd0dbcb6634f5";

export default createConfig({
  networks: {
    polygonMumbai: {
      chainId: 80001,
      transport: http(process.env.PONDER_RPC_URL_80001),
    },
  },
  contracts: {
    BiconomyAccount2: {
      abi: biconomyAccount2Abi,
      network: "polygonMumbai",
      factory: {
        address: BICONOMY_ACCOUNT_FACTORY_2_ADDRESS,
        event: parseAbiItem(
          "event AccountCreation(address indexed account, address indexed initialAuthModule, uint256 indexed index)"
        ),
        parameter: "account",
      },
    },
    "BiconomyAccountFactory 2": {
      abi: biconomyAccountFactory2Abi,
      address: BICONOMY_ACCOUNT_FACTORY_2_ADDRESS,
      network: "polygonMumbai",
    },
  },
});

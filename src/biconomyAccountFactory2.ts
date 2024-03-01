import { ponder } from "@/generated";

import { getId } from "./biconomyAccount2";
import { Address } from "viem";

ponder.on(
  "BiconomyAccountFactory 2:AccountCreation",
  async ({ event, context }) => {
    await context.db.Account.create({
      id: getId(event.args.account, context.network.chainId),
      data: {
        address: event.args.account,
        chainId: context.network.chainId,
        factory: event.log.address.toLowerCase() as Address,
        modules: [event.args.initialAuthModule.toLowerCase() as Address],
      },
    });
  }
);

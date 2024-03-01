import { ponder } from "@/generated";
import { Address } from "viem";

ponder.on("BiconomyAccount2:EnabledModule", async ({ event, context }) => {
  const account = await context.db.Account.findUnique({
    id: getId(event.log.address, context.network.chainId),
  });

  if (!account) {
    console.error("Account not found");
  }

  const module = event.args.module.toLowerCase() as Address;
  await context.db.Account.update({
    id: getId(event.log.address, context.network.chainId),
    data: {
      modules: [...account!.modules, module],
    },
  });
});

ponder.on("BiconomyAccount2:DisabledModule", async ({ event, context }) => {
  const account = await context.db.Account.findUnique({
    id: getId(event.log.address, context.network.chainId),
  });

  if (!account) {
    console.error("Account not found");
  }

  const disabledModule = event.args.module.toLowerCase() as Address;
  await context.db.Account.update({
    id: getId(event.log.address, context.network.chainId),
    data: {
      modules: account!.modules.filter((module) => module !== disabledModule),
    },
  });
});

function getId(address: Address, chainId: number) {
  return `${chainId}-${address.toLowerCase()}`;
}

export { getId };

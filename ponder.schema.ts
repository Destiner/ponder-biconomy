import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Account: p.createTable({
    id: p.string(),
    address: p.hex(),
    chainId: p.int(),
    factory: p.hex(),
    modules: p.hex().list(),
  }),
}));

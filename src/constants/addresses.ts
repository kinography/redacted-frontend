import { Networks } from "./blockchain";

const ETH_MAINNET = {
    SANKH_ADDRESS: "0x136Acd46C134E8269052c62A67042D6bDeDde3C9",
    ANKH_ADDRESS: "0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
    SHIB_ADDRESS: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
    STAKING_ADDRESS: "0x4456B87Af11e87E329AB7d7C7A246ed1aC2168B9",
    STAKING_HELPER_ADDRESS: "0x096BBfB78311227b805c968b070a81D358c13379",
    ANKH_BONDING_CALC_ADDRESS: "0x819323613AbC79016f9D2443a65E9811545382a5",
    TREASURY_ADDRESS: "0x1c46450211CB2646cc1DA3c5242422967eD9e04c",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.ETH) return ETH_MAINNET;

    throw Error("Network don't support");
};

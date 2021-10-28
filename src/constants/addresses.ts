import { Networks } from "./blockchain";

// swapped based on https://github.com/OlympusDAO/olympus-contracts
const ETH_MAINNET = {
    SANKH_ADDRESS: "0x31932e6e45012476ba3a3a4953cba62aee77fbbe", // sOHM
    ANKH_ADDRESS: "0x383518188c0c6d7730d91b2c03a03c837814a899", // OHM
    SHIB_ADDRESS: "0x6b175474e89094c44da98b954eedeac495271d0f", // using DAI for the test
    STAKING_ADDRESS: "0xfd31c7d00ca47653c6ce64af53c1571f9c36566a",
    STAKING_HELPER_ADDRESS: "0xc8c436271f9a6f10a5b80c8b8ed7d0e8f37a612d",
    ANKH_BONDING_CALC_ADDRESS: "0xcaaA6a2d4B26067a391E7B7D65C16bb2d5FA571A", // bond calculator
    TREASURY_ADDRESS: "0x31F8Cc382c9898b273eff4e0b7626a6987C846E8",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.ETH) return ETH_MAINNET;

    throw Error("Network don't support");
};

import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { CustomBond } from "./stable-bond";

import ShibIcon from "../../assets/tokens/SHIB.svg";
import OhmIcon from "../../assets/tokens/OHM.svg";

import { LpBondContract, OhmBondContract, ShibBondContract, StableReserveContract, LpReserveContract } from "../../abi";

export const shib = new CustomBond({
    name: "shib",
    displayName: "SHIB",
    bondToken: "SHIB",
    bondIconSvg: ShibIcon,
    bondContractABI: ShibBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.ETH]: {
            bondAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318",
            reserveAddress: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
        },
    },
});

export const ohm = new CustomBond({
    name: "ohm",
    displayName: "OHM",
    bondToken: "OHM",
    bondIconSvg: OhmIcon,
    bondContractABI: OhmBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.ETH]: {
            bondAddress: "0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318",
            reserveAddress: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
        },
    },
});

export const shibAnkh = new LPBond({
    name: "shib_ankh_lp",
    displayName: "SHIB-ANKH LP",
    bondToken: "SHIB",
    bondIconSvg: ShibIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.ETH]: {
            bondAddress: "0xA184AE1A71EcAD20E822cB965b99c287590c4FFe",
            reserveAddress: "0x113f413371fc4cc4c9d6416cf1de9dfd7bf747df",
        },
    },
    lpUrl: "https://app.sushi.com/add/0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE/undefined",
});

export const ohmAnkh = new CustomLPBond({
    name: "ohm_ankh_lp",
    displayName: "OHM-ANKH LP",
    bondToken: "OHM",
    bondIconSvg: OhmIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.ETH]: {
            bondAddress: "0xc26850686ce755FFb8690EA156E5A6cf03DcBDE1",
            reserveAddress: "0xf64e1c5B6E17031f5504481Ac8145F4c3eab4917",
        },
    },

    lpUrl: "https://app.sushi.com/add/0x383518188C0C6d7730D91b2c03a03C837814a899/undefined",
});

export default [shib, ohm, shibAnkh, ohmAnkh];

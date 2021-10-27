import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import AvaxIcon from "../../assets/tokens/AVAX.svg";
import MimTimeIcon from "../../assets/tokens/TIME-MIM.svg";
import AvaxTimeIcon from "../../assets/tokens/TIME-AVAX.svg";

import { LpBondContract, OhmBondContract, ShibBondContract, StableReserveContract, LpReserveContract } from "../../abi";

export const shib = new CustomBond({
    name: "shib",
    displayName: "SHIB",
    bondToken: "SHIB",
    bondIconSvg: AvaxIcon,
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
    bondIconSvg: AvaxIcon,
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
    bondIconSvg: MimTimeIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.ETH]: {
            bondAddress: "0xA184AE1A71EcAD20E822cB965b99c287590c4FFe",
            reserveAddress: "0x113f413371fc4cc4c9d6416cf1de9dfd7bf747df",
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});

export const ohmAnkh = new CustomLPBond({
    name: "ohm_ankh_lp",
    displayName: "OHM_ANKH LP",
    bondToken: "OHM",
    bondIconSvg: AvaxTimeIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.ETH]: {
            bondAddress: "0xc26850686ce755FFb8690EA156E5A6cf03DcBDE1",
            reserveAddress: "0xf64e1c5B6E17031f5504481Ac8145F4c3eab4917",
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/ETH/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});

export default [shib, ohm, shibAnkh, ohmAnkh];

import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { CustomBond } from "./stable-bond";

import ShibIcon from "../../assets/tokens/SHIB.svg";
import OhmIcon from "../../assets/tokens/OHM.svg";

import { LpBondContract, BondDepositoryContract, ERC20ReserveContract, LpReserveContract } from "../../abi";

export const shib = new CustomBond({
    name: "shib",
    displayName: "SHIB",
    bondToken: "SHIB",
    bondIconSvg: ShibIcon,
    bondContractABI: BondDepositoryContract,
    reserveContractAbi: ERC20ReserveContract,
    networkAddrs: {
        [Networks.ETH]: {
            bondAddress: "0x575409F8d77c12B05feD8B455815f0e54797381c", // DAI depository address
            reserveAddress: "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI address
        },
    },
});

export const wsOhm = new CustomBond({
    name: "wsOhm",
    displayName: "wsOHM",
    bondToken: "WSOHM",
    bondIconSvg: OhmIcon,
    bondContractABI: BondDepositoryContract,
    reserveContractAbi: ERC20ReserveContract,
    networkAddrs: {
        [Networks.ETH]: {
            bondAddress: "0x575409F8d77c12B05feD8B455815f0e54797381c", // DAI depository address
            reserveAddress: "0xca76543cf381ebbb277be79574059e32108e3e65", // wsOHM address
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
            bondAddress: "0x956c43998316b6a2F21f89a1539f73fB5B78c151", // OHM/DAI LP depository address
            reserveAddress: "0x34d7d7aaf50ad4944b70b320acb24c95fa2def7c", // OHM/DAI LP token address
        },
    },
    lpUrl: "https://app.sushi.com/add/0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE/undefined",
});

export const wsOhmAnkh = new CustomLPBond({
    name: "wsohm_ankh_lp",
    displayName: "wsOHM-ANKH LP",
    bondToken: "WSOHM",
    bondIconSvg: OhmIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.ETH]: {
            bondAddress: "0x956c43998316b6a2F21f89a1539f73fB5B78c151", // OHM/DAI LP depository address
            reserveAddress: "0x34d7d7aaf50ad4944b70b320acb24c95fa2def7c", // OHM/DAI LP token address
        },
    },

    lpUrl: "https://app.sushi.com/add/0x383518188C0C6d7730D91b2c03a03C837814a899/undefined",
});

export default [shib, wsOhm, shibAnkh, wsOhmAnkh];

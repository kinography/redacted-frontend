import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { TimeTokenContract, MemoTokenContract } from "../../abi/";
import { setAll } from "../../helpers";

import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Bond } from "../../helpers/bond/bond";
import { Networks } from "../../constants/blockchain";
import { RootState } from "../store";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IAccountBalances {
    balances: {
        sAnkh: string;
        ankh: string;
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);

    const sAnkhContract = new ethers.Contract(addresses.SANKH_ADDRESS, MemoTokenContract, provider);
    const sAnkhBalance = await sAnkhContract.balanceOf(address);
    const ankhContract = new ethers.Contract(addresses.ANKH_ADDRESS, TimeTokenContract, provider);
    const ankhBalance = await ankhContract.balanceOf(address);

    return {
        balances: {
            sAnkh: ethers.utils.formatUnits(sAnkhBalance, "gwei"),
            ankh: ethers.utils.formatUnits(ankhBalance, "gwei"),
        },
    };
});

interface ILoadAccountDetails {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IUserAccountDetails {
    balances: {
        ankh: string;
        sAnkh: string;
    };
    staking: {
        ankh: number;
        sAnkh: number;
    };
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails): Promise<IUserAccountDetails> => {
    let ankhBalance = 0;
    let sAnkhBalance = 0;
    let stakeAllowance = 0;
    let unstakeAllowance = 0;

    const addresses = getAddresses(networkID);

    if (addresses.ANKH_ADDRESS) {
        const ankhContract = new ethers.Contract(addresses.ANKH_ADDRESS, TimeTokenContract, provider);
        ankhBalance = await ankhContract.balanceOf(address);
        stakeAllowance = await ankhContract.allowance(address, addresses.STAKING_HELPER_ADDRESS);
    }

    if (addresses.SANKH_ADDRESS) {
        const sAnkhContract = new ethers.Contract(addresses.SANKH_ADDRESS, MemoTokenContract, provider);
        sAnkhBalance = await sAnkhContract.balanceOf(address);
        unstakeAllowance = await sAnkhContract.allowance(address, addresses.STAKING_ADDRESS);
    }

    return {
        balances: {
            sAnkh: ethers.utils.formatUnits(sAnkhBalance, "gwei"),
            ankh: ethers.utils.formatUnits(ankhBalance, "gwei"),
        },
        staking: {
            ankh: Number(stakeAllowance),
            sAnkh: Number(unstakeAllowance),
        },
    };
});

interface ICalcUserBondDetails {
    address: string;
    bond: Bond;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserBondDetails {
    allowance: number;
    balance: number;
    ethBalance: number;
    interestDue: number;
    bondMaturationBlock: number;
    pendingPayout: number; //Payout formatted in gwei.
}

export const calculateUserBondDetails = createAsyncThunk("bonding/calculateUserBondDetails", async ({ address, bond, networkID, provider }: ICalcUserBondDetails) => {
    if (!address)
        return new Promise<any>(resevle => {
            resevle({
                bond: "",
                displayName: "",
                bondIconSvg: "",
                isLP: false,
                allowance: 0,
                balance: 0,
                interestDue: 0,
                bondMaturationBlock: 0,
                pendingPayout: "",
                ethBalance: 0,
            });
        });

    const bondContract = bond.getContractForBond(networkID, provider);
    const reserveContract = bond.getContractForReserve(networkID, provider);

    let interestDue, pendingPayout, bondMaturationBlock;

    const bondDetails = await bondContract.bondInfo(address);
    interestDue = bondDetails.payout / Math.pow(10, 9);
    bondMaturationBlock = Number(bondDetails.vesting) + Number(bondDetails.lastTime);
    pendingPayout = await bondContract.pendingPayoutFor(address);

    let allowance,
        balance = "0";

    allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    balance = await reserveContract.balanceOf(address);
    const balanceVal = ethers.utils.formatEther(balance);

    const ethBalance = await provider.getSigner().getBalance();
    const ethVal = ethers.utils.formatEther(ethBalance);

    const pendingPayoutVal = ethers.utils.formatUnits(pendingPayout, "gwei");

    return {
        bond: bond.name,
        displayName: bond.displayName,
        bondIconSvg: bond.bondIconSvg,
        isLP: bond.isLP,
        allowance: Number(allowance),
        balance: Number(balanceVal),
        ethBalance: Number(ethVal),
        interestDue,
        bondMaturationBlock,
        pendingPayout: Number(pendingPayoutVal),
    };
});

export interface IAccountSlice {
    bonds: { [key: string]: IUserBondDetails };
    balances: {
        sAnkh: string;
        ankh: string;
    };
    loading: boolean;
    staking: {
        ankh: number;
        sAnkh: number;
    };
}

const initialState: IAccountSlice = {
    loading: true,
    bonds: {},
    balances: { sAnkh: "", ankh: "" },
    staking: { ankh: 0, sAnkh: 0 },
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccountDetails.pending, state => {
                state.loading = true;
            })
            .addCase(loadAccountDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAccountDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(getBalances.pending, state => {
                state.loading = true;
            })
            .addCase(getBalances.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(getBalances.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserBondDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const bond = action.payload.bond;
                state.bonds[bond] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);

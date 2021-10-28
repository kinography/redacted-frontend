import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
import { shibAnkh } from "../helpers/bond";
import { Networks } from "../constants/blockchain";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const shibAnkhAddress = shibAnkh.getAddressForReserve(networkID);
    const pairContract = new ethers.Contract(shibAnkhAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();
    // TODO: update this when pools are created. May be flipped.
    const marketPrice = reserves[1] / reserves[0];
    return marketPrice;
}

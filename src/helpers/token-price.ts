import axios from "axios";

const cache: { [key: string]: number } = {};

export const loadTokenPrices = async () => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=shiba-inu,olympus,magic-internet-money&vs_currencies=usd";
    const { data } = await axios.get(url);

    cache["SHIB"] = data["shiba-inu"].usd;
    cache["MIM"] = data["magic-internet-money"].usd;
    cache["OHM"] = data["olympus"].usd;
};

export const getTokenPrice = (symbol: string): number => {
    return Number(cache[symbol]);
};

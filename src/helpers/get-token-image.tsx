import AnkhImg from "../assets/tokens/TIME.svg";
import SAnkhImg from "../assets/tokens/MEMO.png";

function toUrl(tokenPath: string): string {
    const host = window.location.origin;
    return `${host}/${tokenPath}`;
}

export function getTokenUrl(name: string) {
    if (name === "ankh") {
        return toUrl(AnkhImg);
    }

    if (name === "sankh") {
        return toUrl(SAnkhImg);
    }

    throw Error(`Token url doesn't support: ${name}`);
}

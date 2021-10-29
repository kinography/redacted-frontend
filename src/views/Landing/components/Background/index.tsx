import React from "react";
import "./background.scss";
import { logoImg } from "../../../../constants/img";
import GoodBoy from "../../../../assets/icons/shib.jpeg";

function Background() {
    return (
        <div className="landing-background">
            <div className="landing-background-blobs-top">
                <img alt="" src={GoodBoy} />
            </div>
            <div className="landing-background-wrap">
                <p> {logoImg} </p>
            </div>
            <div className="landing-background-blobs-center">
                <img alt="" src={GoodBoy} />
            </div>
        </div>
    );
}

export default Background;

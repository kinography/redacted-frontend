import React from "react";
import { Link } from "@material-ui/core";
import "./main.scss";

function Main() {
    return (
        <div className="landing-main">
            <div className="landing-main-title-wrap">
                <p>Bark Bark</p>
                <p>good project</p>
            </div>
            <div className="landing-main-help-text-wrap">
                <p>Bonding and Staking soon! Bark Bark</p>
            </div>

            <div className="landing-main-btns-wrap">
                {/* TODO: Re-add link  */}
                <Link href="/" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Coming soon</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Main;

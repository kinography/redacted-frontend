import React from "react";
import { Link } from "@material-ui/core";
import "./main.scss";

function Main() {
    return (
        <div className="landing-main">
            <div className="landing-main-title-wrap">
                <p>The Decentralized</p>
                <p>Egypt</p>
            </div>
            <div className="landing-main-help-text-wrap">
                <p>bark bark bark good project bark bark</p>
                <p></p>
            </div>
            <div className="landing-main-btns-wrap">
                <Link href="https://app.anubisdao.money" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Enter App</p>
                    </div>
                </Link>
                <Link href="https://anubisdao.gitbook.io/anubisdao/" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Documentation</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Main;

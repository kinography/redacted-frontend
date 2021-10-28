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

            <div className="landing-main-btns-wrap">
                {/* TODO: Re-add link  */}
                {/* <Link href="" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Enter App</p>
                    </div>
                </Link> */}
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

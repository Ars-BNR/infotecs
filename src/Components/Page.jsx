import React from "react";
import cl from "./Page.module.css"
import { Outlet } from "react-router-dom";
const Page = () => {
    return (
        <div className={cl.main}>
            <div className={cl.main__container}>
                <Outlet />
            </div>
        </div>
    );
};

export default Page;
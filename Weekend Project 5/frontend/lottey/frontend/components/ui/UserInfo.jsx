import { useEffect, useState } from "react";
import DataLoader from "../helpers/DataLoader";

export default function UserInfo({ signer, isLoadingWallet, chain}) {
    return (
        <>
            <div className="border-2 rounded-lg flex-row items-center text-center p-4">
                <h1 className="text-xl">User info</h1>
                <div className="text-left">
                    <p className="truncate">Your address is <b>{signer._address}</b></p>
                    <p>Connected to <b>{chain.name} Network</b></p> 
                    <p>Token balance:&nbsp;
                        <span className="font-bold text-yellow-500">
                            <DataLoader
                                noDataMessage="No lottery tokens"
                                url={`http://localhost:3001/token-balance?address=${signer._address}`}
                            />
                        </span>&nbsp;
                        LTO
                    </p>
                </div>
            </div>
        </>
    )
}

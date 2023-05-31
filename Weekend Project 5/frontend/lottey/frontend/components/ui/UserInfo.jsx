import { useEffect, useState } from "react";
import DataLoader from "../helpers/DataLoader";

export default function UserInfo({ signer, isLoadingWallet, chain}) {

    if (signer) return (
        <>
            <div className="border-2 rounded-lg flex-row items-center text-center p-4">
                <h1 className="">User info</h1>
                <div className="text-left">
                    <p>Your address is {signer._address}</p>
                    <p>Connected to {chain.name} network</p> 
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
    if (isLoadingWallet) return <p>Loading...</p>
    return <p>Connect your wallet</p>
}

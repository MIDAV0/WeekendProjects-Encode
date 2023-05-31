import { useEffect, useState } from "react";
import DataLoader from "../helpers/DataLoader";

export default function ClaimReward({ signer, isLoadingWallet }) {

    if (signer) return (
        <>
            <div className="border-2 rounded-lg flex-col items-center text-center p-4">
                <h1 className="">Rewards</h1>
                <div>
                    <div>
                        <p>
                            Prize available:&nbsp;
                            <span className="font-bold text-yellow-500">
                                <DataLoader
                                    noDataMessage="No prize data"
                                    url={`http://localhost:3001/display-prize?address=${signer._address.toString()}`}
                                />
                            </span>&nbsp;
                            LTO
                        </p>
                    </div>
                    <button 
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
                    >
                        Claim
                        </button>
                </div>
            </div>
        </>
    )

    if (isLoadingWallet) return <p>Loading...</p>

    return <p>Connect your wallet</p>
}
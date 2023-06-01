import { useEffect, useState } from "react";
import DataLoader from "../helpers/DataLoader";
import APIButton from "../helpers/APIButton";

export default function ClaimReward({ signer }) {
    return (
        <>
            <div className="border-2 rounded-lg flex-col items-center text-center p-4">
                <h1 className="text-xl">Rewards</h1>
                <div>
                    <div>
                        <p>
                            Prize available:&nbsp;
                            <span className="font-bold text-yellow-500">
                                <DataLoader
                                    noDataMessage="No prize data"
                                    url={`http://localhost:3001/display-prize?address=${signer._address}`}
                                />
                            </span>&nbsp;
                            LTO
                        </p>
                    </div>
                    <APIButton
                        url={`http://localhost:3001/claim-prize?amount=1`}
                        buttonName="Claim"
                        method={"GET"}
                        className={"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"}
                    />
                </div>
            </div>
        </>
    )
}
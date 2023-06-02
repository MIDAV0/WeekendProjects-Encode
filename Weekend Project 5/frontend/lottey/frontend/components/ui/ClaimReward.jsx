import { useEffect, useState } from "react";
import DataLoader from "../helpers/DataLoader";
import APIButton from "../helpers/APIButton";

export default function ClaimReward({ signer }) {
    const [tokenAmount, setTokenAmount] = useState(0);

    return (
        <>
            <div className="border-2 rounded-lg flex-col items-center text-center p-4">
                <h1 className="text-xl">Rewards</h1>
                <div>
                    <div className="flex items-center justify-center">
                        <p className="flex">
                            Prize available:&nbsp;
                                <DataLoader
                                    noDataMessage="No prize data"
                                    url={`http://localhost:3001/display-prize?address=${signer._address}`}
                                />&nbsp;
                            LTO
                        </p>
                    </div>
                    <div className="flex justify-between mt-2 px-5">
                        <input 
                            type="number" 
                            placeholder="Prize amount"
                            className="input input-bordered input-warning"
                            onChange={(e) => setTokenAmount(e.target.value)}    
                        />
                        <APIButton
                            url={`http://localhost:3001/claim-prize?amount=${tokenAmount.toString()}`}
                            buttonName="Claim"
                            method={"GET"}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
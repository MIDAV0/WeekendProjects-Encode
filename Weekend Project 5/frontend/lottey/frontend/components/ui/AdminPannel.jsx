import { useState } from "react";
import DataLoader from "../helpers/DataLoader";
import APIButton from "../helpers/APIButton";

const ADMIN_ADDRESS = "0x65315D8c187178bfFfA37C400f0C8842e0724D24"


// Open lottery
// display prize vault
// withdraw prize vault
export default function AdminPannel({ signer }) {
    const [tokenAmount, setTokenAmount] = useState(0);
    const [duration, setDuration] = useState(0);

    return (
        <>
            {
                signer._address === ADMIN_ADDRESS ?
                    <div className="border-2 rounded-lg flex-col items-center text-center p-4">
                        <h1 className="text-xl">Admin Pannel</h1>
                        <div>
                            <div className="flex items-center justify-center">
                                <p className="flex">
                                    Fee pool available:&nbsp;
                                        <DataLoader
                                            noDataMessage="No fee pool data"
                                            url={`http://localhost:3001/owner-pool`}
                                        />&nbsp;
                                    LTO
                                </p>
                            </div>
                            <div className="flex justify-between gap-4 mt-2 px-5 pr-9">
                                <input 
                                    type="number" 
                                    placeholder="Withdraw amount" 
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
                        <div>
                            <div className="flex justify-between mt-2 px-5">
                                    <input 
                                        type="number" 
                                        placeholder="Duration" 
                                        className="input input-bordered input-warning"
                                        onChange={(e) => setDuration(e.target.value)}    
                                    />
                                    <APIButton
                                        url={`http://localhost:3001/open-bets?duration=${duration.toString()}`}
                                        buttonName="Open bets"
                                        method={"GET"}
                                    />
                            </div>
                        </div>
                    </div>
                :
                    <div className="flex justify-center items-center text-xl text-yellow-500 h-20">
                        Admin access required
                    </div>
            }
        </>
    )
}